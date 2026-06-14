"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, CalendarDays, X, ShieldCheck } from "lucide-react";
import { clubData } from "@/features/clubs/types/club_data";
import Badge from "@/shared/components/ui/atoms/Badge";
import Button from "@/shared/components/ui/atoms/Button";
import VerifiedIcon from "@/shared/components/ui/atoms/VerifiedIcon";
import CrownIcon from "@/shared/components/ui/atoms/CrownIcon";
import UserAvatar from "@/shared/components/ui/atoms/UserAvatar";
import { useClub } from "@/features/clubs/hooks/useClub";
import { useUser } from "@/features/users/hooks/useUser";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ClubPreviewModalSkeleton from "@/features/clubs/components/atoms/ClubPreviewModalSkeleton";

/**
 * Mapa de iconos para las tarjetas de estadísticas.
 * Se usa un Map para resolver el icono correcto por key sin necesidad de .filter().
 */

/**
 * @component ClubPreviewModal
 * @description Modal de preview de un club estilo "Quick View".
 * Se muestra automáticamente con animación fade-in/scale-up al montar el componente.
 * Consume el DTO `CLUB_MODAL_DATA` que reutiliza campos existentes del catálogo de clubes.
 *
 * Secciones:
 * - avatar_url con iniciales + botón cerrar
 * - Título + badge verificado
 * - Tags (pills)
 * - Descripción
 * - 3 tarjetas de estadísticas (Miembros, Activos Hoy, Creado)
 * - Creador del club (avatar_url + nombre + corona)
 * - Botón "Unirse al Club"
 *
 * @returns {JSX.Element}
 */
