import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        teal: {
          DEFAULT: 'rgb(5, 145, 125)',
        },
        mutedTurquoise: 'rgb(155, 188, 181)',
        brightPink: 'rgb(246, 98, 128)',
        lightPink: 'rgb(255, 204, 204)',
        mediumTurquoise: 'rgb(87, 168, 159)',
        lightGray: 'rgb(204, 208, 204)',
      },
    },
  },
  plugins: [],
};
export default config
