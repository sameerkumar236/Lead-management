/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 16px 40px -24px rgba(15, 23, 42, 0.35)",
        elevated: "0 22px 55px -30px rgba(15, 23, 42, 0.45)"
      }
    }
  },
  plugins: []
};
