import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',    // 16px - Mobile Reduced
        sm: '1.5rem',       // 24px
        md: '2rem',         // 32px
        lg: '3rem',         // 48px
        xl: '5rem',         // 80px - Matches xl:px-20
      },
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1400px',
      },
    },
    extend: {
      colors: {
        // Architectural Colors
        brand: {
          black: '#1A1A1A',
          charcoal: '#333333',
          gray: '#555555', // Slightly darker for better contrast
          muted: '#888888',
          silver: '#E5E5E5',
          offwhite: '#F2F2F2', // Cooler off-white
          white: '#FFFFFF',
        },
        architectural: {
          DEFAULT: '#1B4D3E', // Deep Architectural Green
          hover: '#13382D',
          light: '#E8F5F1',
          dark: '#0F2921',
        },
        'grid-line': 'var(--grid-line-color)', // Added for grid utilities
        'technical-red': 'var(--technical-red)', // Technical Marker Red
        // shadcn/ui compatible
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        // Manrope everywhere for "Technical Report" feel
        sans: ['var(--font-manrope)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-manrope)', 'sans-serif'],
        handwriting: ['cursive', 'Nothing You Could Do', 'sans-serif'], // Added for signature
      },
      fontSize: {
        // Mobile-first sizes
        'hero': ['2.25rem', { lineHeight: '1.1', fontWeight: '700' }],      // 36px
        'hero-lg': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],    // 72px
        'section': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],   // 28px
        'section-lg': ['3rem', { lineHeight: '1.2', fontWeight: '600' }],   // 48px
        'card': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],      // 20px
        'card-lg': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],    // 24px
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],  // 18px
        'body': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],         // 16px
        'caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],  // 14px
        'eyebrow': ['0.75rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.15em' }], // 12px
      },
      spacing: {
        // Section spacing
        'section-mobile': '4rem',      // 64px
        'section-desktop': '7.5rem',   // 120px - Confirmed
        // Component spacing
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '30': '7.5rem',   // 120px
      },
      maxWidth: {
        'content': '1400px',
        'text': '65ch',
        'narrow': '480px',
      },
      aspectRatio: {
        'hero-mobile': '4 / 5',
        'hero-desktop': '16 / 9',
        'project': '4 / 3',
        'portrait': '3 / 4',
        'square': '1 / 1',
      },
      borderRadius: {
        lg: '0',
        md: '0',
        sm: '0',
        DEFAULT: '0',
        full: '0', // Enforce strict rectangles everywhere
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
