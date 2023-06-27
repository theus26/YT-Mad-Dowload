/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
    content: [ './public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    
    theme: {
      extend: {
        colors: {
          "btn":"#8080F1",
          "cont":"#4AD295",
          "aud":"#FFA500",
          "d":"#1E293B"
        },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }
}