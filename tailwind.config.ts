module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3300FF",
      },
      fontFamily: {
        pressstart: ['"Press Start 2P"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'main-gradient': `linear-gradient(145deg, #d6caf8 0%, #e2afaf 50%, #997fed 100%)`,
      },
    },
  },
  plugins: [],
};
