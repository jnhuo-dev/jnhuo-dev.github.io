import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import content from "./plugins/content";

export default defineConfig({
  base: "./",
  plugins: [react(), content()],
});
