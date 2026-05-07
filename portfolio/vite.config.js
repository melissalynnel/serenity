import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/serenity/",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
  plugins: [
    react(),
    command !== "serve" && {
      name: "sync-root-index",
      closeBundle() {
        try {
          const docsHtml = readFileSync(resolve(__dirname, "../docs/index.html"), "utf8");
          const scriptMatch = docsHtml.match(/src="\/serenity\/(assets\/[^"]+\.js)"/);
          const cssMatch = docsHtml.match(/href="\/serenity\/(assets\/[^"]+\.css)"/);
          if (!scriptMatch || !cssMatch) return;
          let rootHtml = readFileSync(resolve(__dirname, "../index.html"), "utf8");
          rootHtml = rootHtml
            .replace(/src="\.\/docs\/assets\/[^"]+\.js"/, `src="./docs/${scriptMatch[1]}"`)
            .replace(/href="\.\/docs\/assets\/[^"]+\.css"/, `href="./docs/${cssMatch[1]}"`);
          writeFileSync(resolve(__dirname, "../index.html"), rootHtml);
          console.log("Root index.html synced.");
        } catch (e) {
          console.error("sync-root-index:", e.message);
        }
      },
    },
  ].filter(Boolean),
}));
