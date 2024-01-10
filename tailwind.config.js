/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cust-bg": "#FFFDF3",
        "cust-green": "#1B512D"
      }
    },
  },
  plugins: [],
}

