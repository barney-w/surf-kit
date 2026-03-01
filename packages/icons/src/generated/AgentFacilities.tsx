import type { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}
const AgentFacilities = ({ size = 24, className, ...props }: Props) => (
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
    <rect x={4} y={2} rx={1} />
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
  </svg>
)
export default AgentFacilities
