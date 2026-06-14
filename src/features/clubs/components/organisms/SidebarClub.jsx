"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUserClubs } from "@/features/clubs/hooks/useUserClubs";
import ClubLogo from "@/features/clubs/components/atoms/ClubLogo";
import Tooltip from "@/shared/components/ui/molecules/Tooltip";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { slugify } from "@/shared/utils/slug";
import { useParams } from "next/navigation";
import { useQueryString } from "@/shared/hooks/useQueryString";

/**
 * Gestor dinámico del sidebar de comunidades (clubes).
 * Permite cambiar entre clubes con animaciones y tooltips.
 * @component SidebarClub
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isClubOpen - Determina si el panel está desplegado.
 * @param {boolean} props.isMobile - Indica si la vista actual es móvil.
 * @returns {React.ReactElement} Panel lateral/inferior animado.
 */
export default function SidebarClub({ isClubOpen, isMobile, clubSidebarLayout }) {
  const { createQueryString } = useQueryString();
  
  //  ESTADO PARA EL TOOLTIP 
  const [hoveredClub, setHoveredClub] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const isVerticalMobile = isMobile && clubSidebarLayout === "vertical";

  // Configuraciones dinámicas basadas en el dispositivo
  const containerVariants = {
    hidden: isMobile
      ? isVerticalMobile ? { opacity: 0, width: 0 } : { opacity: 0, height: 0, y: 40 }
      : { opacity: 0, width: 0 },
    visible: isMobile
      ? isVerticalMobile ? { opacity: 1, width: "70px" } : { opacity: 1, height: "70px", y: 0 }
      : { opacity: 1, width: "78px" },
    exit: isMobile ? (isVerticalMobile ? { opacity: 0, width: 0 } : { opacity: 0, height: 0, y: 0 }) : { opacity: 0, width: 0 },
  };

  // ─── HANDLERS DE HOVER ──────────────────────────────────────────────
  // Estas funciones se ejecutan cuando el mouse entra o sale de un ícono.

  /**
   * handleMouseEnter:
   * - Se activa cuando el mouse ENTRA en un ícono de club.
   * - `event.currentTarget` es el elemento DOM del ícono (el motion.div).
   *   OJO: currentTarget ≠ target.
   *     - target = el elemento exacto donde ocurrió el evento (podría ser el <img>)
   *     - currentTarget = el elemento donde PUSIMOS el onMouseEnter (el motion.div)
   *   Usamos currentTarget porque queremos la posición del contenedor, no del <img>.
   */
  const handleMouseEnter = (event, clubTitle) => {
    setHoveredClub(clubTitle); // Guardar el nombre del club
    setAnchorEl(event.currentTarget); // Guardar referencia al elemento DOM
  };

  /**
   * handleMouseLeave:
   * - Se activa cuando el mouse SALE de un ícono de club.
   * - Limpiamos ambos estados para ocultar el tooltip.
   */
  const handleMouseLeave = () => {
    setHoveredClub(null); // Limpiar nombre → tooltip se oculta
    setAnchorEl(null); // Limpiar referencia al elemento
  };


  // [MIGRATION-MARK: REACT-QUERY] Hook a migrar
  const { data: currentUser } = useCurrentUser();
  // [MIGRATION-MARK: REACT-QUERY] Hook a migrar
  const { data: userClubs } = useUserClubs(currentUser?.uuid, currentUser?.club_uuids);

  return (
    <>
      <AnimatePresence>
        {isClubOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, ease: "circOut" }}
            className={`bg-forest-dark-alt border-forest-border fixed z-50 ${
              isMobile
                ? isVerticalMobile
                  ? "top-0 left-0 h-[calc(100vh-80px)] w-[70px] flex-col items-center overflow-x-clip border-r py-4 pt-4"
                  : "bottom-20 left-0 w-full flex-row items-center justify-start gap-4 overflow-y-hidden border-t px-4"
                : "top-0 left-20 h-screen flex-col items-center overflow-x-clip border-r py-6 pt-6.5"
            } flex shrink-0`}
            // ── NUEVO: Limpiar tooltip al salir del sidebar entero ──
            // Si el mouse sale del sidebar, nos aseguramos de que el tooltip
            // desaparezca para que no quede "flotando" sin ícono.
            onMouseLeave={handleMouseLeave}
          >
            {/* avatar_url Principal / Indicador de Clubs */}
            <div
              className={`relative flex ${isMobile && !isVerticalMobile ? "flex-row" : "flex-col"} items-center`}
            >
              <div className="group flex h-10 w-10 items-center justify-center transition-all duration-300 md:h-12 md:w-12">
                <div className="text-forest-accent group-hover:text-forest-accent-light flex scale-100 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ClubLogo className="h-8 w-8 md:h-10 md:w-10" />
                </div>
              </div>
              {/* Línea divisoria estilo Discord */}
              <div
                className={`bg-forest-border ${isMobile && !isVerticalMobile ? "mx-3 h-8 w-0.5" : "mt-2 mb-4 h-0.5 w-8"} rounded-full`}
              />
            </div>

            {/* Lista de Clubes (Simulados) */}
            <div
              className={`flex ${isMobile && !isVerticalMobile ? "no-scrollbar flex-row overflow-x-auto" : "flex-col"} gap-4`}
            >
              {userClubs?.map((tempClub, index) => {
                // 🛠️ [Vyne-Mode-Easy]: Eliminada dependencia de categorías anidadas. 
                // Usamos el campo plano del contrato.
                const firstChannelUuid = tempClub.default_channel_uuid || "default";

                return (
                <Link key={tempClub.uuid} href={`/clubs/${tempClub.uuid}/${firstChannelUuid}`}>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.05 * index }}
                  className="bg-forest-sta group hover:rounded-club-hover relative h-10 w-10 shrink-0 cursor-pointer rounded-3xl transition-all duration-300 md:h-12 md:w-12"
                  // ── NUEVO: Handlers de hover para el tooltip ──
                  // Solo en desktop (!isMobile) para evitar problemas en móvil
                  // donde no hay "hover" real.
                  onMouseEnter={
                    !isMobile
                      ? (e) => handleMouseEnter(e, tempClub.name)
                      : undefined
                  }
                  onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                >
                  <Image
                    src={tempClub.avatar_url}
                    alt={`${tempClub.name} logo`}
                    fill
                    sizes="48px"
                    className="rounded-3xl object-cover"
                    unoptimized={tempClub.avatar_url?.includes("dicebear")}
                  />
                  
                  {/* El 'Pill' indicador de Discord (Solo en PC lateral) */}
                  {!isMobile && (
                    <div className="absolute top-1/2 -left-4 h-2 w-2 -translate-y-1/2 rounded-r-full bg-white opacity-0 transition-all duration-300 group-hover:h-5 group-hover:opacity-100" />
                  )}
                  {/* Indicador inferior para móvil? Opcional */}
                  {isMobile && (
                    <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  )}
                </motion.div>
                </Link>
                );
              })}
            </div>

            {/* Botón de Añadir (+) */}
            <div
              className={`${isMobile && !isVerticalMobile ? "ml-auto" : "mt-5"} flex flex-col items-center`}
            >
              <Link
                href={createQueryString("create_club", "true")}
                className="border-forest-border hover:border-forest-accent text-forest-muted hover:rounded-club-hover flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed transition-all duration-300 hover:text-white md:h-12 md:w-12"
              >
                <span className="text-xl font-light md:text-2xl">+</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOOLTIP VIA PORTAL ──────────────────────────────────────────
          Este <Tooltip> se renderiza FUERA del sidebar (en #portal-root)
          gracias al Portal. Por eso no importa que el sidebar tenga
          overflow-x-clip: el tooltip ya no está "dentro" del sidebar.

          Props:
          - text: el nombre del club que se muestra
          - anchorEl: el elemento DOM del ícono para calcular la posición
          - visible: controla si se muestra o no

          NOTA: Aunque este <Tooltip> está escrito aquí en el JSX del
          SidebarClub, en el DOM REAL aparece dentro de #portal-root.
          Es como escribir una carta aquí pero enviarla a otro buzón.
      */}
      {!isMobile && (
        <Tooltip
          text={hoveredClub}
          anchorEl={anchorEl}
          visible={!!hoveredClub}
        />
      )}
    </>
  );
}

