import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarBlock } from '@/components/forSidebar/SidebarBlock';
import { Header } from '@/components/Header';
import { YandexMetricaProvider } from 'next-yandex-metrica';
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
        <YandexMetricaProvider
          tagID={106835902}
          initParameters={{
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
          }}
          router='app'
        >
          <SidebarProvider>
            <SidebarBlock />
            <div className='flex h-dvh w-full flex-col overflow-hidden'>
              <Header />
              <main className='flex h-full flex-col overflow-y-auto p-3'>
                {children}
              </main>
            </div>
          </SidebarProvider>
        </YandexMetricaProvider>
      </body>
    </html>
  );
}
