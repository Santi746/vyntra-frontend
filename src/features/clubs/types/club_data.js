/**
 * @file clubData.js
 * @description Clase maestra que define el esquema (blueprint) de los clubes.
 * Garantiza que todos los clubes tengan la misma estructura de datos,
 * independientemente de su categoría o origen.
 */



// ─────────────────────────────────────────────────────────
// Modelo Estándar de Club
// ─────────────────────────────────────────────────────────

export class ClubData {
    /**
     * @param {string} uuid         - Identificador único universal (UUID).
     * @param {string} name         - Nombre público del club.
     * @param {string} category_tag - Etiqueta principal de categoría (ej: "FPS").
     * @param {string} description  - Misión o breve descripción del club.
     * @param {string} banner_url   - URL de la imagen de banner.
     * @param {string|number} members_count - Cantidad de miembros.
     * @param {string|number} online_count  - Usuarios en línea.
     * @param {string} featured_text - Texto destacado (featured_text).
     * @param {boolean} is_verified - Estado de verificación.
     * @param {string} avatar_url     - URL del icono/perfil.
     * @param {string} created_at   - Fecha de creación.
     * @param {string} owner_uuid   - UUID del dueño.
     * @param {Array} categories    - Categorías adicionales.
     * @param {Array} roles         - Definición de roles del club (Tabla roles).
     * @param {Array} members       - Relación de usuarios y sus roles (Tabla pivot club_members).
     */
    constructor({
        uuid,
        name,
        category_tag,
        description,
        banner_url,
        members_count,
        online_count,
        featured_text,
        is_verified,
        avatar_url,
        created_at,
        owner_uuid,
        default_channel_uuid = "category-001-channel-001" // 🛠️ [Vyne-Mode-Easy]: Valor plano para navegación rápida
    } = {}) {
        this.uuid = uuid;
        this.name = name;
        this.category_tag = category_tag;
        this.description = description;
        this.banner_url = banner_url;
        this.members_count = members_count;
        this.online_count = online_count;
        this.featured_text = featured_text;
        this.is_verified = is_verified;
        this.avatar_url = avatar_url;
        this.created_at = created_at;
        this.owner_uuid = owner_uuid;
        this.default_channel_uuid = default_channel_uuid;
    }
}
