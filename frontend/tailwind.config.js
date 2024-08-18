/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/*/*.{tsx,jsx,ts,js}','./src/*/*/*.{tsx,jsx,ts,js}','./src/*/*/*/*.{tsx,jsx,ts,js}'],
  theme: {
    extend: {
      colors : {
        'primary' :  '#f97516',
        'primaryDark' : '#e3670e',
        'primaryLight' : '#fc8732',
      }
    },
  },
  plugins: [],
}

