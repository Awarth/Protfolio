/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "500px",
      md: "780px",
      lg: "1024px",
      xl: "1280px",

      1050: "1050px",
      900: "900px",
      650: "650px",
      450: "450px",
      350: "350px",
    },
    extend: {},
  },
  plugins: [],
};
