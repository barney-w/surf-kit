import type { SVGProps } from 'react';
interface Props extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}
const VerificationFlagged = ({
  size = 24,
  className,
  ...props
}: Props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={size} height={size} className={className} {...props}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0M12 9v4" /><circle cx={12} cy={16} r={0.5} fill="currentColor" /></svg>;
export default VerificationFlagged;