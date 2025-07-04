/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./index.html",
    "./*.html"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Gruvbox Dark Theme
        gruvbox: {
          // Backgrounds
          'bg-hard': '#1d2021',
          'bg': '#282828',
          'bg-soft': '#32302f',
          'bg1': '#3c3836',
          'bg2': '#504945',
          'bg3': '#665c54',
          'bg4': '#7c6f64',
          
          // Foregrounds
          'fg': '#fbf1c7',
          'fg1': '#ebdbb2',
          'fg2': '#d5c4a1',
          'fg3': '#bdae93',
          'fg4': '#a89984',
          
          // Colors
          'red': '#fb4934',
          'green': '#b8bb26',
          'yellow': '#fabd2f',
          'blue': '#83a598',
          'purple': '#d3869b',
          'aqua': '#8ec07c',
          'orange': '#fe8019',
          'gray': '#928374',
          
          // Dim colors
          'red-dim': '#cc2412',
          'green-dim': '#98971a',
          'yellow-dim': '#d79921',
          'blue-dim': '#458588',
          'purple-dim': '#b16286',
          'aqua-dim': '#689d6a',
          'orange-dim': '#d65d0e',
          'gray-dim': '#a89984',
        },
        
        // Gruvbox Light Theme
        'gruvbox-light': {
          // Backgrounds
          'bg-hard': '#f9f5d7',
          'bg': '#fbf1c7',
          'bg-soft': '#f2e5bc',
          'bg1': '#ebdbb2',
          'bg2': '#d5c4a1',
          'bg3': '#bdae93',
          'bg4': '#a89984',
          
          // Foregrounds
          'fg': '#282828',
          'fg1': '#3c3836',
          'fg2': '#504945',
          'fg3': '#665c54',
          'fg4': '#7c6f64',
          
          // Colors
          'red': '#9d0006',
          'green': '#79740e',
          'yellow': '#b57614',
          'blue': '#076678',
          'purple': '#8f3f71',
          'aqua': '#427b58',
          'orange': '#af3a03',
          'gray': '#928374',
          
          // Dim colors
          'red-dim': '#cc2412',
          'green-dim': '#98971a',
          'yellow-dim': '#d79921',
          'blue-dim': '#458598',
          'purple-dim': '#b16286',
          'aqua-dim': '#689d6a',
          'orange-dim': '#d65d0e',
          'gray-dim': '#7c6f64',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      borderRadius: {
        'gruvbox': '6px',
        'gruvbox-lg': '8px',
      },
      boxShadow: {
        'gruvbox': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'gruvbox-lg': '0 4px 8px rgba(0, 0, 0, 0.3)',
        'gruvbox-xl': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'gruvbox-light': '0 2px 4px rgba(0, 0, 0, 0.15)',
        'gruvbox-light-lg': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'gruvbox-light-xl': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        'hamlet': ['Hamlet-Tertia', 'serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-soft': 'bounce-soft 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      }
    },
  },
  plugins: [],
}