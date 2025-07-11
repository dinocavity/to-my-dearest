/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          300: '#fcd34d',
        },
        stone: {
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
        },
        lime: {
          100: '#f7fee7',
          300: '#a3e635',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Nunito', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
