/**
 * @file direct_messages.js
 * @description Capa de datos simulada para conversaciones de Mensajes Directos (MD).
 * Define la estructura de conversaciones privadas y sus mensajes asociados.
 * Alineado con la futura tabla 'direct_message_conversations' y 'direct_messages' de PostgreSQL.
 */

import { MASTER_USER, USERS_TABLE } from "@/features/users/data/users_table";

// ─────────────────────────────────────────────────────────
// Conversaciones de MD Mock
// ─────────────────────────────────────────────────────────

/**
 * @typedef {Object} DMConversation
 * @property {string} uuid - Identificador único de la conversación.
 * @property {Object} participant - El otro participante de la conversación (no el usuario actual).
 * @property {Object} last_message - Último mensaje de la conversación.
 * @property {string} last_message.content - Contenido del último mensaje.
 * @property {string} last_message.created_at - Marca temporal ISO del último mensaje.
 * @property {number} unread_count - Cantidad de mensajes no leídos.
 */

/** @type {DMConversation[]} */
export const MOCK_DM_CONVERSATIONS = [
  {
    uuid: "dm_conv_001",
    participant: USERS_TABLE.find(u => u.uuid === "usr_rel_4521"),
    last_message: { content: "¡Hola! ¿Cómo va todo?", created_at: "2026-05-09T22:30:00Z" },
    unread_count: 2,
  },
  {
    uuid: "dm_conv_002",
    participant: USERS_TABLE.find(u => u.uuid === "usr_rel_8834"),
    last_message: { content: "¿Viste el último update del DLC?", created_at: "2026-05-09T21:15:00Z" },
    unread_count: 0,
  },
  {
    uuid: "dm_conv_003",
    participant: USERS_TABLE.find(u => u.uuid === "usr_rel_1190"),
    last_message: { content: "Dale, nos vemos mañana en el raid.", created_at: "2026-05-09T20:00:00Z" },
    unread_count: 1,
  },
  {
    uuid: "dm_conv_004",
    participant: USERS_TABLE.find(u => u.uuid === "usr_rel_6673"),
    last_message: { content: "Te envié las runas por correo del juego.", created_at: "2026-05-09T18:45:00Z" },
    unread_count: 0,
  },
  {
    uuid: "dm_conv_005",
    participant: USERS_TABLE.find(u => u.uuid === "usr_rel_2201"),
    last_message: { content: "Buena build, la voy a probar esta noche.", created_at: "2026-05-09T17:30:00Z" },
    unread_count: 0,
  },
  {
    uuid: "dm_conv_006",
    participant: USERS_TABLE.find(u => u.uuid === "usr_rel_9910"),
    last_message: { content: "¿Alguien tiene la llave del calabozo secreto?", created_at: "2026-05-09T16:00:00Z" },
    unread_count: 3,
  },
  {
    uuid: "dm_conv_007",
    participant: USERS_TABLE.find(u => u.uuid === "usr_rel_3347"),
    last_message: { content: "GG, fue una buena partida.", created_at: "2026-05-09T14:20:00Z" },
    unread_count: 0,
  },
];

// ─────────────────────────────────────────────────────────
// Mensajes de MD Mock (agrupados por conversación UUID)
// ─────────────────────────────────────────────────────────

/**
 * Mensajes mock agrupados por uuid de conversación DM.
 * @type {Object<string, import("./chat_messages").ChatMessage[]>}
 */
