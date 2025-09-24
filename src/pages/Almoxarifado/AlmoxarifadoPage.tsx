import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, BarChart3, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card bg-gray-100 ">
        <div className="container mx-auto px-6 py-4 bg-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">TecnoTooling</h1>
              <p className="text-sm text-muted-foreground">Sistema de Gestão de Estoque</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao Sistema de Almoxarifado
          </h2>
          <p className="text-lg text-muted-foreground">
            Gerencie seu estoque de forma eficiente e organizada
          </p>
        </div>

        {/* Quick Actions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-200 border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Novo Item</CardTitle>
                  <CardDescription>Cadastrar produto no estoque</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link to="/cadastros/itens/novo">
                <Button className="w-full bg-primary hover:bg-primary-hover">
                  Cadastrar Novo Item
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-info/10 rounded-lg">
                  <Package className="h-6 w-6 text-info" />
                </div>
                <div>
                  <CardTitle className="text-lg">Consultar Estoque</CardTitle>
                  <CardDescription>Visualizar itens cadastrados</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Em Desenvolvimento
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200 border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <CardTitle className="text-lg">Relatórios</CardTitle>
                  <CardDescription>Análises e indicadores</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Em Desenvolvimento
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Total de Itens</CardDescription>
              <CardTitle className="text-2xl font-bold text-primary">0</CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Estoque Baixo</CardDescription>
              <CardTitle className="text-2xl font-bold text-warning">0</CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Categorias</CardDescription>
              <CardTitle className="text-2xl font-bold text-info">4</CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardDescription>Fornecedores</CardDescription>
              <CardTitle className="text-2xl font-bold text-success">0</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;