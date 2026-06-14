"use client";

import { motion } from "framer-motion";
import UserAvatar from "@/shared/components/ui/atoms/UserAvatar";
import { getUserDisplayName } from "@/features/users/utils/user_helpers";
import { useRouter, useParams } from "next/navigation";

/**
 * @molecule DMConversationItem
 * @description Item individual de conversación en la lista de Mensajes Directos.
 * Muestra el avatar, nombre de usuario, último mensaje y badge de no leídos.
 * Visualmente idéntico a Discord.
 *
 * @param {Object} props
 * @param {Object} props.conversation - Datos de la conversación DM.
 * @param {string} props.conversation.uuid - UUID de la conversación.
 * @param {Object} props.conversation.participant - Datos del otro participante.
  * @param {Object} props.conversation.last_message - Último mensaje.
  * @param {string} props.conversation.last_message.content - Contenido del último mensaje.
  * @param {string} props.conversation.last_message.created_at - Fecha del último mensaje.
 * @param {number} props.conversation.unread_count - Cantidad de mensajes no leídos.
 */
export default function DMConversationItem({ conversation }) {
  const router = useRouter();
  const params = useParams();
  const isActive = params?.chat_uuid === conversation.uuid;
  const participant = conversation.participant;
  const displayName = getUserDisplayName(participant);

  const handleClick = () => {
    router.push(`/me/${conversation.uuid}`);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
      className={`group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors duration-150 cursor-pointer ${
        isActive
          ? "bg-forest-stat text-forest-light"
          : "text-forest-muted hover:bg-forest-stat/60 hover:text-forest-light"
      }`}
    >
      {/* Avatar del participante */}
      <div className="shrink-0 pointer-events-none">
        <UserAvatar
          uuid={participant?.uuid}
          avatar_url={participant?.avatar_url}
          display_name={displayName}
          is_online={participant?.is_online}
          size="sm"
        />
      </div>

      {/* Info del chat */}
      <div className="flex min-w-0 flex-1 flex-col items-start">
        <span className="truncate text-sm font-semibold leading-tight">
          {displayName}
        </span>
        <span className="truncate text-xs text-forest-muted leading-tight max-w-full">
          {conversation.last_message?.content}
        </span>
      </div>

      {/* Badge de no leídos */}
      {conversation.unread_count > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-forest-accent px-1.5 text-[10px] font-bold text-forest-dark">
          {conversation.unread_count}
        </span>
      )}
    </motion.button>
  );
}
