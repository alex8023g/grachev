import { Sidebar, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarContentBlock } from '@/components/forSidebar/SidebarContentBlock';

export function SidebarBlock() {
  return (
    <Sidebar>
      <SidebarHeader className='flex-row'>
        <Avatar>
          <AvatarImage src='/img/myphoto.jpeg' />
          <AvatarFallback>GrachevAI</AvatarFallback>
        </Avatar>
        <div className='pt-2 font-semibold'>GrachevAI</div>
      </SidebarHeader>
      <SidebarContentBlock />
      <SidebarFooter />
    </Sidebar>
  );
}
