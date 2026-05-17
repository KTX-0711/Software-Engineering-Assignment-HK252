/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'steel-blue': {
          50: '#eaf3fb',
          100: '#d5e6f6',
          200: '#aacdee',
          300: '#80b4e5',
          400: '#569bdc',
          500: '#2b82d4',
          600: '#2368a9',
          700: '#1a4e7f',
          800: '#113455',
          900: '#091a2a',
          950: '#06121e'
        },
        'cobalt-blue': {
          50: '#e7eefe',
          100: '#cfdefc',
          200: '#9ebdfa',
          300: '#6e9cf7',
          400: '#3d7af5',
          500: '#0d59f2',
          600: '#0a47c2',
          700: '#083691',
          800: '#052461',
          900: '#031230',
          950: '#020c22'
        },
        'bright-snow': {
          50: '#f1f3f3',
          100: '#e3e8e8',
          200: '#c8d0d0',
          300: '#acb9b9',
          400: '#91a1a1',
          500: '#758a8a',
          600: '#5e6e6e',
          700: '#465353',
          800: '#2f3737',
          900: '#171c1c',
          950: '#101313'
        },
        'alabaster-grey': {
          50: '#f2f2f3',
          100: '#e5e5e6',
          200: '#cacace',
          300: '#b0b0b5',
          400: '#96969c',
          500: '#7c7c83',
          600: '#636369',
          700: '#4a4a4f',
          800: '#313135',
          900: '#19191a',
          950: '#111112'
        },
        'royal-azure': {
          50: '#e8eefc',
          100: '#d1ddfa',
          200: '#a4bbf4',
          300: '#7698ef',
          400: '#4876ea',
          500: '#1b54e4',
          600: '#1543b7',
          700: '#103289',
          800: '#0b225b',
          900: '#05112e',
          950: '#040c20'
        },
        'app-bg': '#f1f3f3',
        'app-card': '#FEFEFE',
        'app-text': '#19191a',
        'app-muted': '#5e6e6e',
        'app-border': '#aacdee',
        'app-accent': '#0a47c2',
        'app-dark': '#052461',
        'bk-black': '#19191a',
        'bk-white': '#FEFEFE',
        'bk-sky': '#aacdee',
        'bk-blue': '#0a47c2',
        'bk-snow': '#f1f3f3'
      },
      boxShadow: {
        soft: '0 20px 44px rgba(8, 54, 145, 0.10)'
      }
    }
  },
  plugins: []
};
