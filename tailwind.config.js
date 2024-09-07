/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-theme": "var(--background-color)",
        "text-theme": "var(--text-color)",
        "target-color": "var(--target-color)",
        "hover-color": "var(--hover-color)",
      },
    },
  },
  plugins: [],
};
