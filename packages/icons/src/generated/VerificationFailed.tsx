import type { SVGProps } from 'react';
interface Props extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}
const VerificationFailed = ({
  size = 24,
  className,
  ...props
}: Props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" width={size} height={size} className={className} {...props}><path d="m12 2 8 4v6c0 5.25-3.5 9.75-8 11-4.5-1.25-8-5.75-8-11V6zM15 9l-6 6M9 9l6 6" /></svg>;
export default VerificationFailed;