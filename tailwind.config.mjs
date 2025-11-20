import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1rem',
        lg: '1rem',
        xl: '3rem',
        '2xl': '14rem',
      },
    },
    fontFamily: {
      body: ['Be Vietnam Pro', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: colors.green[500],
      },
    },
  },
  plugins: [],
}
