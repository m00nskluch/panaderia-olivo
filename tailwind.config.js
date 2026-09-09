/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            50: '#fff1f2',
            100: '#ffe4e6',
            500: '#f43f5e',
            600: '#e11d48',
            700: '#be123c', // Carmín artesanal
            800: '#9f1239',
            900: '#881337',
          },
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            500: '#f59e0b',
            600: '#d97706', // Dorado horneado
            700: '#b45309',
            800: '#92400e',
          },
          cream: {
            50: '#fdfbf7', // Fondo cálido principal
            100: '#f8f4ec',
            200: '#f0e8db',
            300: '#e4d6c1',
          },
          charcoal: {
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a', // Grafito profundo
            950: '#090d14',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.05)',
        'glow-red': '0 0 25px -3px rgba(190, 18, 60, 0.35)',
        'glow-gold': '0 0 25px -3px rgba(217, 119, 6, 0.35)',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        bounceShort: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
        'bounce-short': 'bounceShort 0.4s ease-in-out',
      }
    },
  },
  plugins: [],
}
