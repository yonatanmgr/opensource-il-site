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
      },
      colors: {
        'myblue': "hsl(222, 50%, 30%)",
        'mydarkblue': "hsl(222, 65%, 10%)",
        'readmedark': "hsl(222, 28%, 7%)",
        'buttonhover': "hsl(222, 63%, 15%)",
        'buttonactive': "hsl(222, 63%, 20%)"
      }
    },
  },
  plugins: [],
}
