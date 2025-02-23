'use client';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type SidebarMenuItem = {
  title: string;
  url: string;
  icon?: React.ReactElement;
};

type Props = { item: SidebarMenuItem };
export function SidebarMenuItemBlock({ item }: Props) {
  const pathname = usePathname();
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild isActive={pathname === item.url}>
        <Link href={item.url}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
