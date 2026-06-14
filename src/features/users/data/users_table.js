/**
 * @file users_table.js
 * @description Capa de datos de usuarios. Define la estructura de perfiles y relaciones de amistad.
 * Alineado con PostgreSQL.
 */
import { User } from "../types/user_data";


/* Usuarios Mock (Amigos del usuario maestro) */
export const FRIENDS_LIST = [
    new User({ uuid: "usr_rel_4521", first_name: "María", last_name: "García", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria", user_tag: "#4521", username: "maria_g", club_uuids: ["club_001", "club_004"] }),
    new User({ uuid: "usr_rel_8834", first_name: "Juan", last_name: "Pérez", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan", user_tag: "#8834", username: "juan_p", club_uuids: ["club_002", "club_009"] }),
    new User({ uuid: "usr_rel_1190", first_name: "Ana", last_name: "Torres", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana", user_tag: "#1190", username: "ana_t", club_uuids: ["club_003", "club_014"] }),
    new User({ uuid: "usr_rel_6673", first_name: "Carlos", last_name: "López", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos", user_tag: "#6673", username: "carlos_l", club_uuids: ["club_001", "club_006"] }),
    new User({ uuid: "usr_rel_2201", first_name: "Pedro", last_name: "Ruiz", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro", user_tag: "#2201", username: "pedro_r", club_uuids: ["club_002", "club_010"] }),
    new User({ uuid: "usr_rel_9910", first_name: "Laura", last_name: "Díaz", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura", user_tag: "#9910", username: "laura_d", club_uuids: ["club_003", "club_005"] }),
    new User({ uuid: "usr_rel_3347", first_name: "Diego", last_name: "Mora", avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego", user_tag: "#3347", username: "diego_m", club_uuids: ["club_001", "club_012"] }),
];

export const MASTER_USER = new User({
    uuid: "usr_master_7842",
    user_tag: "#7842",
    first_name: "Santiago",
    last_name: "Mejias",
    username: "santi_dev",
    bio: "Desarrollador apasionado y constructor de comunidades digitales.",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Santiago",
    banner_url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&h=200&fit=crop",
    location: "La Guaira, VE",
    created_at: "2025-03-15T12:00:00Z",
    is_online: true,
    mutual_friends_count: 4,
    club_uuids: ["club_004", "club_009", "club_014", "club_006", "club_010", "club_005", "club_012", "club_016"],
});

/**
 * 🛠️ [Vyne-Standard]: Simulación de tabla pivote 'friendships'.
 * En Laravel, esto será una consulta a la tabla friendships con un join a users.
 */
export const MOCK_FRIENDSHIPS = FRIENDS_LIST.map(friend => ({
    uuid: `friendship_${friend.uuid}`,
    user_id: MASTER_USER.uuid,
    friend_id: friend.uuid,
    status: 'accepted',
    created_at: new Date().toISOString(),
    friend_data: friend // El "Eager Loading" de Laravel
}));

/**
 * @description Simulación de la tabla 'users' completa para búsquedas globales.
 */
export const USERS_TABLE = [MASTER_USER, ...FRIENDS_LIST];
