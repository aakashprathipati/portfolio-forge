import { afterEach, describe, expect, it, vi } from "vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axe from "axe-core";
import Portfolio from "@/pages/Portfolio";
import Project from "@/pages/Project";
import NotFound from "@/pages/NotFound";
import ContactSection from "@/components/ContactSection";
import NavigationEffects from "@/components/NavigationEffects";

const routerFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;
function Home() {
  return (
    <MemoryRouter future={routerFlags}>
      <Portfolio />
    </MemoryRouter>
  );
}
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("resume and navigation audit", () => {
  it("exposes every major resume section and uses valid internal anchors", () => {
    const { container } = render(<Home />);
    for (const id of [
      "projects",
      "experience",
      "skills",
      "education",
      "certifications",
      "contact",
    ])
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    for (const link of container.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]',
    ))
      expect(document.getElementById(link.hash.slice(1))).not.toBeNull();
    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });
    expect(
      navigation.querySelector('a[href="#certifications"]'),
    ).not.toBeNull();
    expect(navigation.querySelector('a[href="#education"]')).not.toBeNull();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Aakash Prathipati.",
    );
  });
  it("includes both degrees, their resume CGPAs, all five credentials, and five internship responsibilities", () => {
    const { container } = render(<Home />);
    expect(
      screen.getByRole("heading", {
        name: "B.Tech in Computer Science and Engineering",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "BBA in Finance" }),
    ).toBeInTheDocument();
    expect(screen.getByText("8.9")).toBeInTheDocument();
    expect(screen.getByText("8.3")).toBeInTheDocument();
    expect(container.querySelectorAll(".credential-card")).toHaveLength(5);
    expect(container.querySelectorAll(".experience-points > li")).toHaveLength(
      5,
    );
    expect(
      screen.getByRole("heading", { name: "Quantum Fundamentals" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Certified Essentials Automation Professional",
      }),
    ).toBeInTheDocument();
    expect(container.textContent).not.toMatch(
      /94%|60%|published internal research/i,
    );
  });
  it("keeps the requested portrait eager and certificate covers lazy", () => {
    const { container } = render(<Home />);
    expect(screen.getByAltText("Aakash Prathipati")).toHaveAttribute(
      "src",
      expect.stringContaining("profile-photo.jpg"),
    );
    expect(screen.getByAltText("Aakash Prathipati")).toHaveAttribute(
      "loading",
      "eager",
    );
    for (const image of container.querySelectorAll(".credential-image img"))
      expect(image).toHaveAttribute("loading", "lazy");
    for (const link of container.querySelectorAll('a[target="_blank"]'))
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
  it("closes the disclosure on outside click and restores focus when Escape is pressed", () => {
    render(<Home />);
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    fireEvent.click(toggle);
    fireEvent.pointerDown(document.body);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
  it("closes mobile navigation when resizing into desktop layout", () => {
    const width = window.innerWidth;
    render(<Home />);
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    fireEvent.click(toggle);
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 1280,
    });
    fireEvent(window, new Event("resize"));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: width,
    });
  });
});

describe("clipboard failure and concurrent requests", () => {
  it("explains denied clipboard access without launching a mail application", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
    });
    render(<ContactSection />);
    fireEvent.click(screen.getByRole("button", { name: "Copy email address" }));
    expect(await screen.findByText(/Copy unavailable/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "aakashprathipatipvt@gmail.com" }),
    ).toHaveAttribute("href", "mailto:aakashprathipatipvt@gmail.com");
  });
  it("handles environments without a clipboard API", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    render(<ContactSection />);
    fireEvent.click(screen.getByRole("button", { name: "Copy email address" }));
    expect(await screen.findByText(/Copy unavailable/)).toBeInTheDocument();
  });
  it("keeps the latest result when an older clipboard request settles later", async () => {
    let rejectFirst: (error: Error) => void = () => {};
    const first = new Promise<void>((_, reject) => {
      rejectFirst = reject;
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: vi
          .fn()
          .mockReturnValueOnce(first)
          .mockResolvedValueOnce(undefined),
      },
    });
    render(<ContactSection />);
    const button = screen.getByRole("button", { name: "Copy email address" });
    fireEvent.click(button);
    fireEvent.click(button);
    expect(
      await screen.findByText("Email copied to clipboard."),
    ).toBeInTheDocument();
    await act(async () => {
      rejectFirst(new Error("Old request failed"));
    });
    expect(screen.getByText("Email copied to clipboard.")).toBeInTheDocument();
  });
});

describe("route recovery", () => {
  it("scrolls and focuses the projects section when returning from a placeholder", async () => {
    const scroll = vi.fn();
    Element.prototype.scrollIntoView = scroll;
    render(
      <MemoryRouter
        future={routerFlags}
        initialEntries={["/projects/flood-mapping"]}
      >
        <NavigationEffects />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/projects/:slug" element={<Project />} />
        </Routes>
      </MemoryRouter>,
    );
    fireEvent.click(
      screen.getByRole("link", { name: /Back to selected work/ }),
    );
    await waitFor(() =>
      expect(document.getElementById("projects")).toHaveFocus(),
    );
    expect(scroll).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
  });
  it("renders a useful not-found page for an unknown project slug", () => {
    render(
      <MemoryRouter
        future={routerFlags}
        initialEntries={["/projects/no-such-project"]}
      >
        <Routes>
          <Route path="/projects/:slug" element={<Project />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "This page isn’t here.",
    );
    expect(document.title).toBe("Page not found — Aakash Prathipati");
    expect(
      screen.getByRole("link", { name: /Back to portfolio/ }),
    ).toHaveAttribute("href", "/");
  });
  it("renders the same recovery design for other unknown URLs", () => {
    render(
      <MemoryRouter future={routerFlags}>
        <NotFound />
      </MemoryRouter>,
    );
    expect(document.title).toBe("Page not found — Aakash Prathipati");
    expect(
      screen.getByRole("link", { name: /Explore projects/ }),
    ).toHaveAttribute("href", "/#projects");
  });
});

describe("automated accessibility audit", () => {
  it.each([false, true])(
    "has no structural accessibility violations with navigation open=%s",
    async (open) => {
      vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
      render(<Home />);
      if (open)
        fireEvent.click(
          screen.getByRole("button", { name: "Open navigation" }),
        );
      // jsdom has no rendered layout; contrast is checked separately against the CSS palette.
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
    15000,
  );
  it("has no structural accessibility violations on a project placeholder", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    render(
      <MemoryRouter
        future={routerFlags}
        initialEntries={["/projects/security-analytics"]}
      >
        <Routes>
          <Route path="/projects/:slug" element={<Project />} />
        </Routes>
      </MemoryRouter>,
    );
    const result = await axe.run(document.body, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(result.violations).toEqual([]);
  }, 15000);
});
