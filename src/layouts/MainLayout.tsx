// src/layouts/MainLayout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              {/* O título pode ser adicionado de forma dinâmica depois */}
              <h1 className="text-2xl font-bold text-foreground">TecnoTooling</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium text-sm">
                    F
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground hidden sm:block">Francisco</span>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 bg-background overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};