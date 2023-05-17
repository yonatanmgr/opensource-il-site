import Head from 'next/head';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'קוד פתוח ישראלי',
  description: 'Open Source Community Israel',
  viewport: 'width=device-width, initial-scale=1'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className='w-screen overflow-x-hidden bg-gradient-to-b from-gradientfrom to-gradientto font-["Rubik"] text-white'>
        {children}
        <div id="modal-root"></div>
      </body>
      <Analytics />
    </html>
  );
}
