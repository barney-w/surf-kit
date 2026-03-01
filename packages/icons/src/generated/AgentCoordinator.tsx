import type { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}
const AgentCoordinator = ({ size = 24, className, ...props }: Props) => (
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
    <rect x={3} y={3} rx={2} />
    <circle cx={12} cy={10} r={3} />
    <path d="M8 21h8M12 17v4" />
  </svg>
)
export default AgentCoordinator
