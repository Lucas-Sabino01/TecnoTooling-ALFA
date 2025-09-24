// src/components/layouts/Header.tsx
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-6">
      {/* Botão para abrir a sidebar em telas pequenas */}

      <h1 className="text-2xl font-bold text-foreground">Dashboard Geral</h1>
      
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              F
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">Francisco</span>
        </div>
      </div>
    </header>
  );
}