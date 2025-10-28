/** @type {import('tailwindcss').Config} */
    export default {
      darkMode: 'class',
      content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
          colors: {
            'deep-space-navy': '#0A0F1E',
            'nebula-white': '#F0F4F8',
            'kinetic-teal': {
              DEFAULT: 'hsl(185, 90%, 55%)',
              dark: 'hsl(185, 80%, 45%)',
            },
          },
          animation: {
            'fade-in': 'fadeIn 0.5s ease-out forwards',
            'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
            fadeInUp: {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          },
        },
      },
      plugins: [require('tailwindcss-animate')],
    };