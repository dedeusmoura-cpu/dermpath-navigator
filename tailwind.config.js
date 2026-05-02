/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#141b2b",
        steel: "#556070",
        mist: "#e7e0d0",
        paper: "#fcfaf4",
        sand: "#efe7d8",
        accent: "#a97a1f"
      },
      boxShadow: {
        panel: "0 24px 60px -34px rgba(20, 27, 43, 0.22)"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(169, 122, 31, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 27, 43, 0.04) 1px, transparent 1px)"
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui"],
        serif: ['"Fraunces"', "ui-serif", "Georgia"]
      }
    }
  },
  plugins: []
};
