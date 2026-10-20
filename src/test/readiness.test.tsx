import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Portfolio from "@/pages/Portfolio";
import SiteHeader from "@/components/SiteHeader";
import RenderBoundary from "@/components/RenderBoundary";
import { profile } from "@/data/profile";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
const flags = { v7_startTransition: true, v7_relativeSplatPath: true } as const;

describe("portfolio readiness", () => {
  it("keeps Finance only in Education and puts degrees before languages", () => {
    const { container } = render(
      <MemoryRouter future={flags}>
        <Portfolio />
      </MemoryRouter>,
    );
    const education = container.querySelector("#education")!;
    expect(
      within(education as HTMLElement).getByText("BBA in Finance"),
    ).toBeInTheDocument();
    const outsideEducation = container.cloneNode(true) as HTMLElement;
    outsideEducation.querySelector("#education")?.remove();
    expect(outsideEducation.textContent).not.toMatch(
      /finance|financial|business perspective/i,
    );
    expect(
      education
        .querySelector(".education")!
        .compareDocumentPosition(education.querySelector(".languages")!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
  it("updates the current section while scrolling and clears it at the hero", async () => {
    let projectsTop = 1000;
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      function (this: Element) {
        const top = this.id === "projects" ? projectsTop : 1000;
        return {
          top,
          bottom: top + 500,
          left: 0,
          right: 800,
          width: 800,
          height: 500,
          x: 0,
          y: top,
          toJSON() {},
        };
      },
    );
    render(
      <>
        <SiteHeader />
        <section id="projects" />
        <section id="experience" />
      </>,
    );
    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });
    const link = within(navigation).getByRole("link", { name: "Projects" });
    expect(link).not.toHaveAttribute("aria-current");
    projectsTop = 90;
    fireEvent.scroll(window);
    await waitFor(() =>
      expect(link).toHaveAttribute("aria-current", "location"),
    );
    projectsTop = 1000;
    fireEvent.scroll(window);
    await waitFor(() => expect(link).not.toHaveAttribute("aria-current"));
  });
  it("keeps the supplied internship destination attached to its cover", () => {
    render(
      <MemoryRouter future={flags}>
        <Portfolio />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", {
      name: /View internship certificate/,
    });
    expect(link).toHaveAttribute(
      "href",
      "https://drive.google.com/file/d/1JXWM7_SNdktCeCLXVV88TTLkSdrHcYfR/view?usp=sharing",
    );
    expect(link.querySelector("img")).toHaveAttribute(
      "src",
      expect.stringContaining("internship-cert.webp"),
    );
  });
  it("offers recovery and direct contact if rendering fails", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    function Broken(): never {
      throw new Error("Test render failure");
    }
    render(
      <RenderBoundary>
        <Broken />
      </RenderBoundary>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "The portfolio couldn’t load.",
    );
    expect(
      screen.getByRole("button", { name: "Reload page" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email Aakash" })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
    );
  });
});
