// Este arquivo define a "forma" dos dados que esperamos do backend.

export interface DashboardKPIData {
  totalValue: number;
  itemsBelowMinimum: number;
  totalItems: number;
  receiptsLast7Days: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface TrendData {
  day: string;
  entradas: number;
  saidas: number;
}

export interface CriticalItem {
  codigo: string;
  descricao: string;
  atual: number;
  minimo: number;
  fornecedor: string;
}

export interface ExpiringItem {
  item: string;
  lote: string;
  datadevencimento: string;
  quantidade: string;
}
