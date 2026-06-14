"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import ClubCategory from "@/features/clubs/components/molecules/ClubCategory";
import ClubDropdownMenu from "@/features/clubs/components/molecules/ClubDropdownMenu";
import ClubIdentityHeader from "@/features/clubs/components/molecules/ClubIdentityHeader";
import { useClub } from "@/features/clubs/hooks/useClub";
import SidebarChannelsSkeleton from "@/features/clubs/components/atoms/SidebarChannelsSkeleton";
import { useClubCategories } from "@/features/clubs/hooks/useClubCategories";

/**
 * @component SidebarClubChannels (Organism)
 * @description Gestiona la identidad del club y la navegación de sus canales.
 * Optimizado para Atomic Design separando la identidad del club en una molécula.
 */
export default function SidebarClubChannels() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const params = useParams();

  // Hooks Vyne-compliant (React Query) desacoplados
  const { data: club, isPending: isPendingClub, isError: isErrorClub } = useClub(params.uuid);
  const { data: categories, isPending: isPendingCats } = useClubCategories(params.uuid);

  if (isPendingClub || isPendingCats) return <SidebarChannelsSkeleton />;
  if (isErrorClub || !club) return null;

  return (
    <>
      <section className="relative bg-forest-dark border-forest-border-faint h-sidebar-height flex w-76 flex-col border-r border-b md:h-screen">
        
        {/* Identidad del Club (Molécula extraída) */}
        <ClubIdentityHeader 
          clubName={club.name}
          logoUrl={club.avatar_url}
          onlineCount={club.online_count}
          isDropdownOpen={isDropdownOpen}
          onToggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
        />

        {/* Menú desplegable */}
        <AnimatePresence>
          {isDropdownOpen && <ClubDropdownMenu />}
        </AnimatePresence>

        {/* Lista de Canales por categorías */}
        <motion.div className="bg-forest-card border-forest-border-faint no-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto border-t px-4 pt-5">
          {categories?.map((tempCategory, i) => (
            <ClubCategory
              key={tempCategory.uuid}
              uuid={tempCategory.uuid}
              name={tempCategory.name}
              channels={tempCategory.channels}
              club_uuid={club.uuid}
              is_private={tempCategory.is_private}
              i={i}
            />
          ))}
        </motion.div>
      </section>
    </>
  );
}
