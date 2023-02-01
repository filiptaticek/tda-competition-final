/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        button_green:"rgb(16 185 129)",
        button_red: "rgb(225 29 72)",
        main_color: "rgb(107 33 168)",
      },
      maxWidth: {
        page_max:"1434px",
      }
    },
  },
  plugins: [],
}
