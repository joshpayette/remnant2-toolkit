import { type Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Omit<Config, 'content'> = {
  darkMode: ['selector', '[data-theme~="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};

export default config;
