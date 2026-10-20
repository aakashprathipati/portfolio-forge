// All fixtures in this module are synthetic portfolio examples.
export const segmentationTiles = Array.from({ length: 96 }, (_, index) => {
  const x = index % 12;
  const y = Math.floor(index / 12);
  const fieldA = Math.max(0, 1 - Math.hypot((x - 3) / 3.6, (y - 3) / 2.8));
  const fieldB = Math.max(0, 1 - Math.hypot((x - 9) / 2.4, (y - 5) / 2.5));
  return {
    x,
    y,
    score: Math.round(
      Math.min(1, Math.max(fieldA, fieldB) + ((index * 17) % 13) / 55) * 100,
    ),
  };
});

export type Point = readonly [number, number];
export const floodExtents: Point[][] = [
  [
    [0, 150],
    [110, 120],
    [210, 170],
    [340, 160],
    [440, 220],
    [640, 190],
    [640, 250],
    [430, 280],
    [310, 220],
    [190, 230],
    [90, 180],
    [0, 210],
  ],
  [
    [0, 120],
    [115, 85],
    [220, 130],
    [350, 125],
    [460, 185],
    [640, 155],
    [640, 280],
    [430, 315],
    [300, 265],
    [180, 270],
    [75, 215],
    [0, 240],
  ],
  [
    [0, 95],
    [120, 55],
    [230, 100],
    [360, 90],
    [470, 145],
    [640, 120],
    [640, 305],
    [430, 340],
    [285, 305],
    [160, 310],
    [65, 255],
    [0, 275],
  ],
];
export const facilities = [
  { id: "north", name: "North depot", point: [145, 90] as Point },
  { id: "central", name: "Central clinic", point: [300, 190] as Point },
  { id: "east", name: "East substation", point: [520, 150] as Point },
  { id: "south", name: "South shelter", point: [225, 320] as Point },
];

export function pointInPolygon(point: Point, polygon: readonly Point[]) {
  let inside = false;
  const [x, y] = point;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const cross = (x - xi) * (yj - yi) - (y - yi) * (xj - xi);
    if (
      Math.abs(cross) < 1e-8 &&
      x >= Math.min(xi, xj) &&
      x <= Math.max(xi, xj) &&
      y >= Math.min(yi, yj) &&
      y <= Math.max(yi, yj)
    )
      return true;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      inside = !inside;
  }
  return inside;
}

export interface SampleOrder {
  order: string;
  customer: string;
  name: string;
  amount: string;
}
export const sampleOrders: SampleOrder[] = [
  { order: "O-101", customer: "C-01", name: " Ada ", amount: "28.00" },
  { order: "O-102", customer: "C-02", name: "Lin", amount: "42.50" },
  { order: " O-102 ", customer: "C-02", name: " Lin ", amount: "42.50" },
  { order: "O-103", customer: "C-01", name: "Ada", amount: "19.00" },
  { order: "O-104", customer: "C-03", name: "Noor", amount: "71.00" },
  { order: "O-105", customer: "C-02", name: "Lin", amount: "n/a" },
  { order: "O-106", customer: "", name: "", amount: "12.00" },
  { order: "O-107", customer: "C-03", name: "Noor", amount: "36.00" },
];

export function transformOrders(
  input: readonly SampleOrder[],
  deduplicate: boolean,
) {
  const accepted: (Omit<SampleOrder, "amount"> & { amount: number })[] = [];
  const rejected: { order: string; reason: string }[] = [];
  const seen = new Map<string, string>();
  let duplicates = 0;
  for (const record of input) {
    const row = {
      order: record.order.trim(),
      customer: record.customer.trim(),
      name: record.name.trim(),
      amount: record.amount.trim(),
    };
    if (!row.order || !row.customer || !row.name) {
      rejected.push({
        order: row.order || "(missing)",
        reason: "Missing required identity",
      });
      continue;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(row.amount)) {
      rejected.push({ order: row.order, reason: "Invalid amount" });
      continue;
    }
    const normalized = { ...row, amount: Number(row.amount) };
    const fingerprint = JSON.stringify(normalized);
    if (seen.has(row.order)) {
      if (seen.get(row.order) !== fingerprint) {
        rejected.push({ order: row.order, reason: "Conflicting order key" });
        continue;
      }
      if (deduplicate) {
        duplicates++;
        continue;
      }
    }
    seen.set(row.order, fingerprint);
    accepted.push(normalized);
  }
  const customers = Array.from(
    new Map(
      accepted.map((row) => [
        row.customer,
        { customer: row.customer, name: row.name },
      ]),
    ).values(),
  );
  return {
    accepted,
    rejected,
    duplicates,
    customers,
    uniqueKeys:
      new Set(accepted.map((row) => row.order)).size === accepted.length,
  };
}

export const sampleLogs = `203.0.113.10 - - [20/Oct/2026:09:01:00 +0000] "GET /login HTTP/1.1" 200
198.51.100.24 - - [20/Oct/2026:09:02:00 +0000] "POST /login HTTP/1.1" 401
198.51.100.24 - - [20/Oct/2026:09:02:15 +0000] "POST /login HTTP/1.1" 401
192.0.2.8 - - [20/Oct/2026:09:03:00 +0000] "GET /dashboard HTTP/1.1" 200
203.0.113.10 - - [20/Oct/2026:09:04:00 +0000] "GET /old-page HTTP/1.1" 302
192.0.2.8 - - [20/Oct/2026:09:05:00 +0000] "GET /missing HTTP/1.1" 404
203.0.113.32 - - [20/Oct/2026:09:06:00 +0000] "GET /api/status HTTP/1.1" 503
198.51.100.24 - - [20/Oct/2026:09:07:00 +0000] "GET /help HTTP/1.1" 200`;

export interface ParsedLog {
  source: string;
  timestamp: string;
  method: string;
  path: string;
  status: number;
}
export function parseExampleLogs(text: string) {
  const parsed: ParsedLog[] = [];
  const rejected: string[] = [];
  const lines = text
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .slice(0, 100);
  const pattern =
    /^(\d{1,3}(?:\.\d{1,3}){3}) - - \[([^\]]+)\] "(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS) (\S+) HTTP\/\d(?:\.\d)?" ([1-5]\d{2})(?: (?:\d+|-))?$/;
  for (const line of lines) {
    const match = line.trim().match(pattern);
    if (!match || match[1].split(".").some((part) => Number(part) > 255)) {
      rejected.push(line);
      continue;
    }
    parsed.push({
      source: match[1],
      timestamp: match[2],
      method: match[3],
      path: match[4],
      status: Number(match[5]),
    });
  }
  return { parsed, rejected, total: lines.length };
}
