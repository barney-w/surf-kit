import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const colorPalette: Record<string, Record<string, string>> = {
  Teal: {
    '50': '#F0FAFB',
    '100': '#E0F5F7',
    '300': '#66C2CC',
    '500': '#0099A8',
    '600': '#007F8C',
    '700': '#006673',
  },
  Charcoal: {
    '50': '#F5F5F5',
    '100': '#E8E8E8',
    '300': '#B0B0B0',
    '500': '#787878',
    '700': '#5A5A5A',
    '900': '#3C3C3C',
  },
  Watermelon: {
    '100': '#FDE8EF',
    '500': '#E8175D',
    '700': '#B8124A',
  },
  Lime: {
    '100': '#F0F8E0',
    '500': '#8DC21F',
    '700': '#6B9317',
  },
  Golden: {
    '100': '#FEF5E0',
    '500': '#F8B800',
    '700': '#C69300',
  },
  Sky: {
    '500': '#5BC8F5',
  },
  Magenta: {
    '500': '#9E1F82',
  },
  Cyan: {
    '500': '#00B2AA',
  },
  'Hot Pink': {
    '500': '#F0197C',
  },
  'Orange Red': {
    '500': '#F05A22',
  },
  Purple: {
    '500': '#3B1283',
  },
  Neutral: {
    '50': '#FAFAFA',
    '100': '#F5F5F5',
    '200': '#E8E8E8',
    '300': '#D4D4D4',
    '600': '#6B6B6B',
    '800': '#454545',
    '900': '#3C3C3C',
  },
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  const isDark = parseInt(name, 10) >= 500 || name === '700' || name === '800' || name === '900'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '8px',
          backgroundColor: hex,
          border: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: '10px', color: isDark ? '#fff' : '#333', fontFamily: 'monospace' }}>
          {name}
        </span>
      </div>
      <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#666' }}>
        {hex}
      </span>
    </div>
  )
}

function ColorGrid() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '24px' }}>
      {Object.entries(colorPalette).map(([groupName, shades]) => (
        <div key={groupName}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 600 }}>{groupName}</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {Object.entries(shades).map(([shade, hex]) => (
              <Swatch key={shade} name={shade} hex={hex} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const meta: Meta = {
  title: 'Tokens/Colors',
}
export default meta

export const ColorPalette: StoryObj = {
  render: () => <ColorGrid />,
}
