/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in-left': 'slideInLeft 0.6s cubic-bezier(.25,.75,.5,1.25)',
        'fade-in': 'fadeIn 0.6s cubic-bezier(.25,.75,.5,1.25)',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(.25,.75,.5,1.25)',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'bounce-custom': 'cubic-bezier(.25,.75,.5,1.25)',
      },
    },
  },
  plugins: [],
}