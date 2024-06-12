/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // primary: "#98C1D9",
      // secondary: "#a4cbb4",
    },
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["retro"],
  },
};