export const MOCK_DM_MESSAGES = {
  dm_conv_001: Array.from({ length: 60 }).map((_, i) => {
    const participant = USERS_TABLE.find(u => u.uuid === "usr_rel_4521");
    const isMaster = i % 2 === 0;
    const user = isMaster
      ? { uuid: MASTER_USER.uuid, username: MASTER_USER.username, avatar_url: MASTER_USER.avatar_url }
      : { uuid: participant.uuid, username: participant.username, avatar_url: participant.avatar_url };

    const contents = [
      "¡Hola! ¿Cómo va todo?",
      "Todo bien, ¿y tú?",
      "Aquí, jugando un rato. ¿Te unes?",
      "¡Dale! Dame 5 minutos.",
      "Perfecto, te espero en el lobby.",
      "Ya estoy conectada, ¿en qué servidor?",
      "En el de siempre, el de Latam.",
      "Ok, ya voy para allá.",
      "¿Tienes el arma nueva del evento?",
      "Sí, está rota. La conseguí ayer.",
    ];

    return {
      uuid: `dm-msg-001-${String(i + 1).padStart(3, "0")}`,
      client_uuid: `dm-client-001-${i}`,
      sender_uuid: user.uuid,
      content: contents[i % contents.length],
      status: "sent",
      parent_message_uuid: null,
      created_at: new Date(new Date("2026-05-09T10:00:00Z").getTime() + i * 120000).toISOString(),
      user: {
        uuid: user.uuid,
        username: user.username,
        avatar_url: user.avatar_url,
      },
    };
  }),

  dm_conv_002: Array.from({ length: 40 }).map((_, i) => {
    const participant = USERS_TABLE.find(u => u.uuid === "usr_rel_8834");
    const isMaster = i % 3 === 0;
    const user = isMaster
      ? { uuid: MASTER_USER.uuid, username: MASTER_USER.username, avatar_url: MASTER_USER.avatar_url }
      : { uuid: participant.uuid, username: participant.username, avatar_url: participant.avatar_url };

    const contents = [
      "¿Viste el último update del DLC?",
      "¡Sí! Las nuevas armas están brutales.",
      "El boss final es imposible solo.",
      "Necesitas al menos 3 para el raid.",
      "¿A qué hora te conectas hoy?",
      "Tipo 8pm, después de cenar.",
    ];

    return {
      uuid: `dm-msg-002-${String(i + 1).padStart(3, "0")}`,
      client_uuid: `dm-client-002-${i}`,
      sender_uuid: user.uuid,
      content: contents[i % contents.length],
      status: "sent",
      parent_message_uuid: null,
      created_at: new Date(new Date("2026-05-09T08:00:00Z").getTime() + i * 180000).toISOString(),
      user: {
        uuid: user.uuid,
        username: user.username,
        avatar_url: user.avatar_url,
      },
    };
  }),

  dm_conv_003: Array.from({ length: 25 }).map((_, i) => {
    const participant = USERS_TABLE.find(u => u.uuid === "usr_rel_1190");
    const isMaster = i % 2 !== 0;
    const user = isMaster
      ? { uuid: MASTER_USER.uuid, username: MASTER_USER.username, avatar_url: MASTER_USER.avatar_url }
      : { uuid: participant.uuid, username: participant.username, avatar_url: participant.avatar_url };

    return {
      uuid: `dm-msg-003-${String(i + 1).padStart(3, "0")}`,
      client_uuid: `dm-client-003-${i}`,
      sender_uuid: user.uuid,
      content: `Mensaje de prueba #${i + 1} en conversación con Ana.`,
      status: "sent",
      parent_message_uuid: null,
      created_at: new Date(new Date("2026-05-09T06:00:00Z").getTime() + i * 240000).toISOString(),
      user: {
        uuid: user.uuid,
        username: user.username,
        avatar_url: user.avatar_url,
      },
    };
  }),
};

/**
 * Filtra y devuelve los mensajes asociados a un identificador de conversación DM específico.
 * @function getMessagesByDM
 * @param {string} dmUuid - El identificador único de la conversación DM.
 * @returns {import("./chat_messages").ChatMessage[]} Array con los mensajes correspondientes.
 */
export const getMessagesByDM = (dmUuid) => {
  return MOCK_DM_MESSAGES[dmUuid] || [];
};

/**
 * Filtra y devuelve las conversaciones de MD paginadas por cursor.
 * @function getDMConversationsPaginated
 * @param {string|null} cursor - El UUID de la última conversación cargada (cursor).
 * @param {number} limit - Cantidad de conversaciones por página.
 * @param {string} searchQuery - Búsqueda opcional.
 * @returns {{ conversations: DMConversation[], nextCursor: string|null }}
 */
export const getDMConversationsPaginated = (cursor, limit = 10, searchQuery = "") => {
  let filtered = MOCK_DM_CONVERSATIONS;

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(c => 
      c.participant?.display_name?.toLowerCase().includes(query) ||
      c.participant?.username?.toLowerCase().includes(query)
    );
  }

  let startIndex = 0;

  if (cursor) {
    const cursorIndex = filtered.findIndex(c => c.uuid === cursor);
    startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
  }

  const conversations = filtered.slice(startIndex, startIndex + limit);
  const nextCursor = conversations.length === limit
    ? conversations[conversations.length - 1].uuid
    : null;

  return { conversations, nextCursor };
};
