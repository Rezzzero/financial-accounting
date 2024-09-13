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
        "theme-button-color": "var(--button-color)",
        "theme-add-button-color": "var(--add-button-color)",
      },
    },
  },
  plugins: [],
};
