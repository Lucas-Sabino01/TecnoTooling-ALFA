import { 
  DashboardKPIData, 
  CategoryData, 
  TrendData, 
  CriticalItem, 
  ExpiringItem 
} from '@/types/api';

// --- FONTES DE DADOS MOCK ---

const mockCategoryData: CategoryData[] = [
  { name: "Matéria-Prima", value: 450000 },
  { name: "Produtos Fastil", value: 220000 },
  { name: "Componentes", value: 120000 },
  { name: "Consumíveis/EPIs", value: 98000 },
];

const mockTrendData: TrendData[] = [
  { day: "Dia 1", entradas: 12000, saidas: 8000 },
  { day: "Dia 5", entradas: 15000, saidas: 12000 },
  { day: "Dia 10", entradas: 18000, saidas: 14000 },
  { day: "Dia 15", entradas: 22000, saidas: 16000 },
  { day: "Dia 20", entradas: 19000, saidas: 15000 },
  { day: "Dia 25", entradas: 25000, saidas: 18000 },
  { day: "Dia 30", entradas: 28000, saidas: 20000 },
];

const mockCriticalItems: CriticalItem[] = [
  { codigo: "MP001", descricao: "Aço Carbono 1020", atual: 5, minimo: 20, fornecedor: "Usiminas" },
  { codigo: "EP012", descricao: "Luva Nitrílica", atual: 8, minimo: 50, fornecedor: "3M Safety" },
  { codigo: "CO045", descricao: "Parafuso M8x20", atual: 15, minimo: 100, fornecedor: "Fixadores ABC" },
];

const mockExpiringItems: ExpiringItem[] = [
  { item: "Cola de Contato", lote: "5524", datadevencimento: "20/10/2025", quantidade: "25 unidades" },
  { item: "Tinta Primer", lote: "7832", datadevencimento: "15/10/2025", quantidade: "12 litros" },
  { item: "Óleo Lubrificante", lote: "LUB-991", datadevencimento: "01/11/2025", quantidade: "5 galões" },
];


// --- FUNÇÕES DA API ---

export const getDashboardData = async () => {
  console.log("API SERVICE: Buscando dados do dashboard...");
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 1. O cálculo dinâmico
  const calculatedTotalValue = mockCategoryData.reduce((acc, category) => acc + category.value, 0);

  const dynamicKpiData: DashboardKPIData = {
    totalValue: calculatedTotalValue,
    itemsBelowMinimum: 18,
    totalItems: 1250,
    receiptsLast7Days: 42,
  };

  return {
    kpiData: dynamicKpiData,
    categoryData: mockCategoryData,
    trendData: mockTrendData,
    criticalItems: mockCriticalItems,
    expiringItems: mockExpiringItems,
  };
};


export const getCriticalItems = async (): Promise<CriticalItem[]> => {
  console.log("API SERVICE: Buscando itens críticos...");
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log("API SERVICE: Itens críticos recebidos!");
  return mockCriticalItems;
};