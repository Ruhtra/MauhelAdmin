import * as React from "react";
import { Calendar, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav/nav-user";
import { NavMain } from "./nav/nav-main";
// import { rotas } from '@/App'
import { Link } from "react-router";
import { useAuth } from "@/contexts/AuthContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuth();

  const data = {
    user: {
      name: "Kawan Silva",
      email: "kawanarhtuskate@gmail.comcom",
      avatar: "/avatars/avatar.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Home,
        isActive: true,
      },
      {
        title: "Provas",
        url: "/admin/exams",
        icon: Calendar,
        isActive: false,
      },
    ],
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={"/"}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src="/logo.png"
                    className="h-full w-full object-cover"
                    alt="Onco Clinica Logo"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-lg font-semibold">
                    Mauhel IFRN
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    Sistema de Gestão
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} logout={logout} />
      </SidebarFooter>
    </Sidebar>
  );
}
