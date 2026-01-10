/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ===== COULEURS MVR =====
      colors: {
        // Background layers
        mvr: {
          dark: '#050508',      // Fond principal très sombre
          darker: '#020204',    // Fond encore plus sombre
          surface: '#0a0a12',   // Surface des cards
          elevated: '#12121f',  // Surface élevée
        },
        // Neon accent colors
        neon: {
          cyan: '#00f0ff',
          cyanDim: '#00a8b3',
          purple: '#8b5cf6',
          purpleDim: '#6d45c9',
          pink: '#f472b6',
          pinkDim: '#c44d8f',
        },
        // Text colors
        text: {
          primary: '#ffffff',
          secondary: '#a1a1b5',
          muted: '#6b6b80',
        }
      },
      
      // ===== TYPOGRAPHIE =====
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],      // Titres futuristes
        body: ['Exo 2', 'sans-serif'],            // Corps de texte
        mono: ['JetBrains Mono', 'monospace'],    // Code/données
        impossible: ['Imposible', 'sans-serif'], // ← Ajoute ça
      },
      
      // ===== ANIMATIONS =====
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(0, 240, 255, 0.2)' 
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'flicker': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },
      
      // ===== SPACING & SIZING =====
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      
      // ===== BORDER RADIUS =====
      borderRadius: {
        'hex': '12px', // Pour simuler des formes hexagonales arrondies
      },
      
      // ===== BOX SHADOW (Glow effects) =====
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(0, 240, 255, 0.2), 0 0 60px rgba(0, 240, 255, 0.1)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2), 0 0 60px rgba(139, 92, 246, 0.1)',
        'neon-pink': '0 0 20px rgba(244, 114, 182, 0.4), 0 0 40px rgba(244, 114, 182, 0.2)',
        'inner-glow': 'inset 0 0 30px rgba(0, 240, 255, 0.1)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.5)',
      },
      
      // ===== BACKDROP BLUR =====
      backdropBlur: {
        'xs': '2px',
      },
      
      // ===== Z-INDEX =====
      zIndex: {
        'nav': '100',
        'modal': '200',
        'toast': '300',
      },
    },
  },
  plugins: [],
}
