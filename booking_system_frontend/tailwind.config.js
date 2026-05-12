/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // IBM Carbon Design System - Gray Scale
        'carbon-background': '#161616',
        'carbon-ui-background': '#262626',
        'carbon-layer-01': '#262626',
        'carbon-layer-02': '#393939',
        'carbon-layer-03': '#525252',
        'carbon-field-01': '#262626',
        'carbon-field-02': '#393939',
        
        // Interactive colors
        'carbon-interactive': '#0f62fe',
        'carbon-interactive-hover': '#0353e9',
        'carbon-interactive-active': '#002d9c',
        
        // Text colors
        'carbon-text-primary': '#f4f4f4',
        'carbon-text-secondary': '#c6c6c6',
        'carbon-text-placeholder': '#6f6f6f',
        'carbon-text-on-color': '#ffffff',
        'carbon-text-disabled': '#525252',
        
        // Border colors
        'carbon-border-subtle': '#393939',
        'carbon-border-strong': '#8d8d8d',
        
        // Support colors
        'carbon-support-error': '#ff8389',
        'carbon-support-success': '#42be65',
        'carbon-support-warning': '#f1c21b',
        'carbon-support-info': '#4589ff',
        
        // Focus
        'carbon-focus': '#0f62fe',
        
        // Link
        'carbon-link-primary': '#78a9ff',
        'carbon-link-secondary': '#a6c8ff',
      },
      fontFamily: {
        'ibm-plex-sans': ['IBM Plex Sans', 'system-ui', '-apple-system', 'sans-serif'],
        'ibm-plex-mono': ['IBM Plex Mono', 'monospace'],
      },
      spacing: {
        // Carbon spacing scale
        '01': '0.125rem',  // 2px
        '02': '0.25rem',   // 4px
        '03': '0.5rem',    // 8px
        '04': '0.75rem',   // 12px
        '05': '1rem',      // 16px
        '06': '1.5rem',    // 24px
        '07': '2rem',      // 32px
        '08': '2.5rem',    // 40px
        '09': '3rem',      // 48px
        '10': '4rem',      // 64px
        '11': '5rem',      // 80px
        '12': '6rem',      // 96px
        '13': '10rem',     // 160px
      },
    },
  },
  plugins: [],
}

// Made with Bob - IBM Carbon Design System Theme
