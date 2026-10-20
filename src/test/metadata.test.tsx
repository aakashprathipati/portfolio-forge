import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Portfolio from "@/pages/Portfolio";
import Project from "@/pages/Project";
import NotFound from "@/pages/NotFound";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const flags = { v7_startTransition: true, v7_relativeSplatPath: true } as const;
afterEach(() => cleanup());
const robots = () =>
  document.querySelector('meta[name="robots"]')?.getAttribute("content");

describe("page metadata", () => {
  it("keeps the static home metadata consistent with the displayed profile", () => {
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    const document = new DOMParser().parseFromString(html, "text/html");
    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe(`${profile.name} — ${profile.role}`);
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe(profile.metaDescription);
    expect(profile.metaDescription.length).toBeLessThanOrEqual(160);
    for (const selector of [
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ])
      expect(document.querySelector(selector)?.getAttribute("content")).toBe(
        profile.metaDescription,
      );
    const person = JSON.parse(
      document.querySelector('script[type="application/ld+json"]')!
        .textContent!,
    );
    expect(person.name).toBe(profile.name);
    expect(person.jobTitle).toBe(profile.role);
    expect(
      document.querySelector('meta[name="viewport"]')?.getAttribute("content"),
    ).not.toMatch(/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/);
  });
  it("indexes completed project case studies and restores home metadata on return", () => {
    render(
      <MemoryRouter
        future={flags}
        initialEntries={["/projects/pathology-diagnostics"]}
      >
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/projects/:slug" element={<Project />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(robots()).toBe("index, follow");
    expect(document.title).toBe(
      "AI-Powered Pathology Diagnostic System — Aakash Prathipati",
    );
    expect(
      document
        .querySelector('meta[property="og:title"]')
        ?.getAttribute("content"),
    ).toBe(document.title);
    expect(
      document
        .querySelector('meta[name="twitter:title"]')
        ?.getAttribute("content"),
    ).toBe(document.title);
    fireEvent.click(
      screen.getByRole("link", { name: /Back to selected work/ }),
    );
    expect(robots()).toBe("index, follow");
    expect(document.title).toBe("Aakash Prathipati — AI Engineer");
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe(profile.metaDescription);
  });
  it("marks unknown pages noindex", () => {
    render(
      <MemoryRouter future={flags}>
        <NotFound />
      </MemoryRouter>,
    );
    expect(robots()).toBe("noindex, follow");
  });
  it("keeps an old project URL useful when a hosted destination is configured later", () => {
    const original = projects[0].url;
    projects[0].url = "https://example.com/pathology";
    try {
      const view = render(
        <MemoryRouter
          future={flags}
          initialEntries={["/projects/pathology-diagnostics"]}
        >
          <Routes>
            <Route path="/projects/:slug" element={<Project />} />
          </Routes>
        </MemoryRouter>,
      );
      expect(
        screen.getByRole("link", { name: /Open project/ }),
      ).toHaveAttribute("href", "https://example.com/pathology");
      expect(
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content"),
      ).not.toMatch(/coming soon/);
      expect(
        screen.queryByText("This project page is coming soon."),
      ).not.toBeInTheDocument();
      view.unmount();
    } finally {
      projects[0].url = original;
    }
  });
});
