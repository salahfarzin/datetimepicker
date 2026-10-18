import { copyFile, readFile, readdir, writeFile } from "node:fs/promises";
import { defineConfig } from "tsup";

/**
 * After the build:
 * - react-date-object has no "exports" map, so Node's ESM loader (Vitest in
 *   the apps, for one) needs the file extension on its subpaths. Its types
 *   are declared for the bare paths, so the source keeps those.
 * - The components use state and effects: their bundle is marked client code
 *   so Next.js server components can render them. The calendar helpers stay
 *   unmarked, so server components can call them.
 */
async function postBuild() {
  // Every bundle, including the chunk ESM splitting shares between entries.
  const bundles = (await readdir("dist")).filter((name) => /\.c?js$/.test(name)).map((name) => `dist/${name}`);
  for (const file of bundles) {
    let code = await readFile(file, "utf8");
    code = code.replaceAll(/(react-date-object\/(?:calendars|locales)\/[a-z_]+)(["'])/g, "$1.js$2");
    if (file.startsWith("dist/index.")) code = `"use client";\n${code}`;
    await writeFile(file, code);
  }
  await copyFile("src/styles.css", "dist/styles.css");
}

export default defineConfig({
  entry: { index: "src/index.ts", calendars: "src/calendars.ts" },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  external: ["react", "react-dom", "react-multi-date-picker", "react-date-object"],
  onSuccess: postBuild,
});
