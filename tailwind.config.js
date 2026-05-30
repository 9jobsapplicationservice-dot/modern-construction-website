/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B2341",        // Primary Navy
          secondary: "#1C4D8C",   // Secondary Blue
          light: "#EAF3FC",       // Light Blue
          yellow: "#F5B335",      // Accent Yellow
          bg: "#FFFFFF",          // White background
          section: "#F5F6F8",     // Section Background
          border: "#DADDE2",      // Border
          text: "#222222",        // Text color
          muted: "#667085",       // Muted Text
          card: "#FFFFFF",        // White cards

          // Legacy mappings to prevent compile errors during file updates
          primary: "#0B2341",
          charcoal: "#222222",
          sand: "#F5F6F8",
          textMuted: "#667085"
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        premiumHover: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }
    },
  },
  plugins: [],
};
