/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 0px 30px hsl(222, 50%, 30%)',
        '4xl': '0px 0px 30px hsla(1, 0%, 0%, 0.4)',
      },
      colors: {
        'myblue': "hsl(222, 50%, 30%)",
        'mylightblue': "hsl(222, 50%, 40%)",
        'mydarkblue': "hsl(222, 65%, 10%)",
        'readmedark': "hsl(222, 28%, 7%)",
        'buttonhover': "hsl(222, 63%, 15%)",
        'buttonactive': "hsl(222, 63%, 20%)",
        'gradientfrom': "hsla(222, 52%, 15%)",
        'gradientto': "hsl(222, 61%, 11%)",
      }
    },
  },
  plugins: [],
}
