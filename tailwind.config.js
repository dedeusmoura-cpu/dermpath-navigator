/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10243b",
        steel: "#46566b",
        mist: "#dfe7f0",
        paper: "#f7f8fb",
        sand: "#ece8e1",
        accent: "#204b74"
      },
      boxShadow: {
        panel: "0 20px 45px -30px rgba(16, 36, 59, 0.35)"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(16, 36, 59, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 36, 59, 0.06) 1px, transparent 1px)"
      },
      fontFamily: {
        sans: ['\"Manrope\"', "ui-sans-serif", "system-ui"],
        serif: ['\"Source Serif 4\"', "ui-serif", "Georgia"]
      }
    }
  },
  plugins: []
};