export default function ClubPreviewModal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const previewId = searchParams.get("preview");

  // [REGLA DE ORO: HOOKS SIEMPRE AL PRINCIPIO]
  const {
    data: club,
    isPending: isClubPending,
    isError: isClubError
  } = useClub(previewId);

  const {
    data: owner,
    isPending: isOwnerPending,
    isError: isOwnerError
  } = useUser(club?.owner_uuid);

  // [REGLA DE ORO: EFECTOS TAMBIÉN AL PRINCIPIO]
  useEffect(() => {
    if (previewId) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [previewId]);

  if (!previewId) {
    return null;
  }

  // Skeleton mientras carga el club — ya no es un null vacío
  if (isClubPending) {
    return <ClubPreviewModalSkeleton />;
  }

  if (isClubError || !club) {
    return null;
  }


  const STAT_ICONS = new Map([
    ["members_count", Users],
    ["online_count", TrendingUp],
    ["created_at", CalendarDays],
  ]);

  const STATS = [
    { key: "members_count", value: club.members_count, label: "Miembros" },
    { key: "online_count", value: club.online_count, label: "Activos Hoy" },
    { key: "created_at", value: club.created_at, label: "Creado" },
  ];

  const resolvedCreator = {
    uuid: owner?.uuid ?? null,
    name: owner
      ? `${owner.first_name} ${owner.last_name}`
      : "Usuario Desconocido",
    avatar_url: owner
      ? owner.avatar_url
      : "https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown",
    is_online: owner?.is_online ?? false,
  };

  /**
   * URL de cierre que elimina solo el param 'preview' y preserva el resto.
   */
  const closeHref = (() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("preview");
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  })();

  return (
    <motion.div
      className="fixed inset-0 z-999999 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="club-modal-name"
        className="bg-forest-dark border-forest-border shadow-modal my-auto w-full max-w-2xl overflow-hidden rounded-2xl border"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        {/* ─── Banner Header ─── */}
        <div className="relative h-28 w-full overflow-hidden bg-forest-stat">
          {club.banner_url ? (
            <img
              src={club.banner_url}
              alt="Banner del club"
              className="block h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-forest-deep/80" />
          <Link href={closeHref} scroll={false}>
            <button
              className="absolute top-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80 active:scale-95"
              aria-label="Cerrar modal"
            >
              <X size={18} />
            </button>
          </Link>
        </div>

        {/* ─── Avatar del Club ─── */}
        <div className="relative -mt-9 px-6">
          <div className="relative border-forest-deep bg-forest-card h-[72px] w-[72px] overflow-hidden rounded-xl border-4 shadow-xl">
            <Image
              src={club.avatar_url}
              alt={`Avatar de ${club.name}`}
              fill
              sizes="72px"
              className="object-cover"
            />
          </div>
        </div>

        {/* â”€â”€ Contenido Principal â”€â”€ */}
        <div className="flex flex-col gap-3.5 px-6 pt-1 pb-6">
          {/* TÃ­tulo + Verificado */}
          <div className="flex items-center gap-2">
            <h2
              id="club-modal-name"
              className="text-forest-light cursor-default text-lg font-bold tracking-tight sm:text-xl"
            >
              {club.name}
            </h2>
            {club.is_verified && <VerifiedIcon />}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="custom"
              className="text-forest-muted bg-forest-stat/50 border-forest-border-faint hover:border-forest-accent/30 hover:text-forest-accent cursor-default border px-3 py-1 text-xs font-medium transition-colors"
            >
              {club.category_tag}
            </Badge>
          </div>

          {/* DescripciÃ³n */}
          <div className="flex flex-col gap-1.5 pt-1">
            <h3 className="text-forest-muted/60 text-xs font-bold tracking-widest uppercase">
              DescripciÃ³n
            </h3>
            <p className="text-forest-muted-alt text-sm leading-relaxed sm:text-base">
              {club.description}
            </p>
          </div>

          {/* â”€â”€ Tarjetas de EstadÃ­sticas â”€â”€ */}
          <div className="grid grid-cols-3 gap-1.5 py-1 sm:gap-3">
            {STATS.map((tempStat) => {
              const Icon = STAT_ICONS.get(tempStat.key);
              return (
                <div
                  key={tempStat.key}
                  className="bg-forest-stat border-forest-border-faint hover:border-forest-accent/20 hover:bg-forest-stat-accent/5 flex flex-col items-center gap-1 rounded-2xl border px-1 py-3.5 transition-all sm:gap-0 sm:px-2 sm:py-4.5"
                >
                  <Icon
                    size={20}
                    className="text-forest-accent/80 mb-1"
                    strokeWidth={2.5}
                  />
                  <span className="text-forest-light cursor-default text-base font-extrabold sm:text-lg">
                    {tempStat.value}
                  </span>
                  <span className="text-forest-muted/80 text-micro cursor-default text-center leading-tight font-medium tracking-tighter uppercase min-[375px]:text-xs sm:text-xs sm:tracking-tight">
                    {tempStat.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="bg-forest-border/60 my-2 h-px w-full" />

          {/* â”€â”€ Creador del club â”€â”€ */}
          <div className="flex flex-col gap-2">
            <h3 className="text-forest-muted/60 text-xs font-bold tracking-widest uppercase">
              Creador
            </h3>
            <div className="flex items-center gap-2.5">
              {resolvedCreator.uuid ? (
                <UserAvatar
                  uuid={resolvedCreator.uuid}
                  avatar_url={resolvedCreator.avatar_url}
                  display_name={resolvedCreator.name}
                  is_online={resolvedCreator.is_online}
                  size="sm"
                />
              ) : (
                <div className="border-forest-border bg-forest-card relative h-8 w-8 overflow-hidden rounded-full border">
                  <img
                    src={resolvedCreator.avatar_url}
                    alt={`Avatar de ${resolvedCreator.name}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex min-w-0 flex-1 items-center gap-1">
                <span className="text-forest-light cursor-pointer truncate text-sm font-bold tracking-tighter sm:text-base">
                  {resolvedCreator.name}
                </span>
                <CrownIcon />
              </div>
            </div>
          </div>

          <div className="bg-forest-border/60 my-2 h-px w-full" />

          {/* â”€â”€ BotÃ³n de AcciÃ³n â”€â”€ */}
          <Button variant="modal-action">
            <ShieldCheck size={18} strokeWidth={2.5} />
            Unirse al Club
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
