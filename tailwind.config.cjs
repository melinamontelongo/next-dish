/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["retro"
/*       {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=valentine]"],
          "base-100": "#0000",
          neutral: "#0000",
        },
      }, */
    ],
  },
}
