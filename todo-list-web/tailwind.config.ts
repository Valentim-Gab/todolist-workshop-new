import type { Config } from 'tailwindcss'

const config = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        accent: {
          DEFAULT: 'var(--accent)',
          orange: 'var(--accent-orange)',
        },
        dark: {
          DEFAULT: 'var(--dark)',
          light: 'var(--dark-light)',
        },
        positive: 'var(--positive)',
        negative: 'var(--negative)',
        warning: 'var(--warning)',
        info: 'var(--info)',
        muted: 'var(--muted)',
      },
    },
    screens: {
      xs: '0px',
      sm: '600px',
      md: '1024px',
      lg: '1440px',
      xl: '1920px',
    },
  },
  plugins: [],
} satisfies Config

export default config
