import { ChevronRight, LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCallback } from "react";

export interface NavMainProps {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavMainProps[];
}

export function Collapsiblee({ item }: { item: NavMainProps }) {
  const { toggleSidebar } = useSidebar();
  const location = useLocation();

  const handleLinkClick = useCallback(() => {
    toggleSidebar();
  }, [toggleSidebar]);

  return (
    <>
      <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip={item.title}
            isActive={location.pathname.includes(item.url)}
          >
            <Link
              onClick={handleLinkClick}
              to={item.url}
              className="flex items-center text-sm"
            >
              {item.icon ? (
                <item.icon className="mr-2 h-4 w-4" />
              ) : (
                <span className="mr-2 h-1 w-1 rounded-full bg-current" />
              )}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
          {item.items?.length ? (
            <>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="transition-transform data-[state=open]:rotate-90">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Expandir</span>
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <Collapsiblee key={subItem.title} item={subItem} />
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </>
          ) : null}
        </SidebarMenuItem>
      </Collapsible>
    </>
  );
}

export function NavMain({ items }: { items: NavMainProps[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-medium">
        Menu Principal
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsiblee key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
