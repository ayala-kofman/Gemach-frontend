/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#EED9B9",
        primary: "#D53E0F",
        secondary: "#9B0F06",
        dark: "#5E0006",
      },
    },
  },
  plugins: [],
}

