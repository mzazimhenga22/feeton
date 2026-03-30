
import type {Metadata} from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

// Polyfill for ProgressEvent in Node.js environment (SSR)
if (typeof ProgressEvent === 'undefined') {
  global.ProgressEvent = class ProgressEvent extends Event {} as any;
}

export const metadata: Metadata = {
  title: 'Feeton Kicks | Luxury Sneaker Brand',
  description: 'Ultra-modern luxury footwear landing page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <ThemeProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
