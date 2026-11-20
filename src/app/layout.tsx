import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import RouteTransition from '@/components/Motion/RouteTransition';
import './globals.css';
import '@/components/Common/site.css';
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

export const metadata: Metadata = {
  title: 'Lin Phone Myint Zaw',
  description:
    'Lin Phone Myint Zaw is a senior full-stack developer based in Yangon, Myanmar. Explore selected mobile and web projects, engineering experience, and services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} dark`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased">
        <RouteTransition />
        {children}
      </body>
    </html>
  );
}
