import { KPICard } from "@/components/dashboard/KPICard";
import { ActionButton } from "@/components/dashboard/ActionButton";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { 
  DollarSign, 
  AlertTriangle, 
  Package, 
  Truck, 
  Plus, 
  Minus, 
  Search, 
  Tag,
  CalendarDays
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Tooltip,
  Legend
} from "recharts";
import { useDashboardData } from "@/hooks/useDashboardData";

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Dashboard = () => {
  const { data, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando dados do dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center h-screen">
        <div className="text-center text-destructive-foreground bg-destructive p-8 rounded-lg">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Erro ao carregar dados</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-center">
        <p>Nenhum dado encontrado para o dashboard.</p>
      </div>
    );
  }
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border border-border">
          <p className="font-medium text-card-foreground">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {`${item.name}: ${formatCurrency(item.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* --- KPIs (AGORA DINÂMICOS) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            <KPICard
              title="Valor Total do Estoque"
              value={formatCurrency(data.kpiData.totalValue)}
              subtitle="Capital imobilizado no almoxarifado"
              icon={DollarSign}
            />
            <KPICard
              title="Itens Abaixo do Mínimo"
              value={data.kpiData.itemsBelowMinimum.toString()}
              subtitle="Ações de compra necessárias"
              icon={AlertTriangle}
              isAlert={true}
            />
            <KPICard
              title="Total de Itens Cadastrados"
              value={data.kpiData.totalItems.toLocaleString('pt-BR')}
              subtitle="SKUs ativos no sistema"
              icon={Package}
            />
            <KPICard
              title="Recebimentos (7 dias)"
              value={`${data.kpiData.receiptsLast7Days} notas fiscais`}
              subtitle="Entradas registradas na última semana"
              icon={Truck}
            />
          </div>

          {/* --- Action Buttons --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionButton label="Registrar Entrada (NF)" icon={Plus} variant="primary" path="/entrada" />
            <ActionButton label="Registrar Saída (Requisição)" icon={Minus} variant="destructive" path="/saida" />
            <ActionButton label="Consultar Item" icon={Search} variant="secondary" path="/consultar" />
            <ActionButton label="Cadastrar Novo Item" icon={Tag} variant="secondary" path="/cadastros/itens" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-6 animate-fade-in">
              {/* --- Charts --- */}
              <ChartCard title="Estoque por Categoria (Valor)">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} className="hover:opacity-80 transition-opacity cursor-pointer" name="Valor"/>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Entradas vs. Saídas (Últimos 30 dias)">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="entradas" stroke="hsl(var(--success))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Entradas (R$)"/>
                    <Line type="monotone" dataKey="saidas" stroke="hsl(var(--destructive))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Saídas (R$)"/>
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <AlertCard
                title="Itens Críticos (Abaixo do Estoque Mínimo)"
                icon={AlertTriangle}
                type="critical"
                headers={["Código", "Descrição", "Atual", "Mínimo", "Fornecedor"]}
                data={data.criticalItems.map(item => ({
                  código: item.codigo,
                  descrição: item.descricao,
                  atual: item.atual,
                  mínimo: item.minimo,
                  fornecedor: item.fornecedor,
                }))}
              />

              <AlertCard
                title="Alerta de Validade (Vencimento em 30 dias)"
                icon={CalendarDays}
                type="warning"
                headers={["Item", "Lote", "Vencimento", "Quantidade"]}
                data={data.expiringItems.map(item => ({
                  item: item.item,
                  lote: item.lote,
                  vencimento: item.datadevencimento,
                  quantidade: item.quantidade,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;