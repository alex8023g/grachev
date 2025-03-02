import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { PiBriefcase, PiCertificateLight } from 'react-icons/pi';
import { RiAccountPinBoxLine } from 'react-icons/ri';
import { SidebarMenuItemBlock } from './SidebarMenuItemBlock';

export const routes = [
  {
    group: 'aboutMy',
    title: 'About my',
    url: '/',
    icon: <RiAccountPinBoxLine />,
  },
  {
    group: 'portfolio',
    title: 'My apps',
    url: '/myapps',
    icon: <PiBriefcase />,
  },
  {
    group: 'portfolio',
    title: 'Certificates',
    url: '/certificates',
    icon: <PiCertificateLight />,
  },
  // { group: 'examples', title: 'Table', url: '/examples/table' },
  { group: 'examples', title: 'S3 storage', url: '/examples/s3miniostorage' },
  { group: 'examples', title: 'Animated tabs', url: '/examples/animatedtabs' },
] as const;

export function SidebarContentBlock() {
  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes
                .filter((route) => route.group === 'aboutMy')
                .map((item) => (
                  <SidebarMenuItemBlock key={item.title} item={item} />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Portfolio</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes
                .filter((route) => route.group === 'portfolio')
                .map((item) => (
                  <SidebarMenuItemBlock key={item.title} item={item} />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Examples</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes
                .filter((route) => route.group === 'examples')
                .map((item) => (
                  <SidebarMenuItemBlock key={item.title} item={item} />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      ;
    </>
  );
}
