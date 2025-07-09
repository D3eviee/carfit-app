import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'inner-md': 'inset 0 4px 6px rgba(0, 0, 0, 0.3)',
        'inner-white': 'inset 0px -0px 70px rgba(255, 255, 255)',
        'inner-glass': 'inset 0 1px 6px rgba(255, 255, 255, 0.2), inset 0 -1px 6px rgba(0, 0, 0, 0.1), 1px 1px 1px #F2F2F820',
        'inner-glass-sm': 'inset 0px 1px 2px #F2F2F7, inset 0 -1px 2px #F2F2F7',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
} satisfies Config;