/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lucky: {
          50: '#fef7e6',
          100: '#fdecc3',
          200: '#fbd68a',
          300: '#f8bb4d',
          400: '#f59e20',
          500: '#f2850e',
          600: '#e36a0a',
          700: '#bc520c',
          800: '#964110',
          900: '#7a3610',
        },
        paw: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wag-tail': 'wag 1s ease-in-out infinite',
        'pulse-gentle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        wag: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        }
      },
      fontFamily: {
        'dog': ['Comic Sans MS', 'cursive'],
      }
    },
  },
  plugins: [],
} 