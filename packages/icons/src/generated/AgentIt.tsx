import type { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}
const AgentIt = ({ size = 24, className, ...props }: Props) => (
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
    <rect x={2} y={3} rx={2} />
    <path d="M8 21h8M12 17v4" />
    <circle cx={18} cy={18} r={3} />
    <path d="M18 15v1M18 20v1M15.5 16.5l.7.7M19.8 20.8l.7.7" />
  </svg>
)
export default AgentIt
