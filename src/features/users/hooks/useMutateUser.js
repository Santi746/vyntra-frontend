import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user.service";
import { toast } from "sonner";

/**
 * @file useMutateUser.js
 * @description Hook de mutación para el perfil del usuario autenticado.
 * Sigue el Protocolo Vyne: UUID cliente, optimistic update, rollback y refetch.
 *
 * En producción se conectará a `PATCH /api/user` (Laravel Breeze/Sanctum).
 * Actualmente simula la latencia de red y devuelve los datos enviados.
 *
 * @returns {import("@tanstack/react-query").UseMutationResult}
 */
export function useMutateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * mutationFn — Delegado a la Capa de Servicios
     */
    mutationFn: async ({ client_uuid, ...updateData }) => {
      const response = await UserService.updateUser(updateData);
      return response.data;
    },

    /**
     * onMutate — Optimistic Update: inyecta el dato antes de la respuesta.
     */
    onMutate: async (variables) => {
      const { client_uuid, ...updateData } = variables;

      await queryClient.cancelQueries({ queryKey: ["current_user_v2"] });

      const previousUser = queryClient.getQueryData(["current_user_v2"]);

      queryClient.setQueryData(["current_user_v2"], (old) => {
        if (!old) return old;
        return { ...old, ...updateData };
      });

      return { previousUser };
    },

    /**
     * onError — Rollback instantáneo al backup si falla.
     */
    onError: (err, _variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["current_user_v2"], context.previousUser);
      }
      toast.error("Error al actualizar perfil", { description: err.message });
    },

    /**
     * onSettled — Refetch silencioso para sincronizar con el servidor.
     */
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["current_user_v2"] });
    },
  });
}
