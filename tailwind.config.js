/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#123B2A',
          dark: '#0B2419',
          deep: '#123B2A',
          light: '#1B4E38',
          hover: '#184230'
        },
        agri: {
          DEFAULT: '#3F6B45',
          light: '#528258',
          dark: '#2F5234'
        },
        gold: {
          DEFAULT: '#C69A3A',
          light: '#DDB357',
          dark: '#A67E28',
          muted: '#E6D7B4'
        },
        ivory: {
          DEFAULT: '#F7F4EC',
          light: '#FAF8F3',
          dark: '#ECE7DC',
          cream: '#F2EDE2'
        },
        charcoal: {
          DEFAULT: '#202522',
          light: '#2E3531',
          muted: '#525B56'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(18, 59, 42, 0.08)',
        'card': '0 10px 30px -5px rgba(18, 59, 42, 0.1)',
        'card-hover': '0 20px 40px -8px rgba(18, 59, 42, 0.18)',
        'glow-gold': '0 0 25px rgba(198, 154, 58, 0.25)',
      },
      backgroundImage: {
        'forest-gradient': 'linear-gradient(135deg, #123B2A 0%, #0B2419 100%)',
        'subtle-overlay': 'linear-gradient(to bottom, rgba(18, 59, 42, 0.75), rgba(11, 36, 25, 0.9))',
      }
    },
  },
  plugins: [],
}
