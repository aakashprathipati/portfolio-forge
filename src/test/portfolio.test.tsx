import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Portfolio from "../pages/Portfolio";
import { projects } from "@/data/projects";
import Project from "../pages/Project";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
const renderHome = () =>
  render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Portfolio />
    </MemoryRouter>,
  );

describe("portfolio navigation and contact", () => {
  it("provides a working destination for all four project placeholders", () => {
    renderHome();
    for (const project of projects) {
      expect(screen.getByRole("link", { name: project.name })).toHaveAttribute(
        "href",
        `/projects/${project.slug}`,
      );
    }
  });
  it("opens mobile navigation, closes after selection, and supports Escape", () => {
    renderHome();
    const toggle = screen.getByRole("button", { name: "Open navigation" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const mobile = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });
    fireEvent.click(mobile.querySelector('a[href="#projects"]')!);
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
    fireEvent.click(toggle);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
  it("uses the supplied contact email and confirms copying", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    renderHome();
    expect(
      screen.getByRole("link", { name: "aakashprathipatipvt@gmail.com" }),
    ).toHaveAttribute("href", "mailto:aakashprathipatipvt@gmail.com");
    fireEvent.click(screen.getByRole("button", { name: "Copy email address" }));
    expect(
      await screen.findByText("Email copied to clipboard."),
    ).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith("aakashprathipatipvt@gmail.com");
  });
  it("retains the three supplied Drive credential links and the automation link", () => {
    renderHome();
    expect(
      screen
        .getAllByRole("link", { name: /View credential/ })
        .map((link) => link.getAttribute("href")),
    ).toEqual(
      expect.arrayContaining([
        "https://drive.google.com/file/d/1HMzb2IqoUbRzgWf_cun50E6kLAbzv5W2/view?usp=sharing",
        "https://drive.google.com/file/d/1d5Q9jUpM7l9igA23RtyP9AoQH3jJuYeu/view?usp=sharing",
        "https://drive.google.com/file/d/1DkEzuJMdsSZOovWNu9V4qVC2IFTfTA2y/view?usp=sharing",
        "https://certificates.automationanywhere.com/37aae1ab-3b31-4d4d-b6d1-f7220b1a0792#acc.JzOA8UNd",
      ]),
    );
  });
});
describe("project routes", () => {
  it.each(projects)(
    "renders the $slug placeholder and a return link",
    (project) => {
      vi.spyOn(window, "scrollTo").mockImplementation(() => {});
      render(
        <MemoryRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          initialEntries={[`/projects/${project.slug}`]}
        >
          <Routes>
            <Route path="/projects/:slug" element={<Project />} />
          </Routes>
        </MemoryRouter>,
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        project.name,
      );
      expect(
        screen.getByText("This project page is coming soon."),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Back to selected work/ }),
      ).toHaveAttribute("href", "/#projects");
    },
  );
});
