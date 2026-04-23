import type {Metadata} from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { WishlistProvider } from '@/components/WishlistProvider';
import { OrderProvider } from '@/components/OrderProvider';
import { Toaster } from '@/components/ui/toaster';
import { CustomCursor } from '@/components/CustomCursor';
import { TechGridBackground } from '@/components/TechGridBackground';

// Polyfill for ProgressEvent in Node.js environment (SSR)
if (typeof ProgressEvent === 'undefined') {
  global.ProgressEvent = class ProgressEvent extends Event {} as any;
}

export const metadata: Metadata = {
  title: 'Feeton Kicks | Luxury Sneaker Brand',
  description: 'Ultra-modern luxury footwear landing page engineered for the future.',
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
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden cursor-none">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  <CustomCursor />
                  <TechGridBackground />
                  <div className="relative z-10">
                    {children}
                  </div>
                  <Toaster />
                </OrderProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
