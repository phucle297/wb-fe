import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  // @ts-ignore
  test: {
    include: ["**/*.spec.[tj]s", "**/*.spec.[tj]sx"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    testTimeout: 20000,
  },
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
  ],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
