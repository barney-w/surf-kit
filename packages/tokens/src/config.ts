import StyleDictionary from "style-dictionary";
import { formattedVariables } from "style-dictionary/utils";
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
const brandComponentTokens = resolve(root, "src/component/components-brand.json");

// Register custom format for light (default) tokens wrapped in @layer surf.tokens
StyleDictionary.registerFormat({
  name: "css/variables-layered",
  format: ({ dictionary, options, file }) => {
    const header = file?.destination
      ? `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n`
      : "";
    const vars = formattedVariables({
      format: "css",
      dictionary,
      outputReferences: options?.outputReferences ?? false,
      usesDtcg: true,
    });
    return `${header}@layer surf.tokens {\n  :root {\n${vars}\n  }\n}\n`;
  },
});

// Register custom format that wraps output in [data-color-mode="light"] { ... }
// Needed so light tokens can override inherited dark/brand values in nested ThemeProviders
StyleDictionary.registerFormat({
  name: "css/variables-light",
  format: ({ dictionary, options }) => {
    const selector = '[data-color-mode="light"]';
    const vars = formattedVariables({
      format: "css",
      dictionary,
      outputReferences: options?.outputReferences ?? false,
      usesDtcg: true,
    });
    return `@layer surf.tokens {\n  ${selector} {\n${vars}\n  }\n}\n`;
  },
});

// Register custom format that wraps output in [data-color-mode="dark"] { ... }
StyleDictionary.registerFormat({
  name: "css/variables-dark",
  format: ({ dictionary, options }) => {
    const selector = '[data-color-mode="dark"]';
    const vars = formattedVariables({
      format: "css",
      dictionary,
      outputReferences: options?.outputReferences ?? false,
      usesDtcg: true,
    });
    return `@layer surf.tokens {\n  ${selector} {\n${vars}\n  }\n}\n`;
  },
});

// Register custom format that wraps output in [data-color-mode="brand"] { ... }
StyleDictionary.registerFormat({
  name: "css/variables-brand",
  format: ({ dictionary, options }) => {
    const selector = '[data-color-mode="brand"]';
    const vars = formattedVariables({
      format: "css",
      dictionary,
      outputReferences: options?.outputReferences ?? false,
      usesDtcg: true,
    });
    return `@layer surf.tokens {\n  ${selector} {\n${vars}\n  }\n}\n`;
  },
});

async function build() {
  // ── Light build ──────────────────────────────────────────────
  const lightSD = new StyleDictionary({
    include: primitives,
    source: [
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
            format: "css/variables-layered",
            options: {
              outputReferences: true,
            },
          },
          {
            destination: "variables-light.css",
            format: "css/variables-light",
            options: {
              outputReferences: false,
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
    include: primitives,
    source: [
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
            format: "css/variables-dark",
            options: {
              outputReferences: false,
            },
          },
        ],
      },
    },
  });

  await darkSD.hasInitialized;
  await darkSD.buildAllPlatforms();
  console.log("Dark build complete.");

  // ── Brand build (CSS only) ──────────────────────────────────
  const brandSD = new StyleDictionary({
    include: [...primitives, componentTokens],
    source: [
      resolve(root, "src/semantic/brand.json"),
      brandComponentTokens,
    ],
    platforms: {
      css: {
        transformGroup: "css",
        prefix: "surf",
        buildPath: resolve(root, "dist/css") + "/",
        files: [
          {
            destination: "variables-brand.css",
            format: "css/variables-brand",
            options: {
              outputReferences: false,
            },
          },
        ],
      },
    },
  });

  await brandSD.hasInitialized;
  await brandSD.buildAllPlatforms();
  console.log("Brand build complete.");

  console.log("All token builds complete.");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
