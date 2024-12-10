import * as React from "react";
import { Calendar, FileText, HelpCircle, Home } from "lucide-react";
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
import { NavMain, NavMainProps } from "./nav/nav-main";
import { Link, useLocation, useParams } from "react-router";
import { useAuth } from "@/contexts/AuthContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuth();
  const location = useLocation(); // Para acessar a URL atual
  const { idExam } = useParams();

  const data: { user: any; navMain: NavMainProps[] } = {
    user: {
      name: "Kawan Silva",
      email: "kawanarhtuskate@gmail.com",
      avatar: "/avatars/avatar.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Home,
        isActive: location.pathname === "/admin/dashboard", // Verifica se a rota é a dashboard
      },
      {
        title: `Provas ${
          !!idExam ? `(${location.pathname.split("/").pop()})` : ""
        }`,
        url: "/admin/exams",
        icon: Calendar,
        isActive: location.pathname.includes("/admin/exams"),
        items: !!idExam
          ? [
              {
                title: "Textos",
                url: `/admin/exams/${idExam}/texts`,
                isActive: location.pathname === `/admin/exams/${idExam}/texts`,
                icon: FileText,
              },
              {
                title: "Questões",
                url: `/admin/exams/${idExam}/questions`,
                isActive:
                  location.pathname === `/admin/exams/${idExam}/questions`,
                icon: HelpCircle,
              },
            ]
          : undefined,
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
                    src="/logomahuel.png"
                    className="h-full w-full object-contain bg-secondary"
                    alt="Mauhel IFRN Logo"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-base font-semibold">
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
