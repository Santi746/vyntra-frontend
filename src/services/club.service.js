import { categories as MOCK_CATEGORIES } from "@/features/clubs/data/categories";
import { ClubsTable } from "@/features/clubs/data/clubs_table";
import { ROLES_TABLE } from "@/features/clubs/data/roles_table";
import { getClubsByIdUser } from "@/features/clubs/data/clubs_table";
import { USERS_TABLE } from "@/features/users/data/users_table";
import { mockRequest, MOCK_CONFIG } from "@/shared/utils/mock.utils";

/**
 * @service ClubService
 * @description Servicio para gestionar la lógica de clubes, membresías, roles y categorías.
 */
export const ClubService = {
  /**
   * Obtiene la membresía de un usuario en un club específico.
   * @param {string} club_uuid - UUID del club.
   * @param {string} user_uuid - UUID del usuario.
   * @returns {Promise<Object>} Datos de membresía y roles.
   */
  async getMembership(club_uuid, user_uuid) {
    await mockRequest(MOCK_CONFIG.DELAYS.FAST);
    const user = USERS_TABLE.find(u => u.uuid === user_uuid);
    if (!user) return { status: "success", data: null };
    
    return {
      status: "success",
      data: {
        uuid: user_uuid,
        club_uuid: club_uuid,
        roles_ids: user.uuid === "usr_master_7842" ? ["role_owner"] : []
      }
    };
  },

  /**
   * Obtiene la lista de clubes asociados a una lista de UUIDs.
   * @param {string[]} club_uuids - Array de UUIDs de clubes.
   * @returns {Promise<Object>} Lista de clubes encontrados.
   */
  async getUserClubs(club_uuids) {
    await mockRequest(MOCK_CONFIG.DELAYS.FAST);
    const clubs = getClubsByIdUser(club_uuids);
    return { status: "success", data: clubs };
  },

  /**
   * Obtiene la información detallada de un club por su UUID.
   * @param {string} club_uuid - UUID del club.
   * @returns {Promise<Object>} Datos del club.
   */
  async getClubByUuid(club_uuid) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    const club = ClubsTable.find((c) => c.uuid === club_uuid);
    if (!club) throw new Error("Club not found");
    return { status: "success", data: club };
  },

  /**
   * Obtiene el preview público de un club. **EXCEPCIÓN ARQUITECTÓNICA.**
   *
   * Este es el único endpoint de club que NO requiere membresía en el backend.
   * Devuelve solo datos básicos (name, banner, avatar, descripción, members_count)
   * y un flag `is_member` calculado a partir del usuario autenticado.
   *
   * Se usa para renderizar el ClubPreviewModal cuando un usuario NO miembro
   * hace clic en una card de club. NO usar para cargar el detalle completo
   * de un club del que el usuario ya es miembro — para eso está getClubByUuid.
   *
   * @param {string} club_uuid - UUID del club.
   * @returns {Promise<Object>} Datos de preview del club.
   */
  async getClubPreview(club_uuid) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    const club = ClubsTable.find((c) => c.uuid === club_uuid);
    if (!club) throw new Error("Club not found");
    return {
      status: "success",
      data: {
        uuid: club.uuid,
        name: club.name,
        description: club.description ?? null,
        category_tag: club.category_tag,
        avatar_url: club.avatar_url ?? null,
        banner_url: club.banner_url ?? null,
        is_verified: Boolean(club.is_verified),
        members_count: 1,
        online_count: 0,
        is_member: false,
        created_at: club.created_at,
      },
    };
  },

  /**
   * Obtiene las categorías de canales de un club.
   * @param {string} club_uuid - UUID del club.
   * @returns {Promise<Object>} Lista de categorías.
   */
  async getCategories(club_uuid) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    const categories = MOCK_CATEGORIES.map((c) => ({ ...c, club_uuid }));
    return { status: "success", data: categories };
  },

  /**
   * Obtiene los roles definidos en un club.
   * @param {string} club_uuid - UUID del club.
   * @returns {Promise<Object>} Lista de roles.
   */
  async getRoles(club_uuid) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    const roles = ROLES_TABLE.map((r) => ({ ...r, club_uuid }));
    return { status: "success", data: roles };
  },

  /**
   * Obtiene los miembros de un club con soporte para paginación.
   * @param {string} club_uuid - UUID del club.
   * @param {string|null} pageParam - Cursor para paginación.
   * @returns {Promise<Object>} Lista paginada de miembros.
   */
  async getMembers(club_uuid, pageParam) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    
    if (pageParam) {
      return { status: "success", data: [], meta: { next_cursor: null } };
    }

    const limit = 4;
    const paginatedMembers = [
      { 
        uuid: "usr_master_7842", 
        username: "santi_dev", 
        display_name: "Santiago Mejias", 
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Santiago",
        roles_ids: ["role_owner"],
        is_online: true
      },
      { 
        uuid: "usr_rel_4521", 
        username: "maria_g", 
        display_name: "María García", 
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        roles_ids: ["role_admin"],
        is_online: true
      },
      { 
        uuid: "usr_rel_8834", 
        username: "juan_p", 
        display_name: "Juan Pérez", 
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
        roles_ids: [],
        is_online: false
      },
      { 
        uuid: "usr_rel_1190", 
        username: "ana_t", 
        display_name: "Ana Torres", 
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
        roles_ids: [],
        is_online: true
      },
    ];
    
    return {
      status: "success",
      data: paginatedMembers,
      meta: { 
        club_uuid,
        next_cursor: paginatedMembers.length === limit ? paginatedMembers[paginatedMembers.length - 1].uuid : null 
      }
    };
  },

  /**
   * Crea una nueva categoría de canales en un club.
   * @param {string} club_uuid - UUID del club.
   * @param {Object} data - Datos de la categoría (client_uuid, name, is_private).
   * @returns {Promise<Object>} Categoría creada.
   */
  async createCategory(club_uuid, { client_uuid, name, is_private }) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return {
      status: "success",
      data: {
        uuid: client_uuid,
        client_uuid,
        club_uuid,
        name,
        is_private,
        channels: [],
        sort_order: Date.now(),
      },
    };
  },

  /**
   * Edita una categoría existente.
   * @param {string} club_uuid - UUID del club.
   * @param {Object} data - Datos a actualizar (category_uuid, name, is_private).
   * @returns {Promise<Object>} Categoría actualizada.
   */
  async editCategory(club_uuid, { category_uuid, name, is_private }) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return { status: "success", data: { uuid: category_uuid, club_uuid, name, is_private } };
  },

  /**
   * Crea un nuevo canal dentro de una categoría.
   * @param {string} club_uuid - UUID del club.
   * @param {string} category_uuid - UUID de la categoría padre.
   * @param {Object} data - Datos del canal (client_uuid, name, type, is_private).
   * @returns {Promise<Object>} Canal creado.
   */
  async createChannel(club_uuid, category_uuid, { client_uuid, name, type, is_private }) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return {
      status: "success",
      data: {
        uuid: client_uuid,
        client_uuid,
        category_uuid,
        name,
        type,
        is_private,
        sort_order: Date.now(),
      },
    };
  },

  /**
   * Edita la configuración de un canal.
   * @param {string} club_uuid - UUID del club.
   * @param {Object} data - Datos a actualizar (channel_uuid, name, description, is_private).
   * @returns {Promise<Object>} Canal actualizado.
   */
  async editChannel(club_uuid, { channel_uuid, name, description, is_private }) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return { status: "success", data: { uuid: channel_uuid, club_uuid, name, description, is_private } };
  },

  /**
   * Elimina un canal de un club.
   * @param {string} club_uuid - UUID del club.
   * @param {string} channel_uuid - UUID del canal a eliminar.
   * @returns {Promise<Object>} Resultado de la eliminación.
   */
  async deleteChannel(club_uuid, channel_uuid) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return { status: "success", data: { uuid: channel_uuid, club_uuid, action: "delete" } };
  },

  /**
   * Actualiza la información básica de un club.
   * @param {string} club_uuid - UUID del club.
   * @param {Object} payload - Datos a actualizar.
   * @returns {Promise<Object>} Club actualizado.
   */
  async updateClub(club_uuid, payload) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return { status: "success", data: { uuid: club_uuid, ...payload } };
  },

  /**
   * Crea un nuevo rol en el club.
   * @param {string} club_uuid - UUID del club.
   * @param {Object} roleData - Configuración del rol.
   * @returns {Promise<Object>} Rol creado.
   */
  async createRole(club_uuid, roleData) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return { status: "success", data: { ...roleData, club_uuid, is_fixed: false } };
  },

  /**
   * Actualiza un rol existente.
   * @param {string} club_uuid - UUID del club.
   * @param {Object} roleData - Nuevos datos del rol.
   * @returns {Promise<Object>} Rol actualizado.
   */
  async updateRole(club_uuid, roleData) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return { status: "success", data: { ...roleData, club_uuid } };
  },

  /**
   * Asigna un rol a un usuario dentro del club.
   * @param {string} club_uuid - UUID del club.
   * @param {string} userUuid - UUID del usuario.
   * @param {string} roleUuid - UUID del rol.
   * @returns {Promise<Object>} Resultado de la asignación.
   */
  async assignRole(club_uuid, userUuid, roleUuid) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return { status: "success", data: { userUuid, roleUuid, club_uuid } };
  },

  /**
   * Crea un nuevo club desde cero.
   * @param {Object} data - Datos del club (client_uuid, name, description, etc).
   * @returns {Promise<Object>} Club creado.
   */
  async createClub({ client_uuid, name, description, category_tag, avatar_url, banner_url, owner_uuid }) {
    await mockRequest(MOCK_CONFIG.DELAYS.SLOW);
    return {
      status: "success",
      data: {
        uuid: client_uuid,
        name,
        description,
        category_tag,
        avatar_url,
        banner_url,
        owner_uuid,
        members_count: 1,
        online_count: 1,
        created_at: new Date().toISOString(),
        is_verified: false,
        categories: [],
      }
    };
  },
};
