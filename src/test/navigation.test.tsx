import { afterEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import NavigationEffects from "@/components/NavigationEffects";
import Portfolio from "@/pages/Portfolio";
import Project from "@/pages/Project";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const flags = { v7_startTransition: true, v7_relativeSplatPath: true } as const;
const originalScrollY = Object.getOwnPropertyDescriptor(window, "scrollY")!;
const originalWidth = Object.getOwnPropertyDescriptor(window, "innerWidth")!;
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  Object.defineProperty(window, "scrollY", originalScrollY);
  Object.defineProperty(window, "innerWidth", originalWidth);
});
function HistoryControls() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>Browser back</button>
      <button onClick={() => navigate(1)}>Browser forward</button>
    </div>
  );
}
function RoutedPortfolio() {
  return (
    <>
      <NavigationEffects />
      <HistoryControls />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects/:slug" element={<Project />} />
      </Routes>
    </>
  );
}

describe("browser history and focus", () => {
  it("restores the clicked project and scroll offset after browser Back, even from a fragment URL", async () => {
    let y = 0;
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      get: () => y,
    });
    const scroll = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(
        (options?: ScrollToOptions | number, legacyY?: number) => {
          if (typeof options === "object") y = options.top ?? 0;
          else y = legacyY ?? 0;
        },
      );
    Element.prototype.scrollIntoView = vi.fn();
    render(
      <MemoryRouter future={flags} initialEntries={["/#projects"]}>
        <RoutedPortfolio />
      </MemoryRouter>,
    );
    await waitFor(() =>
      expect(document.getElementById("projects")).toHaveFocus(),
    );
    const link = screen.getByRole("link", {
      name: "AI-Driven Security Analytics & Threat Intelligence",
    });
    y = 2400;
    link.focus();
    fireEvent.scroll(window);
    fireEvent.click(link);
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "AI-Driven Security Analytics & Threat Intelligence",
      ),
    );
    await waitFor(() => expect(y).toBe(0));
    fireEvent.click(screen.getByRole("button", { name: "Browser back" }));
    await waitFor(() =>
      expect(
        document.getElementById("project-security-analytics"),
      ).toHaveFocus(),
    );
    expect(scroll).toHaveBeenCalledWith({
      top: 2400,
      left: 0,
      behavior: "instant",
    });
    expect(y).toBe(2400);
    fireEvent.click(screen.getByRole("button", { name: "Browser forward" }));
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "AI-Driven Security Analytics & Threat Intelligence",
      ),
    );
    await waitFor(() => expect(y).toBe(0));
  });
  it("keeps the previously clicked project visible after the viewport changes while away", async () => {
    Element.prototype.scrollIntoView = vi.fn();
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 1280,
    });
    render(
      <MemoryRouter future={flags}>
        <RoutedPortfolio />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", {
      name: "Geospatial AI for Real-Time Flood Mapping",
    });
    link.focus();
    fireEvent.click(link);
    await waitFor(() =>
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Geospatial AI for Real-Time Flood Mapping",
      ),
    );
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 390,
    });
    fireEvent.click(screen.getByRole("button", { name: "Browser back" }));
    await waitFor(() =>
      expect(document.getElementById("project-flood-mapping")).toHaveFocus(),
    );
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: "instant",
      block: "center",
    });
  });
  it.each(["/#%70rojects", "/#%E0%A4%A", "/#does-not-exist"])(
    "handles the fragment %s without breaking the page",
    async (url) => {
      Element.prototype.scrollIntoView = vi.fn();
      render(
        <MemoryRouter future={flags} initialEntries={[url]}>
          <NavigationEffects />
          <Portfolio />
        </MemoryRouter>,
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Aakash Prathipati.",
      );
      await act(async () => {
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
      });
      if (url === "/#%70rojects")
        await waitFor(() =>
          expect(document.getElementById("projects")).toHaveFocus(),
        );
    },
  );
  it.each(["Projects", "Contact"])(
    "moves focus to a visible desktop target when the mobile %s link is focused during a resize",
    (label) => {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        writable: true,
        value: 390,
      });
      render(
        <MemoryRouter future={flags}>
          <Portfolio />
        </MemoryRouter>,
      );
      fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
      const mobile = screen.getByRole("navigation", {
        name: "Mobile navigation",
      });
      const link = Array.from(mobile.querySelectorAll("a")).find(
        (item) => item.textContent === label,
      )!;
      link.focus();
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        writable: true,
        value: 1280,
      });
      fireEvent(window, new Event("resize"));
      expect(document.activeElement).not.toBe(link);
      expect(document.activeElement).toHaveAttribute(
        "href",
        label === "Contact" ? "#contact" : "#projects",
      );
      expect(document.activeElement?.closest("#mobile-nav")).toBeNull();
    },
  );
});

describe("project card destinations", () => {
  it("provides one keyboard target for each project card", () => {
    render(
      <MemoryRouter future={flags}>
        <ProjectCard project={projects[0]} />
      </MemoryRouter>,
    );
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/projects/pathology-diagnostics",
    );
  });
  it("can use a hosted URL later without editing the card layout", () => {
    render(
      <MemoryRouter future={flags}>
        <ProjectCard
          project={{ ...projects[0], url: "https://example.com/pathology" }}
        />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com/pathology");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      screen.queryByText("Project page coming soon"),
    ).not.toBeInTheDocument();
  });
});
