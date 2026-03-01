import type { Meta, StoryObj } from '@storybook/react'
import { Grid, Stack, Text } from '@surf-kit/core'

const meta: Meta = {
  title: 'Core/Primitives',
}
export default meta

export const TextSizes: StoryObj = {
  render: () => (
    <Stack gap={2}>
      <Text size="xs">Extra small text (xs)</Text>
      <Text size="sm">Small text (sm)</Text>
      <Text size="base">Base text (base)</Text>
      <Text size="lg">Large text (lg)</Text>
      <Text size="xl">Extra large text (xl)</Text>
      <Text size="2xl">2XL text (2xl)</Text>
    </Stack>
  ),
}

export const TextWeights: StoryObj = {
  render: () => (
    <Stack gap={2}>
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </Stack>
  ),
}

export const TextColors: StoryObj = {
  render: () => (
    <Stack gap={2}>
      <Text color="primary">Primary color</Text>
      <Text color="secondary">Secondary color</Text>
      <Text color="muted">Muted color</Text>
      <Text color="accent">Accent color</Text>
      <Text color="error">Error color</Text>
      <Text color="success">Success color</Text>
    </Stack>
  ),
}

export const StackDirections: StoryObj = {
  render: () => (
    <Stack gap={6}>
      <div>
        <Text weight="semibold" size="sm">
          Vertical (default)
        </Text>
        <Stack direction="vertical" gap={2}>
          <div style={{ padding: '8px 16px', background: '#e0f5f7' }}>Item 1</div>
          <div style={{ padding: '8px 16px', background: '#e0f5f7' }}>Item 2</div>
          <div style={{ padding: '8px 16px', background: '#e0f5f7' }}>Item 3</div>
        </Stack>
      </div>
      <div>
        <Text weight="semibold" size="sm">
          Horizontal
        </Text>
        <Stack direction="horizontal" gap={2}>
          <div style={{ padding: '8px 16px', background: '#e0f5f7' }}>Item 1</div>
          <div style={{ padding: '8px 16px', background: '#e0f5f7' }}>Item 2</div>
          <div style={{ padding: '8px 16px', background: '#e0f5f7' }}>Item 3</div>
        </Stack>
      </div>
    </Stack>
  ),
}

export const GridColumns: StoryObj = {
  render: () => (
    <Stack gap={6}>
      <div>
        <Text weight="semibold" size="sm">
          2 Columns
        </Text>
        <Grid columns={2} gap={4}>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>1</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>2</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>3</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>4</div>
        </Grid>
      </div>
      <div>
        <Text weight="semibold" size="sm">
          3 Columns
        </Text>
        <Grid columns={3} gap={4}>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>1</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>2</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>3</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>4</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>5</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>6</div>
        </Grid>
      </div>
      <div>
        <Text weight="semibold" size="sm">
          4 Columns
        </Text>
        <Grid columns={4} gap={4}>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>1</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>2</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>3</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>4</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>5</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>6</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>7</div>
          <div style={{ padding: '16px', background: '#e0f5f7', textAlign: 'center' }}>8</div>
        </Grid>
      </div>
    </Stack>
  ),
}
