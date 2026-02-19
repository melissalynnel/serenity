import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // Use root path for local dev, GitHub Pages subpath for production builds.
  base: command === "serve" ? "/" : "/serenity/",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
  plugins: [react()],
}));
