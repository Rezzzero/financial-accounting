/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-theme": "var(--background-color)",
        "text-theme": "var(--text-color)",
        "target-color": "var(--target-color)",
        "text-hover-color": "var(--button-color)",
        "hover-color": "var(--hover-color)",
        "theme-button-hover-color": "var(--button-hover-color)",
        "theme-border-color": "var(--border-color)",
        "theme-shadow-color": "var(--shadow-color)",
        "sidebar-shadow-color": "var(--sidebar-shadow-color)",
        "theme-button-color": "var(--button-color)",
        "theme-add-button-color": "var(--add-button-color)",
      },
      boxShadow: {
        summary: "0 6px 8px -1px var(--shadow-color)",
        sidebar: "0 0px 25px 3px var(--sidebar-shadow-color)",
      },
    },
  },
  plugins: [],
};
