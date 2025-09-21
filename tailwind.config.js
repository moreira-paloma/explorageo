// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Corpo de texto com Poppins
        heading: ['Nunito', 'sans-serif'], // Títulos com Nunito
      },
      fontWeight: {
        light: 300, // Peso leve para o corpo
        normal: 400, // Peso normal para o corpo
        bold: 700, // Peso mais forte para títulos
        extraBold: 800, // Peso extra para títulos de impacto
      },
    },
  },
  plugins: [],
};
