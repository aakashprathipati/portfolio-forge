import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const css = readFileSync(resolve(process.cwd(), "src/portfolio.css"), "utf8");
function token(name: string) {
  const match = css.match(new RegExp(`${name}:\\s*(#[\\da-f]{6})`, "i"));
  if (!match) throw new Error(`Missing color token: ${name}`);
  return match[1];
}
function luminance(color: string) {
  const channels = [1, 3, 5]
    .map((offset) => parseInt(color.slice(offset, offset + 2), 16) / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    );
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function ratio(foreground: string, background: string) {
  const values = [
    luminance(token(foreground)),
    luminance(token(background)),
  ].sort((a, b) => a - b);
  return (values[1] + 0.05) / (values[0] + 0.05);
}
describe("design palette contrast", () => {
  it.each([
    ["body", "--ink", "--paper"],
    ["supporting text", "--muted", "--paper"],
    ["experience supporting text", "--muted", "--sage"],
    ["education supporting text", "--sand-muted", "--sand"],
    ["section labels", "--label", "--paper"],
    ["contact text", "--paper", "--green"],
    ["contact supporting text", "--contact-muted", "--green"],
    ["clipboard feedback", "--lime", "--green"],
  ])(
    "keeps %s at or above the 4.5:1 AA text threshold",
    (_label, foreground, background) => {
      expect(ratio(foreground, background)).toBeGreaterThanOrEqual(4.5);
    },
  );
  it("keeps the large accent heading above the 3:1 large-text threshold", () => {
    expect(ratio("--accent-heading", "--paper")).toBeGreaterThanOrEqual(3);
  });
});
