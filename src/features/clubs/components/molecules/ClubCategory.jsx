"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ChevronIcon from "@/shared/components/ui/atoms/ChevronIcon";
import { motion, AnimatePresence } from "framer-motion";
import ClubChannel from "@/features/clubs/components/atoms/ClubChannel";
import { Plus, Settings, Lock } from "lucide-react";
import { useQueryString } from "@/shared/hooks/useQueryString";
import { useCheckPermission } from "@/features/clubs/hooks/useCheckPermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

/**
 * @component ClubCategory
 * @description Categoría interactiva que contiene una lista de canales. Desplegable y animada.
 *              Muestra un icono de candado si la categoría es privada.
 *
 * @param {string}   uuid          UUID de la categoría
 * @param {string}   name          Nombre de la categoría
 * @param {Array}    channels      Canales pertenecientes a esta categoría
 * @param {number}   i             Índice para animación escalonada
 * @param {string}   club_uuid     UUID del club
 * @param {boolean}  [is_private]  Si la categoría es privada
 */
export default function ClubCategory({
  uuid,
  name,
  channels,
  i,
  club_uuid,
  is_private = false,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const params = useParams();
  const { createQueryString } = useQueryString();

  // ── PROTECCIÓN DE PERMISOS (BITWISE) ──
  const canManageChannels = useCheckPermission(club_uuid, PERMISSIONS.MANAGE_CHANNELS);

  // URL para el modal de crear canal
  const createChannelHref = createQueryString("create_channel", uuid);

  // URL para el modal de editar categoría
  const editCategoryHref = createQueryString("edit_category", uuid);

  return (
    <>
      {/* Contenedor de la categoría */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30,
          delay: 0.2 * i,
        }}
        exit={{ opacity: 0, x: -10 }}
        className="flex flex-col gap-1"
      >
        {/* Nombre de la categoría con hover */}
        <div className="group flex w-full flex-row items-center justify-between rounded-lg px-2 py-1 transition-colors hover:bg-forest-muted/10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="flex flex-1 flex-row items-center gap-2 cursor-pointer"
          >
            {/* svg de flechita que indica si la categoria esta expandida o contraida */}
            <ChevronIcon isExpanded={isExpanded} />
            <p className="text-forest-label text-xs font-bold tracking-wider uppercase">
              {name}
            </p>
            {is_private && (
              <Lock
                size={11}
                className="shrink-0 text-forest-muted-alt"
                aria-label="Categoría privada"
              />
            )}
          </button>

          {/* Acciones flotantes (solo visibles en hover Y con permisos) */}
          {canManageChannels && (
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Link
                href={editCategoryHref}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-forest-muted hover:bg-forest-stat hover:text-forest-light"
                title="Editar Categoría"
              >
                <Settings size={14} />
              </Link>
              <Link
                href={createChannelHref}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-forest-muted hover:bg-forest-stat hover:text-forest-light"
                title="Crear Canal"
              >
                <Plus size={16} />
              </Link>
            </div>
          )}
        </div>
        {/* Lista de canales de la categoría */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {/* Renderizado de canales */}
              {channels.map((channel, i) => (
                <ClubChannel
                  key={channel.uuid}
                  name={channel.name}
                  uuid={channel.uuid}
                  category_uuid={uuid}
                  club_uuid={club_uuid}
                  active={params.channel_uuid === channel.uuid}
                  is_private={Boolean(channel.is_private)}
                  i={i}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

