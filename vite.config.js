import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Rock-Paper-scissors/",
  plugins: [tailwindcss()],
});
