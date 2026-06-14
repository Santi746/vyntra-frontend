import React from "react";
import UserAvatar from "@/shared/components/ui/atoms/UserAvatar";
import { Check, X, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

/**
 * El componente FriendRequestCard muestra una solicitud de amistad pendiente o recientemente aceptada.
 * Proporciona acciones para aceptar o rechazar la solicitud con retroalimentación visual.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.request - El objeto de datos de la solicitud de amistad.
 *                                  En la rama inteligente de FriendshipResource (backend),
 *                                  el `uuid` raíz es el del usuario amigo y `friendship_uuid`
 *                                  es el de la solicitud. `friend` es el objeto del usuario
 *                                  que envió la solicitud.
 * @param {string} props.request.uuid - Identificador del usuario amigo.
 * @param {string} props.request.friendship_uuid - Identificador único de la solicitud.
 * @param {string} props.request.status - Estado actual de la solicitud ('pending', 'accepted', etc.).
 * @param {Object} props.request.friend - Datos del usuario que envió la solicitud.
 * @param {string} props.request.friend.uuid - Identificador único del usuario.
 * @param {string} props.request.friend.display_name - Nombre a mostrar del usuario.
 * @param {string} props.request.friend.username - Nombre de usuario.
 * @param {string} props.request.friend.avatar_url - URL de la imagen del avatar del usuario.
 * @param {Function} props.onAction - Función callback disparada después de que se realiza una acción (aceptar/rechazar). Recibe (friendship_uuid, action).
 * @returns {JSX.Element}
 */
export default function FriendRequestCard({ request, onAction, isPending }) {


  const handleAction = (action) => {
    if (onAction) {
      // Usamos friendship_uuid (no uuid) porque uuid es el del amigo, no el de la solicitud.
      onAction(request.friendship_uuid, action);
    }
  };

  const isAccepted = request.status === "accepted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-forest-card/40 border border-forest-border hover:bg-forest-card/80 transition-colors"
    >
      <div className="flex items-center gap-4 w-full">
        <UserAvatar
          uuid={request.friend.uuid}
          avatar_url={request.friend.avatar_url}
          display_name={request.friend.display_name}
          size="lg"
        />
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-forest-light font-semibold text-sm truncate">
            {request.friend.display_name}
          </span>
          <span className="text-forest-muted text-xs truncate">
            @{request.friend.username}
          </span>
          {isAccepted && (
            <span className="text-forest-accent text-xs font-medium mt-1 flex items-center gap-1">
              <Check size={12} />
              Solicitud aceptada
            </span>
          )}
        </div>
      </div>

      {!isAccepted && (
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleAction("accept")}
            disabled={isPending}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-forest-accent text-forest-dark font-bold text-xs hover:bg-forest-light transition-colors disabled:opacity-50"
          >
            {isPending ? "..." : "Aceptar"}
          </button>
          <button
            onClick={() => handleAction("decline")}
            disabled={isPending}
            className="flex-1 sm:flex-none flex items-center justify-center p-2 rounded-lg bg-forest-stat text-forest-muted hover:bg-forest-danger hover:text-white transition-colors disabled:opacity-50"
            title="Rechazar"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
