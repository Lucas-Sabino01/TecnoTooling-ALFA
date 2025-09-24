import { useState, useEffect } from 'react';
import { getDashboardData } from '@/services/apiService';
import { 
  DashboardKPIData, 
  CategoryData, 
  TrendData, 
  CriticalItem, 
  ExpiringItem 
} from '@/types/api';

// Definimos um tipo para os dados que o hook vai retornar
interface DashboardData {
  kpiData: DashboardKPIData;
  categoryData: CategoryData[];
  trendData: TrendData[];
  criticalItems: CriticalItem[];
  expiringItems: ExpiringItem[];
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getDashboardData();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Ocorreu um erro desconhecido'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  return { data, isLoading, error };
};
