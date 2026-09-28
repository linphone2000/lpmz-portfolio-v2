import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import '@/components/Home/home.css';

const manrope = localFont({
  src: [
    {
      path: '../fonts/manrope-400.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/manrope-500.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/manrope-800.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-manrope',
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lin Phone Myint Zaw',
  description:
    'Portfolio of Lin Phone Myint Zaw, a Senior Mobile Developer with full-stack and DevOps experience based in Yangon, Myanmar.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} dark`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
