module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 4s infinite ease-in-out",
        blob1: "blob 8s infinite ease-in-out"
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px,0px) scale(1)"
          },
          "33%": {
            transform: "translate(30px,-50px) scale(1.15)"
          },
          "66%": {
            transform: "translate(-20px,20px) scale(0.85)"
          },
          "100%": {
            transform: "translate(0px,0px) scale(1)"
          }
        }
      }
    }
  },
  plugins: []
};
