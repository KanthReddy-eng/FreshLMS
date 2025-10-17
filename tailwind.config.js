/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        'primary-dark': '#45a049',
        'primary-light': '#81C784',
        dark: '#212121',
        'dark-light': '#424242',
      },
    },
  },
  plugins: [],
}
