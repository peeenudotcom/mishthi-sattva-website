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

/* Pages are emitted at their real public paths rather than being rewritten
   there by vercel.json. Serving /ui_kits/website/index.html at "/" broke every
   relative reference on the page (e.g. <script src="Sections.js"> resolved to
   /Sections.js), so React received an undefined component and nothing rendered.
   Building to the final path keeps links and scripts resolving naturally. */
const PAGES = [
  { src: "ui_kits/website/index.html",    out: "index.html" },
  { src: "ui_kits/website/about.html",    out: "story.html" },
  { src: "ui_kits/website/products.html", out: "products.html" },
  { src: "ui_kits/website/contact.html",  out: "contact.html" },
  { src: "ui_kits/website/privacy.html",  out: "privacy.html" },
  { src: "ui_kits/website/terms.html",    out: "terms.html" },
  { src: "ui_kits/website/shipping.html", out: "shipping.html" },
  { src: "ui_kits/shop/index.html",       out: "shop/index.html" },
  { src: "admin/index.html",              out: "admin/index.html" },
];

/* Source-relative link -> public URL. */
const LINK_MAP = [
  [/(["'])\.\.\/website\/index\.html\1/g, '$1/$1'],
  [/(["'])\.\.\/website\/about\.html\1/g, '$1/story$1'],
  [/(["'])\.\.\/website\/products\.html\1/g, '$1/products$1'],
  [/(["'])\.\.\/website\/contact\.html\1/g, '$1/contact$1'],
  [/(["'])\.\.\/shop\/index\.html\1/g, '$1/shop$1'],
  [/(["'])index\.html\1/g, '$1/$1'],
  [/(["'])about\.html\1/g, '$1/story$1'],
  [/(["'])products\.html\1/g, '$1/products$1'],
  [/(["'])contact\.html\1/g, '$1/contact$1'],
  [/(["'])privacy\.html\1/g, '$1/privacy$1'],
  [/(["'])terms\.html\1/g, '$1/terms$1'],
  [/(["'])shipping\.html\1/g, '$1/shipping$1'],
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

/** Compile a .jsx file to plain JS, emitted under /app/ with an absolute URL. */
async function compileJsx(srcDir, file) {
  const code = await fs.readFile(path.join(ROOT, srcDir, file), "utf8");
  const out = await transform(code, { loader: "jsx", format: "iife", target: "es2018" });
  /* Nav links are rendered by React, so they live in these compiled bundles
     rather than in the HTML — the page-level link rewriting never sees them.
     Apply the same map here, which lets the source keep relative paths (so the
     local dev server still works) while the build emits clean public URLs. */
  let js = out.code;
  for (const [re, to] of LINK_MAP) js = js.replace(re, to);
  const name = file.replace(/\.jsx$/, ".js");
  const dest = path.join(OUT, "app", name);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, js);
  return "/app/" + name;
}

/** Rewrite a page: production React, no Babel, precompiled scripts, absolute URLs. */
async function buildPage({ src, out }) {
  let html = await fs.readFile(path.join(ROOT, src), "utf8");
  const srcDir = path.dirname(src);

  // 1. React dev (CDN) -> vendored production, referenced absolutely
  html = html.replace(
    /<script src="https:\/\/unpkg\.com\/react@[^"]+"[^>]*><\/script>/,
    `<script src="/vendor/react.production.min.js"></script>`
  );
  html = html.replace(
    /<script src="https:\/\/unpkg\.com\/react-dom@[^"]+"[^>]*><\/script>/,
    `<script src="/vendor/react-dom.production.min.js"></script>`
  );

  // 2. Babel is compile-time now — remove the runtime compiler entirely
  html = html.replace(/\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]+"[^>]*><\/script>/, "");

  // 3. External JSX -> precompiled JS at an absolute /app/ URL
  const jsxRefs = [...html.matchAll(/<script type="text\/babel" src="([^"]+)"><\/script>/g)];
  for (const [full, ref] of jsxRefs) {
    const url = await compileJsx(srcDir, ref);
    html = html.replace(full, `<script src="${url}"></script>`);
  }

  // 4. Plain relative scripts that live beside the page (e.g. shop data.js)
  html = html.replace(/<script src="(?!\/|https?:|\.\.\/)([^"]+\.js)"><\/script>/g, (m, f) => {
    return `<script src="/app/${f}"></script>`;
  });

  // 5. Inline text/babel blocks -> compiled inline scripts
  const inline = [...html.matchAll(/<script type="text\/babel">([\s\S]*?)<\/script>/g)];
  for (const [full, body] of inline) {
    const c = await transform(body, { loader: "jsx", target: "es2018" });
    html = html.replace(full, `<script>${c.code.trim()}</script>`);
  }

  // 6. ../../foo -> /foo, and ../foo -> /foo (pages now sit at the root)
  html = html.replace(/(["'])\.\.\/\.\.\//g, "$1/").replace(/(["'])\.\.\//g, "$1/");

  // 7. Internal page links -> clean public URLs
  for (const [re, to] of LINK_MAP) html = html.replace(re, to);

  const dest = path.join(OUT, out);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, html);
}

/** Copy any plain .js that sits beside a page (shop's data.js) into /app/. */
async function copySiblingScripts() {
  const extras = [["ui_kits/shop", "data.js"]];
  for (const [dir, file] of extras) {
    const s = path.join(ROOT, dir, file);
    if (!(await fs.stat(s).catch(() => null))) continue;
    await fs.mkdir(path.join(OUT, "app"), { recursive: true });
    await fs.copyFile(s, path.join(OUT, "app", file));
  }
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

  await copySiblingScripts();
  for (const page of PAGES) {
    await buildPage(page);
    console.log("  built ", page.out);
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
