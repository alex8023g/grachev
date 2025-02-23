'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { routes } from './forSidebar/SidebarContentBlock';

export function Header() {
  const pathname = usePathname();
  console.log(
    '🚀 ~ Header ~ pathname:',
    pathname,
    routes.find((route) => route.url === pathname)?.title,
  );
  return (
    <header className='sticky top-0 flex border-b bg-white/80 p-2 align-middle backdrop-blur-sm'>
      <SidebarTrigger className='mr-2' />
      <h1 className='pt-[3px] font-semibold'>
        {routes.find((route) => route.url === pathname)?.title}
      </h1>
    </header>
  );
}
