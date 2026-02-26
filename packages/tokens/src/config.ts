import StyleDictionary from "style-dictionary";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, "..");

const primitives = [
  resolve(root, "src/primitives/colors.json"),
  resolve(root, "src/primitives/spacing.json"),
  resolve(root, "src/primitives/typography.json"),
  resolve(root, "src/primitives/radii.json"),
  resolve(root, "src/primitives/shadows.json"),
  resolve(root, "src/primitives/motion.json"),
];

const componentTokens = resolve(root, "src/component/components.json");

async function build() {
  // ── Light build ──────────────────────────────────────────────
  const lightSD = new StyleDictionary({
    source: [
      ...primitives,
      resolve(root, "src/semantic/light.json"),
      componentTokens,
    ],
    platforms: {
      css: {
        transformGroup: "css",
        prefix: "surf",
        buildPath: resolve(root, "dist/css") + "/",
        files: [
          {
            destination: "variables.css",
            format: "css/variables",
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      ts: {
        transformGroup: "js",
        buildPath: resolve(root, "dist/ts") + "/",
        files: [
          {
            destination: "tokens.js",
            format: "javascript/esm",
          },
          {
            destination: "tokens.d.ts",
            format: "typescript/es6-declarations",
          },
        ],
      },
      json: {
        transformGroup: "js",
        buildPath: resolve(root, "dist/json") + "/",
        files: [
          {
            destination: "tokens.json",
            format: "json/flat",
          },
        ],
      },
    },
  });

  await lightSD.hasInitialized;
  await lightSD.buildAllPlatforms();
  console.log("Light build complete.");

  // ── Dark build (CSS only) ────────────────────────────────────
  const darkSD = new StyleDictionary({
    source: [
      ...primitives,
      resolve(root, "src/semantic/dark.json"),
      componentTokens,
    ],
    platforms: {
      css: {
        transformGroup: "css",
        prefix: "surf",
        buildPath: resolve(root, "dist/css") + "/",
        files: [
          {
            destination: "variables-dark.css",
            format: "css/variables",
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  });

  await darkSD.hasInitialized;
  await darkSD.buildAllPlatforms();
  console.log("Dark build complete.");

  console.log("All token builds complete.");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
