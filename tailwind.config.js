/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
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
          950: '#2d1e15',
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
          900: '#1b2b22',
          950: '#0f1711',
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
        },
        cream: '#fdfbf7',
        ink: '#1a1612',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['2.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 10px 20px -10px rgba(0, 0, 0, 0.03)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'premium': '0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 40px -10px rgba(188, 148, 106, 0.35)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #bc946a 0%, #865f3f 100%)',
        'gradient-sage': 'linear-gradient(135deg, #5b8765 0%, #2f4534 100%)',
        'gradient-cream': 'linear-gradient(180deg, #fdfbf7 0%, #f7f2ea 100%)',
        'gradient-deep': 'linear-gradient(180deg, #1a1612 0%, #2d1e15 100%)',
        'gradient-mesh': 'radial-gradient(at 0% 0%, rgba(188, 148, 106, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(91, 135, 101, 0.15) 0px, transparent 50%)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
