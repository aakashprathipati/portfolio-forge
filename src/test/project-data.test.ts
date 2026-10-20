import { describe, expect, it } from "vitest";
import { projects, projectDestination } from "@/data/projects";
import { certifications, navigation } from "@/data/profile";

describe("project destination configuration", () => {
  it("keeps the four unhosted projects on their own placeholder pages", () => {
    expect(projects).toHaveLength(4);
    for (const project of projects)
      expect(projectDestination(project)).toEqual({
        href: `/projects/${project.slug}`,
        hosted: false,
      });
  });
  it.each([
    "https://example.com/demo",
    "http://localhost:3000/demo",
    "  https://example.com/demo  ",
  ])("accepts a hosted address: %s", (url) => {
    expect(projectDestination({ ...projects[0], url })).toEqual({
      href: url.trim(),
      hosted: true,
    });
  });
  it.each([
    "",
    " ",
    "example.com/demo",
    "/relative",
    "javascript:alert(1)",
    "data:text/html,test",
    "file:///local",
  ])("keeps an incomplete or unsupported URL on the placeholder: %s", (url) => {
    expect(projectDestination({ ...projects[0], url })).toEqual({
      href: "/projects/pathology-diagnostics",
      hosted: false,
    });
  });
  it("uses unique stable IDs for project cards, credentials, and navigation", () => {
    for (const ids of [
      projects.map((project) => project.slug),
      certifications.map((cert) => cert.id),
      navigation.map((item) => item.id),
    ])
      expect(new Set(ids).size).toBe(ids.length);
  });
});
