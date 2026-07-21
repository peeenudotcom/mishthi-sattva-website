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
import { transform } from "esbuild";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, "dist");

const STATIC = ["assets", "tokens", "js", "vendor", "styles.css", "_ds_bundle.js"];
const PAGES = [
  "ui_kits/website/index.html",
  "ui_kits/website/about.html",
  "ui_kits/website/products.html",
  "ui_kits/website/contact.html",
  "ui_kits/website/privacy.html",
  "ui_kits/website/terms.html",
  "ui_kits/website/shipping.html",
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

/* Photos ship at up to 1254px but are displayed at ~300px in cards and ~600px
   in heroes, so the originals are far larger than needed — ~89 MB in total.
   Resize and recompress into dist, keeping the SAME filenames and formats:
   image paths are also stored in the database, so renaming (e.g. to .webp)
   would break those references. Originals stay untouched in the repo. */
const MAX_EDGE = 900;

async function optimiseImages(dir) {
  let before = 0, after = 0, count = 0;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await optimiseImages(p);
      before += sub.before; after += sub.after; count += sub.count;
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

    const orig = (await fs.stat(p)).size;
    try {
      const img = sharp(p, { failOn: "none" });
      const meta = await img.metadata();
      let pipe = img;
      if (Math.max(meta.width || 0, meta.height || 0) > MAX_EDGE) {
        pipe = pipe.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });
      }
      pipe = ext === ".png"
        ? pipe.png({ compressionLevel: 9, palette: true, quality: 82 })
        : pipe.jpeg({ quality: 82, mozjpeg: true });

      const buf = await pipe.toBuffer();
      // only keep the optimised version if it actually helps
      if (buf.length < orig) await fs.writeFile(p, buf);
      after += Math.min(buf.length, orig);
      before += orig;
      count++;
    } catch (e) {
      console.warn("    skip", entry.name, e.message);
      before += orig; after += orig;
    }
  }
  return { before, after, count };
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

  process.stdout.write("\n  optimising images… ");
  const img = await optimiseImages(path.join(OUT, "assets"));
  const mb = (n) => (n / 1024 / 1024).toFixed(1);
  console.log(
    `${img.count} files: ${mb(img.before)} MB → ${mb(img.after)} MB ` +
    `(${Math.round((1 - img.after / img.before) * 100)}% smaller)`
  );

  console.log("\nBuild complete → dist/");
}

main().catch((e) => { console.error(e); process.exit(1); });
