import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ClubService } from "@/services/club.service";

/**
 * @file useMutateCreateCategory.js
 * @description Hook de mutación para la creación de categorías dentro de un club.
 * Implementa Optimistic Update (Regla #3 Vyne):
 *   - onMutate: Inyecta la categoría vacía en el array `categories` del club en caché.
 *   - onError: Revierte al backup.
 *   - onSettled: Invalida para sincronizar con el servidor.
 *
 * 🚀 FUTURA INTEGRACIÓN BACKEND (Laravel)
 * --------------------------------------------------------
 * - POST /api/clubs/{club_uuid}/categories { client_uuid, name, is_private }
 * - Backend guarda con `client_uuid` UNIQUE y emite Broadcast ShouldBroadcast.
 *
 * @param {string} clubUuid - UUID del club donde se crea la categoría.
 */
export function useMutateCreateCategory(club_uuid) {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * mutationFn — Delegado a la Capa de Servicios
     */
    mutationFn: async (params) => {
      const response = await ClubService.createCategory(club_uuid, params);
      return response.data;
    },

    onMutate: async (variables) => {
      const { client_uuid, name, is_private } = variables;

      await queryClient.cancelQueries({ queryKey: ["club_categories", club_uuid] });

      const previousCategories = queryClient.getQueryData(["club_categories", club_uuid]);

      const optimisticCategory = {
        uuid: client_uuid,
        name,
        is_private,
        channels: [],
        sort_order: (previousCategories?.length || 0) + 1,
        status: "creating",
      };

      queryClient.setQueryData(["club_categories", club_uuid], (old) => {
        return [...(old || []), optimisticCategory];
      });

      return { previousCategories };
    },

    onError: (err, variables, context) => {
      toast.error("Error al crear la categoría", {
        description: err.message || "Inténtalo de nuevo más tarde.",
      });

      if (context?.previousCategories) {
        queryClient.setQueryData(["club_categories", club_uuid], context.previousCategories);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["club_categories", club_uuid] });
    },

    onSuccess: (data) => {
      toast.success(`Categoría "${data.name}" creada`);
    },
  });
}
