/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "green": "#218d1f",
        "green-disabled": "#90b08f",
        "red-disabled": "#ff9e9e",
        "red": "#c20b0b",
        "blue-button": "#0066ff"
      }
    },
  },
  plugins: [],
};
