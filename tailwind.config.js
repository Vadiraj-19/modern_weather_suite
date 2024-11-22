/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient-image': "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url('../image/background.mp4')",
      },
      screens: {
        'xs': '400px', // Custom for 375px (mobile)
        'sm-md': '770px', // Custom for 676px (tablet)
      },
    
      
    },
  },
  plugins: [
    
  ],
}