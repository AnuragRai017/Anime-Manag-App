/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      transitionDelay: {
        '0': '0ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.3) 50%, transparent 75%)',
        'noise-pattern': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
        'dot-pattern': 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        'manga-texture': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.2)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)',
        'glow-primary': '0 0 5px var(--primary), 0 0 10px rgba(var(--primary), 0.5)',
        'neon': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px var(--primary), 0 0 20px var(--primary)',
        'manga': '2px 2px 0 #000, -2px -2px 0 #fff',
        'outline': '-1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3), 1px 1px 0 rgba(0,0,0,0.3)',
      },
      backgroundSize: {
        'auto-100': 'auto 100%',
        '200%': '200% 200%',
        '300%': '300% 300%',
        '16': '4rem',
      },
      backgroundPosition: {
        'shine-0': '0% 0%',
        'shine-100': '100% 100%',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        slideIn: 'slideIn 0.6s ease-out forwards',
        slideInRight: 'slideInRight 0.6s ease-out forwards',
        scaleIn: 'scaleIn 0.4s ease-out forwards',
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
        fadeInDown: 'fadeInDown 0.5s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        shimmerEffect: 'shimmerEffect 2.5s infinite',
        ripple: 'ripple 0.7s ease-out forwards',
        pageFlip: 'pageFlip 0.7s ease-in-out forwards',
        pageLoad: 'pageLoad 0.5s ease-out forwards',
        zoomPulse: 'zoomPulse 2s ease-in-out infinite',
        shine: 'shine 3s linear infinite',
        textGlow: 'textGlow 2s ease-in-out infinite',
        bgPulse: "bgPulse 3s ease-in-out infinite",
        borderGlow: "borderGlow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmerEffect: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(2.5)', opacity: 0 },
        },
        pageFlip: {
          '0%': { transform: 'rotateY(0deg)', transformOrigin: 'left' },
          '100%': { transform: 'rotateY(-180deg)', transformOrigin: 'left' },
        },
        pageLoad: {
          '0%': { transform: 'translateY(5px)', opacity: 0 },
          '50%': { transform: 'translateY(-5px)', opacity: 0.5 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        zoomPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        textGlow: {
          "0%": { textShadow: "0 0 5px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.1)" },
          "100%": { textShadow: "0 0 5px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1)" }
        },
        bgPulse: {
          "0%, 100%": { backgroundColor: "rgba(var(--primary), 0.05)" },
          "50%": { backgroundColor: "rgba(var(--primary), 0.15)" }
        },
        borderGlow: {
          "0%": { boxShadow: "0 0 5px rgba(var(--primary), 0.3)" },
          "100%": { boxShadow: "0 0 10px rgba(var(--primary), 0.7), 0 0 20px rgba(var(--primary), 0.4)" }
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [
    import("tailwindcss-animate").then(mod => mod.default),
    function({ addUtilities, theme }) {
      const textShadows = theme('textShadow', {})
      const textShadowUtilities = Object.entries(textShadows).reduce(
        (utilities, [key, value]) => ({
          ...utilities,
          [`.text-shadow-${key}`]: {
            textShadow: value,
          },
        }),
        {}
      )
      addUtilities(textShadowUtilities)

      // Add animated background shine effect
      addUtilities({
        '.bg-shine': {
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            backgroundImage: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
            animation: 'shine 3s linear infinite',
          },
        },
      })
    },
  ],
  safelist: [
    'animate-fadeIn',
    'animate-slideIn',
    'animate-slideInRight',
    'animate-scaleIn',
    'animate-fadeInUp',
    'animate-fadeInDown',
    'animate-float',
    'animate-shimmerEffect',
    'animate-ripple',
    'animate-pageFlip',
    'animate-pageLoad',
    'animate-zoomPulse',
    'animate-shine',
    'animate-textGlow',
    'animate-bgPulse',
    'animate-borderGlow',
    'bg-gradient-radial',
    'bg-gradient-conic',
    'bg-gradient-shine',
    'bg-noise-pattern',
    'bg-dot-pattern',
    'bg-manga-texture',
    'bg-shine',
    'bg-size-200%',
    'bg-size-300%',
    'bg-size-auto-100',
    'bg-shine-0',
    'bg-shine-100',
    'text-shadow-sm',
    'text-shadow-md',
    'text-shadow-lg',
    'text-shadow-glow',
    'text-shadow-glow-primary',
    'text-shadow-neon',
    'text-shadow-manga',
    'text-shadow-outline',
    'delay-0',
    'delay-100',
    'delay-200',
    'delay-300',
    'delay-400',
    'delay-500',
    'delay-700',
    'delay-1000',
  ]
}