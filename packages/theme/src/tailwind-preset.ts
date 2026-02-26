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
      },
      boxShadow: {
        'surf-sm': 'var(--surf-shadow-sm)',
        'surf-md': 'var(--surf-shadow-md)',
        'surf-lg': 'var(--surf-shadow-lg)',
      },
    },
  },
}
