import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ClubService } from "@/services/club.service";

/**
 * @file useMutateCreateChannel.js
 * @description Hook de mutación para crear canales dentro de una categoría de un club.
 * Implementa Optimistic Update (Regla #3 Vyne):
 *   - onMutate: Inyecta el canal en la categoría correspondiente dentro del club en caché.
 *   - onError: Revierte la caché al backup.
 *   - onSettled: Invalida para sincronizar.
 *
 * 🚀 FUTURA INTEGRACIÓN BACKEND (Laravel)
 * --------------------------------------------------------
 * - POST /api/clubs/{club_uuid}/categories/{category_uuid}/channels
 * - { client_uuid, name, type, is_private }
 * - Backend guarda con `client_uuid` UNIQUE y emite Broadcast.
 *
 * @param {string} club_uuid - UUID del club.
 */
export function useMutateCreateChannel(club_uuid) {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * mutationFn — Delegado a la Capa de Servicios
     */
    mutationFn: async ({ client_uuid, category_uuid, name, type, is_private }) => {
      const response = await ClubService.createChannel(club_uuid, category_uuid, { client_uuid, name, type, is_private });
      return response;
    },

    onMutate: async (variables) => {
      const { client_uuid, category_uuid, name, type, is_private } = variables;

      await queryClient.cancelQueries({ queryKey: ["club_categories", club_uuid] });

      const previousCategories = queryClient.getQueryData(["club_categories", club_uuid]);

      const optimisticChannel = {
        uuid: client_uuid,
        name,
        type,
        is_private,
        sort_order: Date.now(),
        description: "",
        status: "creating",
      };

      queryClient.setQueryData(["club_categories", club_uuid], (old) => {
        if (!old) return old;
        return old.map((cat) => {
          if (cat.uuid === category_uuid) {
            return {
              ...cat,
              channels: [...(cat.channels || []), optimisticChannel],
            };
          }
          return cat;
        });
      });

      return { previousCategories };
    },

    onError: (err, variables, context) => {
      toast.error("Error al crear el canal", {
        description: err.message || "Inténtalo de nuevo más tarde.",
      });

      if (context?.previousCategories) {
        queryClient.setQueryData(["club_categories", club_uuid], context.previousCategories);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["club_categories", club_uuid] });
    },

    onSuccess: (response) => {
      toast.success(`Canal "${response.data.name}" creado`);
    },
  });
}
