import { FRIENDS_LIST, USERS_TABLE, MASTER_USER, MOCK_FRIENDSHIPS } from "@/features/users/data/users_table";
import { mockRequest, MOCK_CONFIG } from "@/shared/utils/mock.utils";

const MOCK_SESSIONS = [
  { uuid: "session_001", os: "Windows", browser: "Chrome", ip: "192.168.1.45", location: "Madrid, España", is_current: true, type: "desktop" },
  { uuid: "session_002", os: "iOS", browser: "Safari", ip: "185.23.44.12", location: "Barcelona, España", is_current: false, type: "mobile" },
];

/**
 * @service UserService
 * @description Servicio para gestionar el perfil del usuario, sesiones y lista de amigos.
 */
export const UserService = {
  /**
   * Obtiene los datos del usuario autenticado actualmente.
   * @returns {Promise<Object>} Datos del usuario maestro.
   */
  async getCurrentUser() {
    await mockRequest(MOCK_CONFIG.DELAYS.FAST);
    return { status: "success", data: MASTER_USER };
  },

  /**
   * Obtiene la información pública de un usuario por su UUID.
   * @param {string} user_uuid - UUID del usuario.
   * @returns {Promise<Object>} Datos del usuario.
   */
  async getUser(user_uuid) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    const user = USERS_TABLE.find((u) => u.uuid === user_uuid);
    if (!user) throw new Error("Usuario no encontrado");
    return { status: "success", data: user };
  },

  /**
   * Actualiza los datos del perfil del usuario actual.
   * @param {Object} updateData - Datos a actualizar (nombre, contraseña, etc).
   * @returns {Promise<Object>} Resultado de la actualización.
   */
  async updateUser(updateData) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    if (updateData.new_password && updateData.new_password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }
    return { status: "success", data: { ...updateData, success: true } };
  },

  /**
   * Obtiene la lista de sesiones activas del usuario.
   * @returns {Promise<Object>} Lista de sesiones (dispositivo, ubicación, IP).
   */
  async getSessions() {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return { status: "success", data: MOCK_SESSIONS };
  },

  /**
   * Obtiene la lista de amigos con soporte para filtrado y paginación.
   * @param {string} filter - Filtro de estado ('all', 'online', 'pending').
   * @param {string} searchQuery - Término de búsqueda por nombre.
   * @param {string|null} pageParam - Cursor para paginación.
   * @returns {Promise<Object>} Lista de amigos y metadatos.
   */
  async getFriendsPaginated(filter = "all", searchQuery = "", pageParam = null) {
    await mockRequest(pageParam ? MOCK_CONFIG.DELAYS.MEDIUM : MOCK_CONFIG.DELAYS.SLOW);
    const allFriends = MOCK_FRIENDSHIPS.map((f) => f.friend_data);

    let filtered = allFriends;
    if (filter === "online") {
      filtered = allFriends.filter((f) => f.is_online);
    }
    if (filter === "pending") {
      filtered = [];
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.display_name?.toLowerCase().includes(query) ||
          f.username?.toLowerCase().includes(query)
      );
    }

    const PAGE_SIZE = 15;
    let startIndex = 0;

    if (pageParam) {
      const cursorIndex = filtered.findIndex((f) => f.uuid === pageParam);
      startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
    }

    const friends = filtered.slice(startIndex, startIndex + PAGE_SIZE);
    const next_cursor = friends.length === PAGE_SIZE ? friends[friends.length - 1].uuid : null;

    return { status: "success", data: friends, meta: { next_cursor } };
  },
};
