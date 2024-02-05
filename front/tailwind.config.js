/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontSize: {
        custom: "13px",
      },
      colors: {
        customBlue: "#4472c4",
        customRed: "#ed7d31",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
