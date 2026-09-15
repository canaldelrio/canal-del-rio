import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#020c18',
        panel: '#061626',
        blue: '#0789ff',
      },
      boxShadow: {
        glow: '0 0 35px rgba(0, 132, 255, 0.12)',
      },
    },
  },
  plugins: [],
}
export default config
