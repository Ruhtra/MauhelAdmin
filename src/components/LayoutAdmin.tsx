import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Outlet } from "react-router";
import { NavTrigger } from "@/components/ui/nav/nav-trigger";
import { ScrollArea } from "@/components/ui/scroll-area";
export function LayoutAdmin() {
  return (
    <SidebarProvider>
      <div className="flex h-[100svh] w-full overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 flex h-14 items-center border-b px-4 backdrop-blur">
            <NavTrigger />
          </header>
          <ScrollArea className="flex-1">
            <main className="p-4 sm:p-6">
              <Outlet />
            </main>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
