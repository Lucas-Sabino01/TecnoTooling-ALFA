import { 
  Home, 
  Package, 
  ChevronRight,
  RotateCcw, 
  BarChart3, 
  Settings,
  Search,
  FolderOpen,
  History,
  ClipboardList,
  TrendingUp,
  Gauge,
  ShoppingCart,
  Box,
  Building2,
  Users,
  AlertCircle
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Estoque",
    icon: Package,
    items: [
      {
        title: "Consultar Itens",
        url: "/estoque/consultar",
        icon: Search,
      },
      {
        title: "Categorias",
        url: "/estoque/categorias",
        icon: FolderOpen,
      },
    ],
  },
  {
    title: "Movimentações",
    icon: RotateCcw,
    items: [
      {
        title: "Histórico Completo",
        url: "/movimentacoes/historico",
        icon: History,
      },
      {
        title: "Requisições Pendentes",
        url: "/movimentacoes/requisicoes",
        icon: ClipboardList,
      },
    ],
  },
  {
    title: "Relatórios",
    icon: BarChart3,
    items: [
      {
        title: "Curva ABC",
        url: "/relatorios/curva-abc",
        icon: TrendingUp,
      },
      {
        title: "Giro de Estoque",
        url: "/relatorios/giro-estoque",
        icon: Gauge,
      },
      {
        title: "Previsão de Compras",
        url: "/relatorios/previsao-compras",
        icon: ShoppingCart,
      },
    ],
  },
  {
    title: "Cadastros",
    icon: Box,
    items: [
      {
        title: "Itens",
        url: "/cadastros/itens",
        icon: Package,
      },
      {
        title: "Fornecedores",
        url: "/cadastros/fornecedores",
        icon: Building2,
      },
    ],
  },
  {
    title: "Configurações",
    icon: Settings,
    items: [
      {
        title: "Usuários",
        url: "/configuracoes/usuarios",
        icon: Users,
      },
      {
        title: "Alertas",
        url: "/configuracoes/alertas",
        icon: AlertCircle,
      },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<string[]>([
    "Estoque", "Movimentações", "Relatórios", "Cadastros", "Configurações"
  ]);

  const isGroupActive = (items: { url: string }[]) => 
    items?.some(item => location.pathname === item.url);

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(group => group !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarContent className="p-4">
        {/* Logo */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-primary">TecnoTooling</span>
          )}
        </div>

        <SidebarMenu className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.items ? (
                <div className="space-y-1">
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => toggleGroup(item.title)}
                      className={`w-full justify-between hover:bg-accent cursor-pointer${
                        isGroupActive(item.items) ? 'bg-accent text-zinc-800' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </div>
                      {!collapsed && (
                        <ChevronRight className={`h-4 w-4 transition-transform ${
                          openGroups.includes(item.title) ? 'rotate-90' : ''
                        }`} />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {!collapsed && openGroups.includes(item.title) && (
                    <div className="ml-4 space-y-1">
                      {item.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            <NavLink 
                              to={subItem.url}
                              className={({ isActive }) => 
                                `flex items-center gap-3 w-full pl-3 py-2 text-sm rounded-md transition-colors ${
                                  isActive 
                                    ? 'bg-primary font-medium text-primary-foreground' 
                                    : 'text-sidebar-foreground hover:bg-accent hover:text-accent-foreground'
                                }`
                              }
                            >
                              <subItem.icon className="h-3 w-3" />
                              <span>{subItem.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) => 
                        `flex items-center gap-3 w-full py-2 px-3 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground font-medium' 
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </div>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}