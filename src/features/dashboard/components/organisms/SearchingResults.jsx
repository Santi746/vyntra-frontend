"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchFiltersData } from "@/features/dashboard/data/searchFilters";
import { useSearchClubs } from "@/features/dashboard/hooks/useSearchClubs";
import ClubCard from "@/features/clubs/components/molecules/ClubCard";
import UserCard from "@/features/users/components/molecules/UserCard";
import InfiniteScrollTrigger from "@/shared/components/ui/atoms/InfiniteScrollTrigger";
import ClubCardSkeleton from "@/features/clubs/components/atoms/ClubCardSkeleton";
import UserCardSkeleton from "@/features/users/components/atoms/UserCardSkeleton";

/**
 * @component SearchingResults
 * @description Muestra la interfaz de resultados de búsqueda real.
 * Renderiza tarjetas de clubes filtradas dinámicamente desde la caché de React Query.
 * Implementa scroll infinito para resultados masivos.
 *
 * @param {Object} props
 * @param {string} props.searchTerm - Término de búsqueda debounced.
 * @returns {JSX.Element} El contenedor de la vista de resultados.
 */
export default function SearchingResults({ searchTerm = "" }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const { 
    data: resultsData, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useSearchClubs(searchTerm, activeFilter);

  // La forma del backend es { data: { clubs: { data, meta }, users: { data, meta } } }
  // Aplanamos todos los items (clubes + usuarios) de todas las páginas cargadas,
  // marcándolos con `_type` para que el renderizado sepa discriminarlos (el backend
  // no envía discriminador porque la respuesta ya viene agrupada por tipo).
  const flatClubs = resultsData?.pages.flatMap(page => (page?.data?.clubs?.data ?? []).map(c => ({ ...c, _type: 'club' }))) || [];
  const flatUsers = resultsData?.pages.flatMap(page => (page?.data?.users?.data ?? []).map(u => ({ ...u, _type: 'user' }))) || [];
  const results = [...flatClubs, ...flatUsers];
  // El backend no expone totalCount; lo derivamos de los items ya cargados en memoria.
  // (Best practice senior: el frontend cuenta lo que ve, el backend no pagina totales globales.)
  const totalCount = results.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {searchTerm ? `Resultados para "${searchTerm}"` : "Explorar todo"}
        </h1>
        <p className="text-forest-muted text-sm">
          {totalCount} comunidades encontradas
        </p>
      </div>

      {/* Filter Chips Container */}
      <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-4 sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0">
        {searchFiltersData.map((option) => (
          <button
            key={option.uuid}
            onClick={() => setActiveFilter(option.uuid)}
            className={`relative flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-300 sm:px-5 sm:py-2.5 ${
              activeFilter === option.uuid
                ? "bg-forest-accent border-forest-accent shadow-glow text-black"
                : "bg-forest-dark-alt/40 border-forest-border/40 text-forest-muted hover:border-forest-muted/40 hover:text-forest-light"
            }`}
          >
            <span
              className={`relative z-10 flex items-center gap-2 ${activeFilter === option.uuid ? "text-black" : ""}`}
            >
              {option.icon}
              {option.label}
            </span>

            {/* Animated Active Indicator */}
            {activeFilter === option.uuid && (
              <motion.div
                layoutId="filter-pill"
                className="bg-forest-accent absolute inset-0 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Grid de Resultados */}
      <motion.div
        layout
        key={activeFilter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-2 min-h-[400px]"
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading-skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {[...Array(8)].map((_, i) => (
                activeFilter === "users" ? (
                  <UserCardSkeleton key={i} />
                ) : (
                  <ClubCardSkeleton key={i} />
                )
              ))}
            </motion.div>
          ) : results && results.length > 0 ? (
            <motion.div
              key="results-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-12"
            >
              {activeFilter === "all" ? (
                /* --- MODO DESCUBRIMIENTO (CARRUSELES) --- */
                <>
                  {/* Sección de Clubes */}
                  {results.some((i) => i._type === "club") && (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between pr-4">
                        <div className="flex items-center gap-3">
                          <h2 className="text-forest-muted text-xs font-bold tracking-[0.2em] uppercase">
                            Comunidades
                          </h2>
                          <div className="bg-forest-border/20 h-px w-12" />
                        </div>
                        <button
                          onClick={() => setActiveFilter("clubs")}
                          className="text-forest-accent text-xs font-bold tracking-widest uppercase transition-colors hover:text-white"
                        >
                          Ver todas
                        </button>
                      </div>
                      <div className="no-scrollbar -mx-4 flex gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
                        {results
                          .filter((item) => item._type === "club")
                          .map((club) => (
                            <div
                              key={club.uuid}
                              className="w-[280px] shrink-0 sm:w-[320px]"
                            >
                              <ClubCard club={club} />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Sección de Usuarios */}
                  {results.some((i) => i._type === "user") && (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between pr-4">
                        <div className="flex items-center gap-3">
                          <h2 className="text-forest-muted text-xs font-bold tracking-[0.2em] uppercase">
                            Personas
                          </h2>
                          <div className="bg-forest-border/20 h-px w-12" />
                        </div>
                        <button
                          onClick={() => setActiveFilter("users")}
                          className="text-forest-accent text-[10px] font-bold tracking-widest uppercase transition-colors hover:text-white"
                        >
                          Ver todas
                        </button>
                      </div>
                      <div className="no-scrollbar -mx-4 flex gap-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
                        {results
                          .filter((item) => item._type === "user")
                          .map((user) => (
                            <div key={user.uuid} className="w-[260px] shrink-0">
                              <UserCard user={user} />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* --- MODO BÚSQUEDA PROFUNDA (GRID) --- */
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {results.map((item) =>
                    item._type === "club" ? (
                      <ClubCard key={item.uuid} club={item} />
                    ) : (
                      <UserCard key={item.uuid} user={item} />
                    ),
                  )}
                </div>
              )}
              
              {/* Sensor de Scroll Infinito para la búsqueda */}
              {hasNextPage && !isLoading && (
                <div className="pt-8">
                  <InfiniteScrollTrigger
                    onTrigger={fetchNextPage}
                    hasMore={hasNextPage}
                    isLoading={isFetchingNextPage}
                  />
                </div>
              )}
            </motion.div>
          ) : searchTerm ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-forest-dark-alt/20 border-forest-border/50 flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center"
            >
              <div className="bg-forest-card border-forest-border/50 mb-4 flex h-16 w-16 items-center justify-center rounded-full border text-2xl">
                🔍
              </div>
              <h3 className="text-lg font-bold text-white">
                No hay coincidencias
              </h3>
              <p className="text-forest-muted mt-1 max-w-xs italic">
                No pudimos encontrar {activeFilter === "all" ? "nada" : activeFilter} relacionado con "{searchTerm}".
              </p>
            </motion.div>
          ) : (
            /* Estado Inicial: Skeletons sutiles mientras el usuario no escribe */
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 opacity-40 grayscale-[0.5]">
               {[...Array(4)].map((_, i) => (
                  <ClubCardSkeleton key={`initial-${i}`} />
               ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
