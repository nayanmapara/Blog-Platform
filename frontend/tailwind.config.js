/** @type {import('tailwindcss').Config} */
const { nextui, colors } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        DEFAULT: '#7c3aed', // violet-600
        light: '#a78bfa',   // violet-400
        dark: '#5b21b6',    // violet-800
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

