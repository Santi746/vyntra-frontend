"use client";

import CardinalStar from "@/shared/components/ui/atoms/CardinalStar";
import SearchBar from "@/features/dashboard/components/molecules/SearchBar";
import CategoryChips from "@/features/dashboard/components/molecules/CategoryChips";
import ClubsFeatured from "@/features/dashboard/components/organisms/ClubsFeatured";
import SearchingResults from "@/features/dashboard/components/organisms/SearchingResults";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMobileDetector from "@/shared/hooks/mobileDetector";
import DashboardSkeleton from "@/features/dashboard/components/atoms/DashboardSkeleton";

/**
 * @component DashboardTemplate
 * @description Contenedor principal para la experiencia de descubrimiento y búsqueda.
 * Gestiona el estado entre la navegación normal (categorías) y la búsqueda activa (resultados).
 * Consume datos directamente desde la caché de React Query.
 *
 * @returns {JSX.Element} El diseño animado del dashboard.
 */
export default function DashboardTemplate({ className = "" }) {
  const { data, isLoading, isError } = useDashboardData();
  const [isSearching, setIsSearching] = useState(false);
  const isMobile = useMobileDetector();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // El hook ya devuelve response.data (la estructura { featuredClubs, categories }).
  // Lectura defensiva para tolerar respuestas parciales o del backend real.
  const featuredClubs = data?.featuredClubs || [];
  const categories = data?.categories || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 3) {
        setDebouncedTerm(searchTerm);
      } else {
        setDebouncedTerm("");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* Skeleton completo del dashboard mientras cargan los datos */
  if (isLoading) {
    return <DashboardSkeleton />;
  }


  if (isError) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-forest-900 px-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold text-white">Error de Conexión</h2>
          <p className="text-forest-muted">No pudimos recuperar las comunidades. Inténtalo de nuevo más tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* EL MOTION CONTENEDOR CEREBRAL */}
      <motion.section
        id="dashboard-top"
        className={`relative flex w-full flex-col overflow-x-clip px-4 pt-6 pb-12 md:px-8 lg:px-12 xl:px-16 ${className}`}
        layout
      >
        {/* Header: Descubre Comunidades */}
        <AnimatePresence mode="wait">
          {(!isMobile || !isSearching) && (
            <motion.div
              key="header"
              className="flex h-32 flex-col justify-between gap-4 px-2 sm:flex-row sm:items-center"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, y: -10, height: 0, overflow: "hidden" }}
            >
              <div className="z-10 flex max-w-full flex-col gap-1.5 overflow-hidden">
                <h1 className="sm:text-28 truncate text-3xl font-extrabold tracking-tight text-white sm:whitespace-normal">
                  Descubre Comunidades
                </h1>
                <p className="text-forest-muted-alt text-md sm:text-15 font-medium">
                  Encuentra tu comunidad Ideal y comienza a conectarte
                </p>
              </div>
              {/* Cardinal Star */}
              <CardinalStar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Navigation Area */}
        <motion.div
          className="top-0 z-40 -mx-2 px-2 pt-2 pb-4 backdrop-blur-md"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <SearchBar setIsSearching={setIsSearching} setSearchTerm={setSearchTerm} />
        </motion.div>

        {/* Featured Section */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="searching"
              className="mt-4 w-full"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0 }}
            >
              <SearchingResults searchTerm={debouncedTerm} />
            </motion.div>
          ) : (
            <motion.div
              key="featured"
              className="-mx-2 px-2 pt-5 pb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="pb-2">
                <CategoryChips categories={categories} />
              </div>
              <ClubsFeatured
                featuredClubs={featuredClubs}
                categories={categories}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}
