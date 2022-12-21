/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        main_green:"#F4F7EC",
        main_baige:"#FFFBF0",
        border_green:"#B7E459",
        text_green:"#5A7A1F",
        button_background:"#FFE3A1",
        button_text:"#4C350D"
      },
      width:{
        "1/2":"50%"
      },
      maxWidth:{
        section:"1180px"
      },
      fontFamily:{
        main_font: ["Poppins","sans-serif"],
        submain_font: ["Inter","sans-serif"],
      },
    },
  },
  plugins: [],
}
