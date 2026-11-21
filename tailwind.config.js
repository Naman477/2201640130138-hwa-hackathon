/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdfbf7',
          100: '#f7f2ea',
          200: '#eee3d2',
          300: '#e1cdb2',
          400: '#cfb08c',
          500: '#bc946a',
          600: '#a67b52',
          700: '#865f3f',
          800: '#6d4c35',
          900: '#593e2e',
          950: '#322118',
        },
        sage: {
          50: '#f3f7f4',
          100: '#e3ede5',
          200: '#c8dbcc',
          300: '#a3c2aa',
          400: '#7aa383',
          500: '#5b8765',
          600: '#466c4f',
          700: '#385640',
          800: '#2f4534',
          900: '#283a2d',
        },
        forest: {
          800: '#1b3826',
          900: '#13281c',
          950: '#0a160f',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        earth: {
          DEFAULT: '#3d312a',
          light: '#655449',
          dark: '#231b17',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
};
