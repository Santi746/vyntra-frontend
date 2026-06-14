import { mockFriendRequests } from "@/features/notifications/data/mockFriendRequests";
import { mockRequest, MOCK_CONFIG } from "@/shared/utils/mock.utils";

/**
 * @service NotificationService
 * @description Servicio para gestionar notificaciones y solicitudes de amistad.
 */
export const NotificationService = {
  /**
   * Obtiene la lista de solicitudes de amistad pendientes con paginación por cursor.
   *
   * Transformamos cada item del mock (forma `{ uuid, user: {...} }`) al contrato
   * real del backend (rama inteligente de FriendshipResource):
   *   { uuid: <user.uuid>, friendship_uuid: <request.uuid>, friend: <user>, status }
   *
   * @param {string|null} pageParam - Cursor para paginación.
   * @returns {Promise<Object>} Lista de solicitudes y metadatos.
   */
  async getFriendRequests(pageParam = null) {
    await mockRequest(MOCK_CONFIG.DELAYS.SLOW);

    let pivotIndex = mockFriendRequests.length;
    if (pageParam) {
      const index = mockFriendRequests.findIndex((req) => req.uuid === pageParam);
      if (index !== -1) pivotIndex = index;
    }

    const limit = 10;
    const start = Math.max(0, pivotIndex - limit);
    const paginatedData = mockFriendRequests.slice(start, pivotIndex);

    // Mapeamos al contrato del backend (rama inteligente de FriendshipResource)
    const transformed = paginatedData.map((req) => ({
      uuid: req.user.uuid,
      friendship_uuid: req.uuid,
      friend: {
        uuid: req.user.uuid,
        display_name: req.user.display_name,
        username: req.user.username,
        avatar_url: req.user.avatar_url,
      },
      status: req.status,
      created_at: req.created_at,
    }));

    const next_cursor = start > 0 ? transformed[0]?.friendship_uuid : null;

    return {
      status: "success",
      data: transformed,
      meta: { next_cursor, per_page: limit },
    };
  },

  /**
   * Responde a una solicitud de amistad (aceptar/rechazar).
   * @param {string} request_uuid - UUID de la solicitud.
   * @param {string} action - Acción a realizar ('accept' o 'reject').
   * @returns {Promise<Object>} Resultado de la acción.
   */
  async respondToFriendRequest(request_uuid, action) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return { status: "success", data: { request_uuid, action } };
  },
};
