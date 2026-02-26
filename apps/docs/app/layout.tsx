import { RootProvider } from 'fumadocs-ui/provider';
import 'fumadocs-ui/style.css';
import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | surf-kit',
    default: 'surf-kit — AI-First Design System',
  },
  description:
    'Purpose-built component library for agent interfaces. Trust, transparency, and accessibility by default.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
