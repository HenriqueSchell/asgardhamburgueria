/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}', 
    './components/**/*.{html,js,ts,jsx,tsx}', 
    './pages/**/*.{html,js,ts,jsx,tsx}', 
    './index.html' 
  ],
  theme: {
    fontFamily:{
      'sans': ['Roboto', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        "home": "url('/src/mideas/bg.png')"
      }
    },
  },
  plugins: [],
}

