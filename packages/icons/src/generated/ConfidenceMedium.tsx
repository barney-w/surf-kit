import type { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}
const ConfidenceMedium = ({ size = 24, className, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <circle cx={12} cy={12} r={9} />
    <path fill="currentColor" d="M12 3a9 9 0 0 1 0 18" />
  </svg>
)
export default ConfidenceMedium
