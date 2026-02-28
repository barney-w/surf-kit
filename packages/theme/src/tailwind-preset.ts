import type { Config } from 'tailwindcss'

export const surfKitPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        surface: 'var(--surf-color-bg-surface)',
        'surface-raised': 'var(--surf-color-bg-surface-raised)',
        'surface-sunken': 'var(--surf-color-bg-surface-sunken)',
        canvas: 'var(--surf-color-bg-canvas)',
        'text-primary': 'var(--surf-color-text-primary)',
        'text-secondary': 'var(--surf-color-text-secondary)',
        'text-muted': 'var(--surf-color-text-muted)',
        accent: {
          DEFAULT: 'var(--surf-color-accent-primary)',
          hover: 'var(--surf-color-accent-primary-hover)',
          active: 'var(--surf-color-accent-primary-active)',
          subtle: 'var(--surf-color-accent-primary-subtle)',
          subtlest: 'var(--surf-color-accent-primary-subtlest)',
        },
        border: {
          DEFAULT: 'var(--surf-color-border-default)',
          strong: 'var(--surf-color-border-strong)',
          interactive: 'var(--surf-color-border-interactive)',
        },
        status: {
          success: 'var(--surf-color-status-success)',
          'success-subtle': 'var(--surf-color-status-success-subtle)',
          warning: 'var(--surf-color-status-warning)',
          'warning-subtle': 'var(--surf-color-status-warning-subtle)',
          error: 'var(--surf-color-status-error)',
          'error-subtle': 'var(--surf-color-status-error-subtle)',
          info: 'var(--surf-color-status-info)',
        },
        confidence: {
          high: 'var(--surf-confidence-high-text)',
          'high-bg': 'var(--surf-confidence-high-bg)',
          medium: 'var(--surf-confidence-medium-text)',
          'medium-bg': 'var(--surf-confidence-medium-bg)',
          low: 'var(--surf-confidence-low-text)',
          'low-bg': 'var(--surf-confidence-low-bg)',
        },
        verification: {
          passed: 'var(--surf-verification-passed-icon)',
          flagged: 'var(--surf-verification-flagged-icon)',
          failed: 'var(--surf-verification-failed-icon)',
        },
        agent: {
          coordinator: 'var(--surf-agent-coordinator-accent)',
          hr: 'var(--surf-agent-hr-accent)',
          it: 'var(--surf-agent-it-accent)',
          governance: 'var(--surf-agent-governance-accent)',
          finance: 'var(--surf-agent-finance-accent)',
          facilities: 'var(--surf-agent-facilities-accent)',
        },
        brand: {
          dark: '#041F26',
          'dark-panel': '#0A3642',
          blue: '#0091A5',
          cyan: '#38BDD0',
          gold: '#E1B989',
          'gold-light': '#F3D79C',
          cream: '#F1F0E3',
          'cream-warm': '#F0E8B6',
          charcoal: '#414142',
          watermelon: '#E81152',
        },
      },
      spacing: {
        'surf-1': 'var(--surf-spacing-1)',
        'surf-2': 'var(--surf-spacing-2)',
        'surf-3': 'var(--surf-spacing-3)',
        'surf-4': 'var(--surf-spacing-4)',
        'surf-6': 'var(--surf-spacing-6)',
        'surf-8': 'var(--surf-spacing-8)',
      },
      borderRadius: {
        'surf-sm': 'var(--surf-radius-sm)',
        'surf-md': 'var(--surf-radius-md)',
        'surf-lg': 'var(--surf-radius-lg)',
        'surf-xl': 'var(--surf-radius-xl)',
        'surf-full': 'var(--surf-radius-full)',
      },
      fontFamily: {
        'surf-sans': 'var(--surf-font-family-sans)',
        'surf-mono': 'var(--surf-font-family-mono)',
        'surf-display': 'var(--surf-font-family-display)',
      },
      boxShadow: {
        'surf-sm': 'var(--surf-shadow-sm)',
        'surf-md': 'var(--surf-shadow-md)',
        'surf-lg': 'var(--surf-shadow-lg)',
        'glow': '0 0 20px rgba(225,185,137,0.4)',
        'glow-strong': '0 0 30px rgba(225,185,137,0.6), 0 0 60px rgba(225,185,137,0.3)',
        'glow-cyan': '0 0 15px rgba(56,189,208,0.5)',
        'glow-watermelon': '0 0 15px rgba(232,17,82,0.5)',
        'card': '0 4px 24px rgba(4,31,38,0.8)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        fadeSlideIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(225,185,137,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(225,185,137,0.4)' },
        },
        'brand-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        slideFromRight: {
          from: { opacity: '0', transform: 'translate(20px, 4px)' },
          to: { opacity: '1', transform: 'translate(0, 0)' },
        },
        springFromLeft: {
          '0%': { opacity: '0', transform: 'translate(-16px, 8px)' },
          '60%': { opacity: '1', transform: 'translate(2px, -1px)' },
          '100%': { opacity: '1', transform: 'translate(0, 0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeSlideUpSm: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        fadeSlideIn: 'fadeSlideIn 0.4s ease-out both',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        'brand-spin': 'brand-spin 1.2s linear infinite',
        slideFromRight: 'slideFromRight 0.25s ease-out both',
        springFromLeft: 'springFromLeft 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        fadeUp: 'fadeUp 0.5s ease-out both',
        fadeIn: 'fadeIn 0.2s ease-out both',
        fadeSlideUpSm: 'fadeSlideUpSm 0.2s ease-out both',
      },
    },
  },
}
