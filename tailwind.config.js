/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f1',
          100: '#dbf1de',
          200: '#bae3bf',
          300: '#8ecd97',
          400: '#5fb06a',
          500: '#429149',
          600: '#2f7539',
          700: '#275e2f',
          800: '#224a29',
          900: '#1d3d23',
          950: '#0a2111',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#ebeef3',
          200: '#d2dae5',
          300: '#adbbd0',
          400: '#8196b5',
          500: '#62799c',
          600: '#4d6081',
          700: '#405069',
          800: '#374458',
          900: '#323c4c',
          950: '#1f2634',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'grow-branch': 'grow-branch 2s ease-in-out',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        'grow-branch': {
          '0%': { height: '0', opacity: '0' },
          '100%': { height: '100%', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(5deg)' },
          '50%': { transform: 'translateY(0) rotate(0deg)' },
          '75%': { transform: 'translateY(10px) rotate(-5deg)' },
        },
      },
    },
  },
  plugins: [],
} 