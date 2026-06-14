import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "@/services/dashboard.service";

/**
 * @file useDashboardData.js
 * @description Hook profesional para obtener los datos del dashboard principal utilizando React Query.
 * Centraliza la verdad de los clubes destacados y categorías en la caché global.
 *
 * Devuelve el envelope completo del backend:
 *   { status: "success", data: ClubResource[], meta: { next_cursor, per_page } }
 *
 * El componente DashboardTemplate hace lectura defensiva para soportar la forma
 * transitoria durante la remodelación del dashboard.
 */
export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard', 'explore'],
    queryFn: async () => {
      const response = await DashboardService.getExploreData();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de caché para datos de exploración
  });
}
