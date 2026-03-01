import type { SVGProps } from 'react';
interface Props extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}
const AgentHr = ({
  size = 24,
  className,
  ...props
}: Props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={size} height={size} className={className} {...props}><circle cx={9} cy={7} r={3} /><circle cx={17} cy={7} r={3} /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M17 11a4 4 0 0 1 4 4v6" /></svg>;
export default AgentHr;