import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarBlock } from '@/components/forSidebar/SidebarBlock';
import { Header } from '@/components/Header';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'GrachevAI',
  description: 'Personal website of GrachevAI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('RootLayout');
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <SidebarBlock />
          <div className='relative w-full'>
            <Header />
            <main className='p-3'>{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
