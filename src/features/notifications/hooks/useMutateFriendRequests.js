import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { NotificationService } from "@/services/notification.service";

/**
 * @hook useMutateFriendRequests
 * @description Hook de mutación para gestionar solicitudes de amistad (aceptar/rechazar).
 * Implementa el protocolo Vyne: Optimistic Updates (Regla #3).
 * 
 * @returns {Object} Métodos de mutación y estados.
 */
export function useMutateFriendRequests() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    /**
     * mutationFn — Delegado a la Capa de Servicios
     */
    mutationFn: async ({ client_uuid, request_uuid, action }) => {
      const response = await NotificationService.respondToFriendRequest(request_uuid, action);
      return response.data;
    },

    /**
     * onMutate — Optimistic Update: Removemos o actualizamos la solicitud antes de la respuesta.
     */
    onMutate: async ({ request_uuid, action }) => {
      // Cancelar refetches salientes para evitar sobrescribir el estado optimista
      await queryClient.cancelQueries({ queryKey: ["friend_requests"] });

      // Guardar backup del estado anterior
      const previousData = queryClient.getQueryData(["friend_requests"]);

      // Actualizar la caché de forma optimista
      queryClient.setQueryData(["friend_requests"], (oldData) => {
        if (!oldData || !oldData.pages) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((req) =>
              // En la rama inteligente de FriendshipResource, el id de la solicitud
              // viene en `friendship_uuid` (no en `uuid`, que es el del amigo).
              (req.friendship_uuid ?? req.uuid) === request_uuid
                ? { ...req, status: action === "accept" ? "accepted" : "declined" }
                : req
            ).filter((req) => {
              const reqId = req.friendship_uuid ?? req.uuid;
              // Si declinamos, la borramos visualmente de inmediato
              if (reqId === request_uuid && action === "decline") return false;
              // Si aceptamos, también la solemos borrar de la lista de "pendientes"
              if (reqId === request_uuid && action === "accept") return false;
              return true;
            }),
          })),
        };
      });

      return { previousData };
    },

    /**
     * onError — Rollback si el backend falla.
     */
    onError: (err, variables, context) => {
      toast.error("Error al procesar la solicitud", {
        description: err.message || "Inténtalo de nuevo más tarde",
      });
      
      if (context?.previousData) {
        queryClient.setQueryData(["friend_requests"], context.previousData);
      }
    },

    /**
     * onSettled — Sincronización final.
     */
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["friend_requests"] });
      if (variables.action === "accept") {
        queryClient.invalidateQueries({ queryKey: ["friends"] });
      }
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
