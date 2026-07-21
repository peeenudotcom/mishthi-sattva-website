/* Mishthi Sattva — production build.
 *
 * The source pages compile JSX in the browser with @babel/standalone, which is
 * fine for previewing but ships ~4.2 MB of tooling per page load. This build:
 *   1. compiles every .jsx (and inline text/babel block) ahead of time
 *   2. swaps React's development builds for locally-vendored production ones
 *   3. drops the Babel compiler entirely
 * Result: ~138 KB of JS instead of ~4.2 MB, and no third-party CDN at runtime.
 *
 * Output: dist/  (Vercel serves this; see vercel.json for clean URLs)
 */
import { build as esbuild, transform } from "esbuild";
import { promises as fs } from "fs";
import path from "path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, "dist");

const STATIC = ["assets", "tokens", "js", "vendor", "styles.css", "_ds_bundle.js"];
const PAGES = [
  "ui_kits/website/index.html",
  "ui_kits/website/about.html",
  "ui_kits/website/products.html",
  "ui_kits/website/contact.html",
  "ui_kits/shop/index.html",
  "admin/index.html",
];

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

/** Compile a .jsx file to plain JS next to its output location. */
async function compileJsx(relPath) {
  const code = await fs.readFile(path.join(ROOT, relPath), "utf8");
  const out = await transform(code, { loader: "jsx", format: "iife", target: "es2018" });
  const dest = path.join(OUT, relPath.replace(/\.jsx$/, ".js"));
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, out.code);
  return out.code.length;
}

/** Rewrite a page: production React, no Babel, precompiled scripts. */
async function buildPage(relPath) {
  let html = await fs.readFile(path.join(ROOT, relPath), "utf8");
  const depth = relPath.split("/").length - 1;
  const up = depth ? "../".repeat(depth) : "./";

  // 1. React dev (CDN) -> vendored production, keeping the same relative depth
  html = html.replace(
    /<script src="https:\/\/unpkg\.com\/react@[^"]+"[^>]*><\/script>/,
    `<script src="${up}vendor/react.production.min.js"></script>`
  );
  html = html.replace(
    /<script src="https:\/\/unpkg\.com\/react-dom@[^"]+"[^>]*><\/script>/,
    `<script src="${up}vendor/react-dom.production.min.js"></script>`
  );

  // 2. Babel is compile-time now — remove the runtime compiler entirely
  html = html.replace(/\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]+"[^>]*><\/script>/, "");

  // 3. External JSX -> precompiled JS
  const jsxRefs = [...html.matchAll(/<script type="text\/babel" src="([^"]+)"><\/script>/g)];
  for (const [full, src] of jsxRefs) {
    const jsxPath = path.join(path.dirname(relPath), src);
    await compileJsx(jsxPath);
    html = html.replace(full, `<script src="${src.replace(/\.jsx$/, ".js")}"></script>`);
  }

  // 4. Inline text/babel blocks -> compiled inline scripts
  const inline = [...html.matchAll(/<script type="text\/babel">([\s\S]*?)<\/script>/g)];
  for (const [full, body] of inline) {
    const out = await transform(body, { loader: "jsx", target: "es2018" });
    html = html.replace(full, `<script>${out.code.trim()}</script>`);
  }

  const dest = path.join(OUT, relPath);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, html);
  return html.length;
}

async function main() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });

  for (const item of STATIC) {
    const src = path.join(ROOT, item);
    const dest = path.join(OUT, item);
    const st = await fs.stat(src).catch(() => null);
    if (!st) { console.warn("  skip (missing):", item); continue; }
    if (st.isDirectory()) await copyDir(src, dest);
    else await fs.copyFile(src, dest);
    console.log("  copied", item);
  }

  for (const page of PAGES) {
    await buildPage(page);
    console.log("  built ", page);
  }

  console.log("\nBuild complete → dist/");
}

main().catch((e) => { console.error(e); process.exit(1); });
