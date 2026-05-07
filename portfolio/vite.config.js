import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/docs/",
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
          writeFileSync(resolve(__dirname, "../index.html"), docsHtml);
          console.log("Root index.html synced.");
        } catch (e) {
          console.error("sync-root-index:", e.message);
        }
      },
    },
  ].filter(Boolean),
}));
