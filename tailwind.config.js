/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          dark: '#1B4332',
          DEFAULT: '#2D6A4F',
          light: '#40916C',
          pastel: '#95D5B2',
          pale: '#D8F3DC',
        },
        tropical: {
          orange: '#F4A261',
          yellow: '#E9C46A',
          red: '#E76F51',
          teal: '#2A9D8F',
          dark: '#264653',
        },
        natural: {
          white: '#FAFAFA',
          cream: '#FFFDF9',
          gray: '#F0F2F0',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
