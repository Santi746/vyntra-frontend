"use client";

import React from "react";
import Image from "next/image";
import { Users, TrendingUp } from "lucide-react";
import Badge from "@/shared/components/ui/atoms/Badge";
import VerifiedIcon from "@/shared/components/ui/atoms/VerifiedIcon";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";


/**
 * @typedef {Object} Club
 * @property {number} uuid - The uuid of the club.
 * @property {string} name - The name of the club.
 * @property {string} description - A brief summary of what the club is about.
 * @property {string} category_tag - The category or label (e.g., "is_verified", "Tech", "Design").
 * @property {string} banner_url - The URL for the large background cover banner_url.
 * @property {string} avatar_url - The URL for the club's avatar_url logo.
 * @property {string} members_count - The total number of members_count (e.g., "12.4k").
 * @property {string} online_count - The number of online_count members_count (e.g., "1.2k").
 * @property {string} [featured_text] - Optional trending text shown at the bottom.
 * @property {boolean} is_verified - True if the club is officially verified.
 */

/**
 * ClubCard component displays a stylized card with information about a specific community/club.
 * Contains hover animations, an banner_url banner, and a floating icon logo.
 *
 * @param {Object} props - Component properties.
 * @param {Club} props.club - The club data object to render.
 */
export default function ClubCard({ club }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildPreviewHref = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("preview", club.uuid);
    params.delete("user");
    params.delete("notifications");
    return `${pathname}?${params.toString()}`;
  };
  // destructuring de las propiedades del club
  const {
    uuid,
    name,
    category_tag,
    description,
    banner_url,
    avatar_url,
    members_count,
    online_count,
    is_verified,
  } = club || {};


  if (!club) {
    return <div className="text-white">No se encontro el club</div>
  }

  return (
    <Suspense fallback={null}>
      <Link href={buildPreviewHref()} scroll={false}>
      <div className="group border-forest-border bg-forest-deep hover:border-forest-accent/50 hover:shadow-card-glow relative w-full cursor-pointer overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300">
      {/* BANNER: Imagen de fondo con gradiente suave inferior */}
      <div className="relative h-28 w-full overflow-hidden">
        <Image
          src={banner_url}
          alt={`Banner for ${name}`}
          fill
          className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Sombra para integrar el banner con el color de la tarjeta */}
        <div className="from-forest-deep absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t to-transparent" />

        {/* TAG */}
        <Badge className="absolute top-3 right-3">{category_tag}</Badge>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative px-4 pt-10 pb-4">
        {/* ICONO / AVATAR */}
        <div className="border-forest-deep bg-forest-card absolute -top-7 left-4 h-14 w-14 overflow-hidden rounded-full border-4">
          <div className="bg-forest-accent-dark/20 flex h-full w-full items-center justify-center">
            {avatar_url?.endsWith(".svg") ? (
              <Image
                src={avatar_url}
                alt={`${name} avatar_url`}
                fill
                sizes="56px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <Image
                src={avatar_url}
                alt={`${name} avatar_url`}
                fill
                sizes="56px"
                className="object-cover"
                unoptimized={avatar_url?.includes("dicebear")}
              />
            )}
          </div>
        </div>

        {/* CONTENEDOR DE TEXTOS */}
        <div>
          {/* TÍTULO Y VERIFICADO */}
          <h3 className="text-forest-light flex items-center gap-1.5 text-lg font-bold">
            {name}
            {is_verified && <VerifiedIcon />}
          </h3>

          {/* DESCRIPCIÓN */}
          <p className="text-forest-muted mt-2 line-clamp-2 text-sm leading-snug font-medium">
            {description}
          </p>
        </div>

        {/* STATS */}
        <div className="text-forest-muted mt-6 flex items-center gap-3 text-sm font-semibold">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {members_count}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-forest-accent h-2 w-2 rounded-full"></span>
            {online_count} online
          </span>
        </div>
      </div>
      </div>
    </Link>
    </Suspense>
  );
}

