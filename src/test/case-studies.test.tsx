import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axe from "axe-core";
import Project from "@/pages/Project";
import ProjectExplorer from "@/components/ProjectExplorer";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import {
  floodExtents,
  facilities,
  parseExampleLogs,
  pointInPolygon,
  sampleLogs,
  sampleOrders,
  segmentationTiles,
  transformOrders,
} from "@/data/project-examples";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
const flags = { v7_startTransition: true, v7_relativeSplatPath: true } as const;
function renderProject(slug: string) {
  return render(
    <MemoryRouter future={flags} initialEntries={[`/projects/${slug}`]}>
      <Routes>
        <Route path="/projects/:slug" element={<Project />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("completed case studies", () => {
  it.each(projects)(
    "gives $slug a complete, internally navigable engineering narrative",
    (project) => {
      const { container } = renderProject(project.slug);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        project.name,
      );
      for (const link of container.querySelectorAll<HTMLAnchorElement>(
        'a[href^="#"]',
      ))
        expect(document.getElementById(link.hash.slice(1))).not.toBeNull();
      expect(
        container.querySelectorAll(".architecture-flow > li"),
      ).toHaveLength(6);
      expect(container.querySelectorAll(".stack-list > div")).toHaveLength(5);
      expect(container.textContent).not.toMatch(/coming soon|finance|94%|60%/i);
      expect(
        screen.getByRole("heading", { name: "Scope & evidence" }),
      ).toBeInTheDocument();
      expect(caseStudies[project.slug].references.length).toBeGreaterThan(0);
      expect(container.querySelectorAll(".project-explorer")).toHaveLength(1);
      for (const link of container.querySelectorAll('a[target="_blank"]'))
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    },
  );
  it("cycles between case studies without retaining the previous example's controls", () => {
    renderProject("pathology-diagnostics");
    fireEvent.click(screen.getByRole("radio", { name: /mask/i }));
    fireEvent.click(
      screen.getByRole("link", {
        name: "Geospatial AI for Real-Time Flood Mapping",
      }),
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Geospatial AI for Real-Time Flood Mapping",
    );
    expect(
      screen.queryByRole("radio", { name: /mask/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Feature to query" }),
    ).toBeInTheDocument();
  });
  it.each(projects)(
    "has no structural accessibility violations for $slug",
    async (project) => {
      vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
      renderProject(project.slug);
      const result = await axe.run(document.body, {
        rules: { "color-contrast": { enabled: false } },
      });
      expect(
        result.violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map((node) => node.target),
        })),
      ).toEqual([]);
    },
    30000,
  );
});

describe("interactive examples", () => {
  it("updates the selected synthetic segmentation region and view", () => {
    render(<ProjectExplorer theme="pathology" />);
    const slider = screen.getByRole("slider", { name: /Selection threshold/ });
    fireEvent.change(slider, { target: { value: "80" } });
    const selected = segmentationTiles.filter(
      (tile) => tile.score >= 80,
    ).length;
    expect(
      screen.getByRole("img", {
        name: `${selected} of 96 synthetic tiles selected`,
      }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: /mask/i }));
    expect(
      screen.getByRole("img", { name: /Synthetic segmentation mask/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /overlay/i })).not.toBeChecked();
  });
  it("recomputes the selected feature's intersection as extent changes", () => {
    render(<ProjectExplorer theme="flood" />);
    fireEvent.change(
      screen.getByRole("combobox", { name: "Feature to query" }),
      { target: { value: "north" } },
    );
    fireEvent.change(
      screen.getByRole("slider", { name: /Illustrative flood extent/ }),
      { target: { value: "0" } },
    );
    expect(screen.getByText("Outside flood extent")).toBeInTheDocument();
    fireEvent.change(
      screen.getByRole("slider", { name: /Illustrative flood extent/ }),
      { target: { value: "2" } },
    );
    expect(screen.getByText("Intersects flood extent")).toBeInTheDocument();
  });
  it("blocks promotion when the example retains duplicate keys", () => {
    render(<ProjectExplorer theme="pipeline" />);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Sample key check passed",
    );
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /Remove identical duplicate orders/,
      }),
    );
    expect(screen.getByRole("status")).toHaveTextContent("Promotion blocked");
    const table = screen.getByRole("region", { name: "Candidate order table" });
    expect(within(table).getAllByRole("row")).toHaveLength(7);
  });
  it("filters parsed events, retains rejected input, and resets the sample", () => {
    render(<ProjectExplorer theme="security" />);
    const region = screen.getByRole("region", {
      name: "Parsed security event table",
    });
    expect(within(region).getAllByRole("row")).toHaveLength(9);
    fireEvent.click(screen.getByRole("checkbox", { name: /Show only 4xx/ }));
    expect(within(region).getAllByRole("row")).toHaveLength(5);
    fireEvent.change(
      screen.getByRole("textbox", { name: "Edit sample log lines" }),
      { target: { value: "not a supported log line" } },
    );
    expect(screen.getByText(/0 parsed · 1 unparsed/)).toBeInTheDocument();
    expect(
      screen.getByText(
        "No matching events. Edit the input or reset the sample.",
      ),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset sample" }));
    expect(within(region).getAllByRole("row")).toHaveLength(9);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });
});

describe("example calculations", () => {
  it("accounts for every source record and exposes duplicate-key conflicts", () => {
    const result = transformOrders(sampleOrders, true);
    expect(result.accepted).toHaveLength(5);
    expect(result.customers).toHaveLength(3);
    expect(result.duplicates).toBe(1);
    expect(result.rejected).toHaveLength(2);
    expect(
      result.accepted.length + result.duplicates + result.rejected.length,
    ).toBe(sampleOrders.length);
    expect(transformOrders(sampleOrders, false).uniqueKeys).toBe(false);
    const conflict = transformOrders(
      [sampleOrders[0], { ...sampleOrders[0], amount: "50.00" }],
      true,
    );
    expect(conflict.rejected[0].reason).toBe("Conflicting order key");
  });
  it("treats polygon boundaries as matches without matching outside points", () => {
    const square = [
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
    ] as const;
    expect(pointInPolygon([5, 5], square)).toBe(true);
    expect(pointInPolygon([10, 5], square)).toBe(true);
    expect(pointInPolygon([10, 10], square)).toBe(true);
    expect(pointInPolygon([11, 5], square)).toBe(false);
    expect(pointInPolygon([0, 0], [])).toBe(false);
    expect(pointInPolygon(facilities[0].point, floodExtents[0])).toBe(false);
    expect(pointInPolygon(facilities[0].point, floodExtents[2])).toBe(true);
  });
  it("rejects malformed addresses, handles empty input, and caps example work", () => {
    expect(parseExampleLogs(sampleLogs).parsed).toHaveLength(8);
    expect(parseExampleLogs("\n  \n").total).toBe(0);
    expect(
      parseExampleLogs(sampleLogs.replace(/203\.0\.113\.10/g, "999.0.0.1"))
        .rejected,
    ).toHaveLength(2);
    expect(
      parseExampleLogs(Array(120).fill(sampleLogs.split("\n")[0]).join("\n"))
        .total,
    ).toBe(100);
    expect(
      parseExampleLogs(sampleLogs.split("\n")[0] + " 123").parsed,
    ).toHaveLength(1);
    expect(
      parseExampleLogs(sampleLogs.split("\n")[0] + " -").parsed,
    ).toHaveLength(1);
  });
});
