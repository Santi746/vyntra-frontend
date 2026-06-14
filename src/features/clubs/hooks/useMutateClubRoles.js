import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClubService } from "@/services/club.service";
import { toast } from "sonner";

/**
 * @hook useMutateClubRoles
 * @description Hook de mutación para gestionar roles y asignaciones de miembros.
 * Implementa Optimistic Updates (Regla #3) y Deduplicación (Regla #2).
 * 
 * @param {string} club_uuid - El identificador único del club.
 */
export function useMutateClubRoles(club_uuid) {
  const queryClient = useQueryClient();

  // MUTACIÓN: Crear Rol
  const createMutation = useMutation({
    mutationFn: async ({ client_uuid, ...newRoleData }) => {
      const response = await ClubService.createRole(club_uuid, { client_uuid, ...newRoleData });
      return response.data;
    },
    onMutate: async ({ client_uuid, ...newRoleData }) => {
      await queryClient.cancelQueries({ queryKey: ['club_roles', club_uuid] });
      const previousRoles = queryClient.getQueryData(['club_roles', club_uuid]);

      const optimisticRole = {
        uuid: client_uuid,
        ...newRoleData,
        is_fixed: false,
        status: 'sending'
      };

      queryClient.setQueryData(['club_roles', club_uuid], (old) => [...(old || []), optimisticRole]);
      return { previousRoles };
    },
    onError: (err, newRole, context) => {
      queryClient.setQueryData(['club_roles', club_uuid], context.previousRoles);
      toast.error("Error al crear rol", { description: err.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['club_roles', club_uuid] });
    }
  });

  // MUTACIÓN: Actualizar Rol
  const updateMutation = useMutation({
    mutationFn: async ({ client_uuid, ...updatedRole }) => {
      const response = await ClubService.updateRole(club_uuid, updatedRole);
      return { ...response.data, client_uuid };
    },
    onMutate: async ({ client_uuid, ...updatedRole }) => {
      await queryClient.cancelQueries({ queryKey: ['club_roles', club_uuid] });
      const previousRoles = queryClient.getQueryData(['club_roles', club_uuid]);

      queryClient.setQueryData(['club_roles', club_uuid], (old) => 
        old?.map(role => role.uuid === updatedRole.uuid 
          ? { ...role, ...updatedRole, status: 'sending', client_uuid } 
          : role)
      );

      return { previousRoles };
    },
    onError: (err, updatedRole, context) => {
      queryClient.setQueryData(['club_roles', club_uuid], context.previousRoles);
      toast.error("Error al actualizar rol", { description: err.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['club_roles', club_uuid] });
    }
  });

  // MUTACIÓN: Asignar Rol a Miembro
  const assignMutation = useMutation({
    mutationFn: async ({ client_uuid, userUuid, roleUuid }) => {
      const response = await ClubService.assignRole(club_uuid, userUuid, roleUuid);
      return { ...response.data, client_uuid };
    },
    onMutate: async ({ userUuid, roleUuid }) => {
      // 1. Cancelamos queries para evitar sobrescrituras
      await queryClient.cancelQueries({ queryKey: ['club_members', club_uuid] });
      await queryClient.cancelQueries({ queryKey: ['club', club_uuid] });

      const previousMembers = queryClient.getQueryData(['club_members', club_uuid]);
      const previousClub = queryClient.getQueryData(['club', club_uuid]);

      // 2. Actualizamos la lista paginada de miembros (Sidebar / Ajustes)
      queryClient.setQueryData(['club_members', club_uuid], (old) => {
        if (!old || !old.pages) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            data: page.data.map(user => {
              if (user.uuid !== userUuid) return user;
              const currentRoles = user.roles_ids || [];
              if (currentRoles.includes(roleUuid)) return user;
              return { ...user, roles_ids: [...currentRoles, roleUuid] };
            })
          }))
        };
      });

      return { previousMembers, previousClub };
    },
    onError: (err, vars, context) => {
      if (context.previousMembers) queryClient.setQueryData(['club_members', club_uuid], context.previousMembers);
      if (context.previousClub) queryClient.setQueryData(['club', club_uuid], context.previousClub);
      toast.error("Error al asignar rol", { description: err.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['club_members', club_uuid] });
      queryClient.invalidateQueries({ queryKey: ['club', club_uuid] });
    }
  });

  return { 
    mutateCreate: createMutation.mutateAsync, 
    mutateUpdate: updateMutation.mutateAsync,
    mutateAssign: assignMutation.mutateAsync,
    isPending: createMutation.isPending || updateMutation.isPending || assignMutation.isPending,
    isError: createMutation.isError || updateMutation.isError || assignMutation.isError
  };
}
