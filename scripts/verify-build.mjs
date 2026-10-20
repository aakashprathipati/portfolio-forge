import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { gzipSync } from "node:zlib";
import { preview } from "vite";

const directory = resolve("dist");
const html = await readFile(resolve(directory, "index.html"), "utf8");
assert.match(html, /<html lang="en">/, "Document language is missing");
assert.match(html, /Aakash Prathipati/, "Owner name is missing from metadata");
assert.doesNotMatch(html, /REPLACE_WITH|lovable\.dev|opengraph-image-p98/);
const entry = html.match(/<script[^>]+src="([^"]+\.js)"/)[1];
const stylesheet = html.match(/<link[^>]+href="([^"]+\.css)"/)[1];
const entryBytes = await readFile(resolve(directory, entry.slice(1)));
const cssBytes = await readFile(resolve(directory, stylesheet.slice(1)));
assert(
  gzipSync(entryBytes).length < 100_000,
  "Initial JavaScript exceeds the 100 kB gzip budget",
);
assert(
  gzipSync(cssBytes).length < 12_000,
  "Stylesheet exceeds the 12 kB gzip budget",
);
assert.doesNotMatch(
  entryBytes.toString(),
  /aakashprathipaticore@gmail\.com|94% accuracy|Reduced processing time by 60%/,
);
assert.doesNotMatch(
  cssBytes.toString(),
  /fonts\.googleapis\.com|fonts\.gstatic\.com/,
);

for (const name of ["dm-sans-latin.woff2", "manrope-latin.woff2"]) {
  const font = await readFile(resolve(directory, "fonts", name));
  assert.equal(
    font.subarray(0, 4).toString(),
    "wOF2",
    `${name} is not a WOFF2 font`,
  );
}
for (const name of ["DM-Sans-LICENSE.txt", "Manrope-LICENSE.txt"]) {
  assert.match(
    await readFile(resolve(directory, "fonts", name), "utf8"),
    /SIL OPEN FONT LICENSE/,
  );
}

async function filesUnder(path) {
  const found = [];
  for (const name of await readdir(path)) {
    const child = resolve(path, name);
    if ((await stat(child)).isDirectory())
      found.push(...(await filesUnder(child)));
    else found.push(child);
  }
  return found;
}
const files = await filesUnder(directory);
const covers = files.filter((file) => file.endsWith(".webp"));
assert.equal(covers.length, 6, "Expected six optimized certificate covers");
let coverBytes = 0;
for (const file of covers) {
  const bytes = await readFile(file);
  assert.equal(bytes.subarray(0, 4).toString(), "RIFF");
  assert.equal(bytes.subarray(8, 12).toString(), "WEBP");
  assert(bytes.length < 200_000, "A certificate cover exceeds 200 kB");
  coverBytes += bytes.length;
}
assert(
  coverBytes < 600_000,
  "Certificate covers exceed the combined 600 kB budget",
);
assert.match(
  await readFile(resolve(directory, "_redirects"), "utf8"),
  /\/\* \/index\.html 200/,
);
assert(
  !files.some((file) => file.toLowerCase().endsWith(".pdf")),
  "Unexpected public PDF",
);
const assetFiles = files.filter((file) =>
  /\.(png|jpg|webp|svg|woff2|js|css)$/.test(file),
);
const server = await preview({
  preview: { host: "127.0.0.1", port: 4174, strictPort: false, open: false },
});
try {
  const address = server.httpServer.address();
  assert(address && typeof address !== "string");
  const origin = `http://127.0.0.1:${address.port}`;
  for (const path of [
    "/",
    "/projects/pathology-diagnostics",
    "/projects/flood-mapping",
    "/projects/intelligent-etl",
    "/projects/security-analytics",
    "/projects/unknown",
    "/unknown-page",
  ]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, `${path} did not return the SPA shell`);
    assert.match(await response.text(), /<div id="root"><\/div>/);
  }
  for (const file of assetFiles) {
    const path = "/" + relative(directory, file).replaceAll("\\", "/");
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, `${path} is unavailable`);
    assert(
      !response.headers.get("content-type")?.includes("text/html"),
      `${path} returned HTML instead of an asset`,
    );
    assert.equal(
      (await response.arrayBuffer()).byteLength,
      (await stat(file)).size,
      `${path} is truncated`,
    );
  }
  console.log(`Verified 7 application URLs and ${assetFiles.length} assets.`);
  console.log(
    `Initial JS: ${(gzipSync(entryBytes).length / 1000).toFixed(1)} kB gzip; CSS: ${(gzipSync(cssBytes).length / 1000).toFixed(1)} kB gzip.`,
  );
} finally {
  await new Promise((resolve, reject) =>
    server.httpServer.close((error) => (error ? reject(error) : resolve())),
  );
}
