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
    <header className='flex border-b p-2 align-middle'>
      <SidebarTrigger className='mr-2' />
      <h1 className='pt-[3px] font-semibold'>
        {routes.find((route) => route.url === pathname)?.title}
      </h1>
    </header>
  );
}
