import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace the base with your GitHub Pages repo name
export default defineConfig({
  plugins: [react()],
  base: "/react.weather.app/"
});
