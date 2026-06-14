/* @description Este archivo se encarga de almacenar las categorías de los clubes tanto como igual que los canales */

/* 
 * 🚀 FUTURA INTEGRACIÓN BACKEND (PostgreSQL)
 * --------------------------------------------------------
 * En la base de datos, las categorías y canales serán tablas separadas.
 * - Categorías: uuid, club_id, name, sort_order
 * - Canales: uuid, category_id, name, description, type (text, voice), sort_order
 */

/**
 * La constante categories almacena la estructura jerárquica de un club,
 * incluyendo las categorías y sus canales anidados.
 * 
 * @constant
 * @type {Array<Object>}
 * @property {string} uuid - Identificador único de la categoría.
 * @property {string} name - Nombre a mostrar de la categoría.
 * @property {number} sort_order - Orden de visualización dentro del club.
 * @property {boolean} [is_private] - Indica si la categoría es restringida.
 * @property {Array<Object>} channels - Lista de canales que pertenecen a esta categoría.
 * @property {string} channels[].uuid - Identificador único del canal.
 * @property {string} channels[].name - Nombre a mostrar del canal.
 * @property {string} channels[].description - Breve descripción del propósito del canal.
 * @property {string} channels[].type - Tipo de canal (ej., 'text', 'voice', 'announcement').
 * @property {number} channels[].sort_order - Orden de visualización dentro de la categoría.
 * @property {boolean} [channels[].is_private] - Indica si el canal es restringido.
 */
export const categories = [


    {
        uuid: "category-001", 
        name: "General 🌍",
        sort_order: 1,
        channels: [
            {
                uuid: "category-001-channel-001",
                name: "Chat General",
                description: "Canal para hablar de cualquier tema relacionado al club.",
                type: "text",
                sort_order: 1
            },
            {
                uuid: "category-001-channel-002",
                name: "Caraota con azucar 😋",
                description: "Debate serio sobre la mejor forma de comer caraotas.",
                type: "text",
                sort_order: 2,
                is_private: true,
            }
        ]
    },
    {
        uuid: "category-002",
        name: "Anuncios📯",
        sort_order: 2,
        is_private: true,
        channels: [
            {
                uuid: "category-002-channel-001",
                name: "Anuncios",
                description: "Noticias oficiales del club.",
                type: "announcement",
                sort_order: 1
            },
            {
                uuid: "category-002-channel-002",
                name: "Eventos",
                description: "Calendario de próximas actividades.",
                type: "text",
                sort_order: 2
            },
            {
                uuid: "category-002-channel-003",
                name: "Encuestas",
                description: "Tu opinión importa en las decisiones del club.",
                type: "text",
                sort_order: 3
            }
        ]
    },
    {
        uuid: "category-003",
        name: "Juegos 🎮",
        sort_order: 3,
        channels: [
            {
                uuid: "category-003-channel-001",
                name: "Elden Ring ⚔️",
                description: "Canal general de las Tierras Entre Medias.",
                type: "text",
                sort_order: 1
            },
            {
                uuid: "category-003-channel-002",
                name: "Builds y Estrategias",
                description: "Comparte y debate las mejores builds para el DLC.",
                type: "text",
                sort_order: 2
            },
            {
                uuid: "category-003-channel-003",
                name: "Lore y Teorías",
                description: "Discusión sobre la historia y misterios de Miquella.",
                type: "text",
                sort_order: 3
            },
            {
                uuid: "category-003-channel-004",
                name: "Helldivers 2 🚀",
                description: "Por la democracia gestionada.",
                type: "voice",
                sort_order: 4
            }
        ]
    },
    {
        uuid: "category-004",
        name: "Series y Peliculas 🎬",
        sort_order: 4,
        channels: [
            {
                uuid: "category-004-channel-001",
                name: "Series",
                description: "Recomendaciones de lo que hay que ver.",
                type: "text",
                sort_order: 1
            },
            {
                uuid: "category-004-channel-002",
                name: "Peliculas",
                description: "Cine y palomitas.",
                type: "voice",
                sort_order: 2
            },
            {
                uuid: "category-004-channel-003",
                name: "Comics 📖",
                description: "Marvel, DC y mucho más.",
                type: "text",
                sort_order: 3
            },
            {
                uuid: "category-004-channel-004",
                name: "Anime 🌸",
                description: "El rincón de los nakamas.",
                type: "text",
                sort_order: 4
            }
        ]
    }
]