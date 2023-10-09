import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Use the Vite plugin for React
  server: {
    port: 3000, // The development server's port
    open: true, // Automatically open a browser window when the server starts
    proxy: {
      "/api": {
        target: "http://localhost:3001", // Proxy API requests to this target
        secure: false, // Disable SSL verification
        changeOrigin: true, // Change the origin of the request to match the target
      },
    },
  },
});
