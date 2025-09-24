import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import DashboardPage from "../pages/DashBoard"; 
import { LoginPage } from "../pages/LoginPage";
import EmptyPage from "../pages/EmptyPage";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      // Rotas de Estoque
      { path: "/estoque/consultar", element: <EmptyPage title="Consultar Itens" description="Sistema para consulta de todos os itens do estoque com filtros avançados" /> },
      { path: "/estoque/categorias", element: <EmptyPage title="Gerenciar Categorias" description="Administração das categorias de itens do estoque" /> },
      
      // Rotas de Movimentações
      { path: "/movimentacoes/historico", element: <EmptyPage title="Histórico de Movimentações" description="Log completo de todas as entradas e saídas do estoque" /> },
      { path: "/movimentacoes/requisicoes", element: <EmptyPage title="Requisições Pendentes" description="Solicitações de material aguardando aprovação" /> },
      
      // Rotas de Relatórios
      { path: "/relatorios/curva-abc", element: <EmptyPage title="Curva ABC" description="Análise dos itens mais importantes por valor e rotatividade" /> },
      { path: "/relatorios/giro-estoque", element: <EmptyPage title="Giro de Estoque" description="Análise da velocidade de consumo dos itens" /> },
      { path: "/relatorios/previsao-compras", element: <EmptyPage title="Previsão de Compras" description="Sugestões de compra baseadas no histórico de consumo" /> },
      
      // Rotas de Cadastros
      { path: "/cadastros/itens", element: <EmptyPage title="Cadastro de Itens" description="Gerenciamento completo do cadastro de itens" /> },
      { path: "/cadastros/fornecedores", element: <EmptyPage title="Cadastro de Fornecedores" description="Administração dos fornecedores da empresa" /> },
      
      // Rotas de Configurações
      { path: "/configuracoes/usuarios", element: <EmptyPage title="Gerenciar Usuários" description="Controle de acesso e permissões do sistema" /> },
      { path: "/configuracoes/alertas", element: <EmptyPage title="Configurar Alertas" description="Definição de níveis de estoque mínimo e alertas" /> },
    ],
  },
  {
    path: "/login", // Rota de login para teste
    element: <LoginPage />,
  },
  {
    path: "*", // Rota para "Não Encontrado" (catch-all)
    element: <NotFound />,
  }
]);