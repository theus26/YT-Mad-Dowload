/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [ './public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          "btn":"#8080F1",
          "cont":"#4AD295",
          "aud":"#FFA500"
        },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }
}