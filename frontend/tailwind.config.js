/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#ffffff",
        ink: "#013D3B",
        green: "#00C776",
      },
      fontFamily: {
        disp: [
          "Sora",
          "Be Vietnam Pro",
          "Plus Jakarta Sans",
          "Noto Sans SC",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "Plus Jakarta Sans",
          "Be Vietnam Pro",
          "Noto Sans SC",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
}
