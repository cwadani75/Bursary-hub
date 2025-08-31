// tailwind.config.js
module.exports = {
  darkMode: "class", // <-- THIS IS IMPORTANT
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
