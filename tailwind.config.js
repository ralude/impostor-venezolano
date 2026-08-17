/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Material Design 3 — esquema oscuro con primario turquesa neón
        primary: '#00F0C8',
        'on-primary': '#002B22',
        'primary-container': '#005643',
        'on-primary-container': '#8CF8DC',
        background: '#0B1210',
        surface: '#0B1210',
        'surface-container': '#16211E',
        'surface-container-high': '#1D2B27',
        'on-surface': '#DFE8E4',
        'on-surface-variant': '#9DB4AD',
        outline: '#43554F',
        error: '#FFB4AB',
        'on-error': '#690005',
        'error-container': '#93000A',
        'on-error-container': '#FFDAD6',
        scrim: '#000000',
      },
    },
  },
  plugins: [],
};
