/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
        black: "1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1spx 0 #000",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      }, 
      fontFamily: {
        geistSans: "var(--font-geist-sans)",
        geistMono: "var(--font-geist-mono)",
        playwriteGBS: "var(--font-playwriteGBS)",
        playwriteGBS: "var(--font-itim)",
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-xy': 'gradient-xy 5s ease infinite',
        like: 'like 400ms ease',
        dislike: 'dislike 400ms ease',
      },
      keyframes: {
        like: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        dislike: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 100%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 100%',
            'background-position': 'right center'
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        }
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-outline-black": {
          textShadow:
            "1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
        },
      });
  },],
};
