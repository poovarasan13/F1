/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        card: '#09090b',
        border: '#1f1f1f',
        success: '#22C55E',
        warning: '#EAB308',
        danger: '#EF4444',
        accel: '#3B82F6',
        gyro: '#8B5CF6',
        muted: '#A1A1AA'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
