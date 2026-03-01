import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { transform } from '@svgr/core'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const svgsDir = path.resolve(__dirname, '../svgs')
const generatedDir = path.resolve(__dirname, '../generated')

function toPascalCase(filename: string): string {
  return filename
    .replace(/\.svg$/, '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

async function generate() {
  // Ensure output directory exists
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true })
  }

  const svgFiles = fs
    .readdirSync(svgsDir)
    .filter((f) => f.endsWith('.svg'))
    .sort()

  const exports: string[] = []

  for (const file of svgFiles) {
    const svgSource = fs.readFileSync(path.join(svgsDir, file), 'utf-8')
    const componentName = toPascalCase(file)

    const tsxCode = await transform(
      svgSource,
      {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        icon: true,
        typescript: true,
        svgProps: {
          width: '{size}',
          height: '{size}',
          className: '{className}',
        },
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
            {
              name: 'removeAttrs',
              params: { attrs: '(width|height)' },
            },
          ],
        },
        template: (variables, { tpl }) => {
          return tpl`
import type { SVGProps } from 'react'

interface ${variables.interfaces[0]?.id ?? 'Props'} extends SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

const ${variables.componentName} = ({ size = 24, className, ...props }: ${variables.interfaces[0]?.id ?? 'Props'}) => (
  ${variables.jsx}
)

export default ${variables.componentName}
`
        },
      },
      { componentName },
    )

    const outputPath = path.join(generatedDir, `${componentName}.tsx`)
    fs.writeFileSync(outputPath, tsxCode, 'utf-8')
    exports.push(`export { default as ${componentName} } from './${componentName}'`)
    console.log(`Generated: ${componentName}.tsx`)
  }

  // Write barrel index
  const indexContent = `${exports.join('\n')}\n`
  fs.writeFileSync(path.join(generatedDir, 'index.ts'), indexContent, 'utf-8')
  console.log(`\nGenerated ${svgFiles.length} icon components`)
}

generate().catch((err) => {
  console.error('Failed to generate icons:', err)
  process.exit(1)
})
