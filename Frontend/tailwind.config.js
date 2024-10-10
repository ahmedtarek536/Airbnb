/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF5A5F",
        secondary: "#6e6e73",
        bColor: "#dbdbdb",
      },
      fontFamily: {
        sans: ['"Robot"', "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
