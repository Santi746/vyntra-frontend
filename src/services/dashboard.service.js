import { ClubsTable, FEATURED_CLUBS } from "@/features/clubs/data/clubs_table";
import { USERS_TABLE } from "@/features/users/data/users_table";
import { CLUB_SECTION_TITLE } from "@/features/clubs/data/club_section_title";
import { mockRequest, MOCK_CONFIG } from "@/shared/utils/mock.utils";

/**
 * @service DashboardService
 * @description Servicio para gestionar la información de exploración y búsqueda global.
 */
export const DashboardService = {
  /**
   * Obtiene los datos necesarios para la pantalla de exploración (Dashboard).
   *
   * Mientras el backend no exponga featured/categories curadas, el servicio mock
   * construye la estructura completa desde los datos estáticos locales.
   *
   * Estructura devuelta (consumida por DashboardTemplate y ClubsFeatured):
   *   {
   *     status: "success",
   *     data: {
   *       featuredClubs: [...],   // "Los Mejores Para Ti"
   *       categories: [{ uuid, name, icon, clubs: [...] }]  // Secciones por categoría
   *     }
   *   }
   *
   * TODO(dashboard-remodel): cuando el backend exponga esto nativamente,
   * eliminar los mocks y delegar 100% a la API.
   *
   * @returns {Promise<Object>} Estructura con featuredClubs y categories.
   */
  async getExploreData() {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);
    return {
      status: "success",
      data: {
        featuredClubs: FEATURED_CLUBS,
        categories: CLUB_SECTION_TITLE,
      },
    };
  },

  /**
   * Realiza una búsqueda global de clubes y usuarios con soporte para filtrado y paginación.
   *
   * La forma de la respuesta refleja el contrato del backend (SearchController):
   *   {
   *     status: "success",
   *     data: {
   *       clubs: { data: ClubResource[], meta: { next_cursor, per_page } },
   *       users: { data: UserResource[], meta: { next_cursor, per_page } }
   *     }
   *   }
   *
   * @param {string} searchTerm - Texto de búsqueda.
   * @param {string} filterType - Tipo de filtro ('all', 'clubs', 'users').
   * @param {string|null} pageParam - Cursor para paginación.
   * @returns {Promise<Object>} Resultados estructurados por tipo.
   */
  async globalSearch(searchTerm, filterType = "all", pageParam = null) {
    await mockRequest(MOCK_CONFIG.DELAYS.MEDIUM);

    if (!searchTerm) {
      const empty = { data: [], meta: { next_cursor: null, per_page: 12 } };
      return {
        status: "success",
        data: { clubs: empty, users: empty },
      };
    }

    const query = searchTerm.toLowerCase();

    // Buscamos CLUBES
    const filteredClubs = ClubsTable.filter(club =>
      club.name?.toLowerCase().includes(query) ||
      club.description?.toLowerCase().includes(query)
    );

    // Buscamos USUARIOS
    const filteredUsers = USERS_TABLE.filter(user => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      return (
        user.username?.toLowerCase().includes(query) ||
        fullName.includes(query)
      );
    });

    const PAGE_SIZE = 12;
    const paginate = (arr) => {
      let startIndex = 0;
      if (pageParam) {
        const cursorIndex = arr.findIndex(r => r.uuid === pageParam);
        startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
      }
      const slice = arr.slice(startIndex, startIndex + PAGE_SIZE);
      const nextCursor = slice.length === PAGE_SIZE
        ? slice[slice.length - 1].uuid
        : null;
      return { data: slice, meta: { next_cursor: nextCursor, per_page: PAGE_SIZE } };
    };

    // Filtrado por tipo — si el usuario pidió "clubs" o "users", el otro bucket va vacío.
    const clubsPage = (filterType === 'users') ? { data: [], meta: { next_cursor: null, per_page: PAGE_SIZE } } : paginate(filteredClubs);
    const usersPage = (filterType === 'clubs') ? { data: [], meta: { next_cursor: null, per_page: PAGE_SIZE } } : paginate(filteredUsers);

    return {
      status: "success",
      data: { clubs: clubsPage, users: usersPage },
    };
  },
};
