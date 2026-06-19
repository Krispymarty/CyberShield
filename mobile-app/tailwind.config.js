/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        sentinel: {
          navy: '#0A1628',
          dark: '#060D18',
          blue: '#208AEF',
          cyan: '#00D4FF',
          card: 'rgba(255,255,255,0.08)',
          cardBorder: 'rgba(255,255,255,0.12)',
          glow: 'rgba(0,212,255,0.3)',
          success: '#00E676',
          danger: '#FF3D71',
          warning: '#FFAA00',
          muted: '#8F9BB3',
          surface: '#111B2E',
          surfaceLight: '#F0F4FA',
        },
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
