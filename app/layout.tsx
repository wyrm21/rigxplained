import type { Metadata } from 'next';
import './globals.css';
import { ModeProvider } from '@/context/ModeContext';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'RigXplained — The Complete PC Assembly Guide',
  description: 'Animated guides for every PC part. GPU, CPU, RAM, fans, cables and more — shown with animations that capture what photos cannot.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ModeProvider>
          <Navigation />
          {children}
        </ModeProvider>
      </body>
    </html>
  );
}
