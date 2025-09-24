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
  Bell,
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

const Dashboard = () => {
  const categoryData = [
    { name: "Matéria-Prima", value: 450000 },
    { name: "Produtos Fastil", value: 180000 },
    { name: "Componentes", value: 120000 },
    { name: "Consumíveis/EPIs", value: 98000 },
  ];

  const trendData = [
    { day: "Dia 1", entradas: 12000, saidas: 8000 },
    { day: "Dia 5", entradas: 15000, saidas: 12000 },
    { day: "Dia 10", entradas: 18000, saidas: 14000 },
    { day: "Dia 15", entradas: 22000, saidas: 16000 },
    { day: "Dia 20", entradas: 19000, saidas: 15000 },
    { day: "Dia 25", entradas: 25000, saidas: 18000 },
    { day: "Dia 30", entradas: 28000, saidas: 20000 },
  ];

  const criticalItems = [
    { 
      codigo: "MP001", 
      descricao: "Aço Carbono 1020", 
      atual: 5, 
      minimo: 20,
      fornecedor: "Usiminas",
      ultimamovimentacao: "15/08/2024",
      categoria: "Matéria-Prima"
    },
    { 
      codigo: "EP012", 
      descricao: "Luva Nitrílica", 
      atual: 8, 
      minimo: 50,
      fornecedor: "3M Safety",
      ultimamovimentacao: "20/08/2024", 
      categoria: "EPIs"
    },
    { 
      codigo: "CO045", 
      descricao: "Parafuso M8x20", 
      atual: 15, 
      minimo: 100,
      fornecedor: "Fixadores ABC",
      ultimamovimentacao: "22/08/2024",
      categoria: "Componentes"
    },
  ];

  const expiringItems = [
    { 
      item: "Cola de Contato", 
      lote: "5524", 
      datadevencimento: "20/09/2025",
      fornecedor: "Henkel",
      quantidade: "25 unidades"
    },
    { 
      item: "Tinta Primer", 
      lote: "7832", 
      datadevencimento: "15/09/2025",
      fornecedor: "Sherwin Williams", 
      quantidade: "12 litros"
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border border-border">
          <p className="font-medium text-card-foreground">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {`${item.dataKey === 'entradas' ? 'Entradas' : 
                 item.dataKey === 'saidas' ? 'Saídas' : 
                 'Valor'}: R$ ${item.value.toLocaleString('pt-BR')}`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            <KPICard
              title="Valor Total do Estoque"
              value="R$ 848.320,55"
              subtitle="Capital imobilizado no almoxarifado"
              icon={DollarSign}
              className="animate-scale-in"
            />
            <KPICard
              title="Itens Abaixo do Mínimo"
              value="18"
              subtitle="Ações de compra necessárias"
              icon={AlertTriangle}
              isAlert={true}
              className="animate-scale-in"
            />
            <KPICard
              title="Total de Itens Cadastrados"
              value="1.250"
              subtitle="SKUs ativos no sistema"
              icon={Package}
              className="animate-scale-in"
            />
            <KPICard
              title="Recebimentos (7 dias)"
              value="42 notas fiscais"
              subtitle="Entradas registradas na última semana"
              icon={Truck}
              className="animate-scale-in"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionButton
              label="Registrar Entrada (NF)"
              icon={Plus}
              variant="primary"
            />
            <ActionButton
              label="Registrar Saída (Requisição)"
              icon={Minus}
              variant="destructive"
            />
            <ActionButton
              label="Consultar Item"
              icon={Search}
              variant="secondary"
            />
            <ActionButton
              label="Cadastrar Novo Item"
              icon={Tag}
              variant="secondary"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 animate-fade-in">
              <ChartCard title="Estoque por Categoria (Valor)" className="animate-scale-in">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Entradas vs. Saídas (Últimos 30 dias)" className="animate-scale-in">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="entradas" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--success))", r: 4 }}
                      activeDot={{ r: 6, className: "animate-pulse" }}
                      name="Entradas (R$)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="saidas" 
                      stroke="hsl(var(--destructive))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--destructive))", r: 4 }}
                      activeDot={{ r: 6, className: "animate-pulse" }}
                      name="Saídas (R$)"
                    />
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
                data={criticalItems.map(item => ({
                  codigo: item.codigo,
                  descricao: item.descricao,
                  atual: item.atual,
                  minimo: item.minimo,
                  fornecedor: item.fornecedor
                }))}
              />

              <AlertCard
                title="Alerta de Validade (Vencimento em 30 dias)"
                icon={CalendarDays}
                type="warning"
                headers={["Item", "Lote", "Vencimento", "Quantidade"]}
                data={expiringItems.map(item => ({
                  item: item.item,
                  lote: item.lote,
                  vencimento: item.datadevencimento,
                  quantidade: item.quantidade
                }))}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;