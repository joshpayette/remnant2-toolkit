const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'ping-slow': 'ping 5s cubic-bezier(0, 0, 0.2, 1) 2',
        slideIn: 'slideIn 0.5s ease-in-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: {
          DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
          solid: 'rgb(var(--color-background-solid) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          solid: 'rgb(var(--color-surface-solid) / <alpha-value>)',
        },
        gray: {
          50: 'rgb(var(--color-gray-50) / <alpha-value>)',
          100: 'rgb(var(--color-gray-100) / <alpha-value>)',
          200: 'rgb(var(--color-gray-200) / <alpha-value>)',
          300: 'rgb(var(--color-gray-300) / <alpha-value>)',
          400: 'rgb(var(--color-gray-400) / <alpha-value>)',
          500: 'rgb(var(--color-gray-500) / <alpha-value>)',
          600: 'rgb(var(--color-gray-600) / <alpha-value>)',
          700: 'rgb(var(--color-gray-700) / <alpha-value>)',
          800: 'rgb(var(--color-gray-800) / <alpha-value>)',
          900: 'rgb(var(--color-gray-900) / <alpha-value>)',
          950: 'rgb(var(--color-gray-950) / <alpha-value>)',
        },
        zinc: {
          50: 'rgb(var(--color-zinc-50) / <alpha-value>)',
          100: 'rgb(var(--color-zinc-100) / <alpha-value>)',
          200: 'rgb(var(--color-zinc-200) / <alpha-value>)',
          300: 'rgb(var(--color-zinc-300) / <alpha-value>)',
          400: 'rgb(var(--color-zinc-400) / <alpha-value>)',
          500: 'rgb(var(--color-zinc-500) / <alpha-value>)',
          600: 'rgb(var(--color-zinc-600) / <alpha-value>)',
          700: 'rgb(var(--color-zinc-700) / <alpha-value>)',
          800: 'rgb(var(--color-zinc-800) / <alpha-value>)',
          900: 'rgb(var(--color-zinc-900) / <alpha-value>)',
          950: 'rgb(var(--color-zinc-950) / <alpha-value>)',
        },
        primary: {
          50: 'rgb(var(--color-cyan-50) / <alpha-value>)',
          100: 'rgb(var(--color-cyan-100) / <alpha-value>)',
          200: 'rgb(var(--color-cyan-200) / <alpha-value>)',
          300: 'rgb(var(--color-cyan-300) / <alpha-value>)',
          400: 'rgb(var(--color-cyan-400) / <alpha-value>)',
          500: 'rgb(var(--color-cyan-500) / <alpha-value>)',
          600: 'rgb(var(--color-cyan-600) / <alpha-value>)',
          700: 'rgb(var(--color-cyan-700) / <alpha-value>)',
          800: 'rgb(var(--color-cyan-800) / <alpha-value>)',
          900: 'rgb(var(--color-cyan-900) / <alpha-value>)',
          950: 'rgb(var(--color-cyan-950) / <alpha-value>)',
        },
        secondary: {
          50: 'rgb(var(--color-violet-50) / <alpha-value>)',
          100: 'rgb(var(--color-violet-100) / <alpha-value>)',
          200: 'rgb(var(--color-violet-200) / <alpha-value>)',
          300: 'rgb(var(--color-violet-300) / <alpha-value>)',
          400: 'rgb(var(--color-violet-400) / <alpha-value>)',
          500: 'rgb(var(--color-violet-500) / <alpha-value>)',
          600: 'rgb(var(--color-violet-600) / <alpha-value>)',
          700: 'rgb(var(--color-violet-700) / <alpha-value>)',
          800: 'rgb(var(--color-violet-800) / <alpha-value>)',
          900: 'rgb(var(--color-violet-900) / <alpha-value>)',
          950: 'rgb(var(--color-violet-950) / <alpha-value>)',
        },
        accent1: {
          50: 'rgb(var(--color-yellow-50) / <alpha-value>)',
          100: 'rgb(var(--color-yellow-100) / <alpha-value>)',
          200: 'rgb(var(--color-yellow-200) / <alpha-value>)',
          300: 'rgb(var(--color-yellow-300) / <alpha-value>)',
          400: 'rgb(var(--color-yellow-400) / <alpha-value>)',
          500: 'rgb(var(--color-yellow-500) / <alpha-value>)',
          600: 'rgb(var(--color-yellow-600) / <alpha-value>)',
          700: 'rgb(var(--color-yellow-700) / <alpha-value>)',
          800: 'rgb(var(--color-yellow-800) / <alpha-value>)',
          900: 'rgb(var(--color-yellow-900) / <alpha-value>)',
          950: 'rgb(var(--color-yellow-950) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
