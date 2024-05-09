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
      animation: {
        'ping-slow': 'ping 5s cubic-bezier(0, 0, 0.2, 1) 2',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // --- Primary ---
        'primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'on-primary': 'rgb(var(--color-on-primary) / <alpha-value>)',
        'primary-container': 'rgb(var(--color-primary-container) / <alpha-value>)',
        'on-primary-container': 'rgb(var(--color-on-primary-container) / <alpha-value>)',
        'primary-inverse': 'rgb(var(--color-primary-inverse) / <alpha-value>)',
        // --- Secondary ---
        'secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
        'on-secondary': 'rgb(var(--color-on-secondary) / <alpha-value>)',
        'secondary-container': 'rgb(var(--color-secondary-container) / <alpha-value>)',
        'on-secondary-container': 'rgb(var(--color-on-secondary-container) / <alpha-value>)',
        'secondary-inverse': 'rgb(var(--color-secondary-inverse) / <alpha-value>)',
        // --- Tertiary ---
        'tertiary': 'rgb(var(--color-tertiary) / <alpha-value>)',
        'on-tertiary': 'rgb(var(--color-on-tertiary) / <alpha-value>)',
        'tertiary-container': 'rgb(var(--color-tertiary-container) / <alpha-value>)',
        'on-tertiary-container': 'rgb(var(--color-on-tertiary-container) / <alpha-value>)',
        'tertiary-inverse': 'rgb(var(--color-tertiary-inverse) / <alpha-value>)',
        // --- Highlight ---
        'highlight': 'rgb(var(--color-highlight) / <alpha-value>)',
        'on-highlight': 'rgb(var(--color-on-highlight) / <alpha-value>)',
        'highlight-container': 'rgb(var(--color-highlight-container) / <alpha-value>)',
        'on-highlight-container': 'rgb(var(--color-on-highlight-container) / <alpha-value>)',
        'highlight-inverse': 'rgb(var(--color-highlight-inverse) / <alpha-value>)',
        // --- Background ---
        'background': 'rgb(var(--color-background) / <alpha-value>)',
        'on-background': 'rgb(var(--color-on-background) / <alpha-value>)',
        'background-variant': 'rgb(var(--color-background-variant) / <alpha-value>)',
        'on-background-variant': 'rgb(var(--color-on-background-variant) / <alpha-value>)',
        'background-container': 'rgb(var(--color-background-container) / <alpha-value>)',
        'background-blend': 'rgb(var(--color-background-blend) / <alpha-value>)',
        'outline': 'rgb(var(--color-outline) / <alpha-value>)',
        'outline-variant': 'rgb(var(--color-outline-variant) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
