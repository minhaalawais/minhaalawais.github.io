'use client';
import './globals.css';
import { Poppins } from '@next/font/google';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html lang="en">
      <head />
      <body className={`${poppins.className} font-poppins bg-gray-100/50 dark:bg-grey-900 text-black dark:text-white overflow-x-hidden`}>
        {isMounted && (
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange={true}>
            {children}
            <Analytics />
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
