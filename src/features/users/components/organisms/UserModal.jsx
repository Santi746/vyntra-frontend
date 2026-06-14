"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiCalendar,
  FiMessageSquare,
  FiUserPlus,
  FiX,
  FiSettings,
} from "react-icons/fi";

import useBreakpointValue from "@/shared/hooks/useBreakpointValue";
import Badge from "@/shared/components/ui/atoms/Badge";
import Button from "@/shared/components/ui/atoms/Button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/features/users/hooks/useUser";
import { useUserClubs } from "@/features/clubs/hooks/useUserClubs";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useFriends } from "@/features/chat/hooks/useFriends";
import Link from "next/link";
import { createPortal } from "react-dom";

/**
 * @component UserModal
 * @description Modal de inspección de perfil de usuario estilo "Quick View".
 */
export default function UserModal() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const userId = searchParams.get("user");

  // Log de depuración para confirmar que el componente se entera del cambio de URL
  useEffect(() => {
    if (userId) {
      console.log("🚀 [UserModal] Detectado ID de usuario en URL:", userId);
    }
  }, [userId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeHref = (() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("user");
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  })();

  const buildPreviewHref = (clubUuid) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("preview", clubUuid);
    params.delete("user");
    return `${pathname}?${params.toString()}`;
  };

  const maxClubsVisible = useBreakpointValue([{ maxWidth: 375, value: 2 }], 3);
  const { data: user, isLoading: isUserLoading } = useUser(userId);
  const { data: currentUser } = useCurrentUser();

  const isCurrentUser = user?.uuid === currentUser?.uuid;

  const { data: userClubs } = useUserClubs(isCurrentUser ? null : user?.uuid, isCurrentUser ? null : user?.club_uuids);
  const { data: friendsData } = useFriends();

  const friends = friendsData?.pages?.[0]?.data || [];

  useEffect(() => {
    if (userId) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [userId]);

  if (!mounted) return null;

  const resolvedClubs = (userClubs || []).map((club) => {
    return { uuid: club.uuid, name: club.name, logo: club.avatar_url };
  });

  return createPortal(
    <AnimatePresence mode="wait">
      {userId && (
        <motion.div
          key="user-modal-overlay"
          className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:py-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ zIndex: 999999 }} // NIVEL NUCLEAR
        >
          <motion.div
            key="user-modal-content"
            role="dialog"
            aria-modal="true"
            className="bg-forest-dark border-forest-border shadow-[0_0_50px_rgba(0,0,0,0.5)] my-auto w-full max-w-2xl overflow-hidden rounded-2xl border"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {isUserLoading ? (
              /* ── ESTADO DE CARGA ── */
              <div className="flex flex-col items-center justify-center h-[400px] gap-4 bg-forest-dark">
                <div className="w-12 h-12 border-4 border-forest-accent border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(0,255,128,0.2)]" />
                <p className="text-forest-muted text-sm font-bold animate-pulse tracking-widest uppercase">
                  Recuperando Perfil...
                </p>
              </div>
            ) : !user ? (
              /* ── ERROR (USUARIO NO ENCONTRADO) ── */
              <div className="flex flex-col items-center justify-center h-[300px] p-8 text-center bg-forest-dark">
                <p className="text-forest-danger font-bold text-lg mb-2">Error de Sincronización</p>
                <p className="text-forest-muted text-sm mb-6">El usuario solicitado no existe en la base de datos local.</p>
                <Link href={closeHref} scroll={false}>
                  <Button variant="custom" className="bg-forest-stat px-6 py-2 rounded-lg text-forest-light">Cerrar</Button>
                </Link>
              </div>
            ) : (
              /* ── CONTENIDO DEL PERFIL ── */
              <>
                {/* Banner Header */}
                <div className="relative h-28 w-full overflow-hidden bg-forest-stat/20">
                  <img
                    src={user.banner_url || "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&h=200&fit=crop"}
                    alt="Banner"
                    className="h-full w-full object-cover"
                  />
                  <div className="to-forest-deep/90 absolute inset-0 bg-linear-to-b from-transparent" />
                  <Link href={closeHref} scroll={false}>
                    <button className="text-forest-muted absolute top-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-md transition-all hover:bg-black/80 hover:text-white">
                      <FiX size={18} />
                    </button>
                  </Link>
                </div>

                {/* Avatar */}
                <div className="relative -mt-10 px-5">
                  <div className="relative h-20 w-20">
                    <div className="border-forest-deep bg-forest-card h-full w-full overflow-hidden rounded-full border-4 shadow-xl">
                      <img src={user.avatar_url} alt={user.display_name} className="h-full w-full object-cover" />
                    </div>
                    <span className={`border-forest-deep absolute right-1 bottom-1 h-5 w-5 rounded-full border-3 ${user.is_online ? "bg-forest-accent" : "bg-forest-muted"}`} />
                  </div>
                </div>

                <div className="flex flex-col gap-4 px-6 pt-4 pb-8">
                  <div>
                    <h2 className="text-forest-light text-xl font-bold tracking-tight">{user.display_name}</h2>
                    <p className="text-forest-muted text-sm font-medium">{user.handle}</p>
                  </div>

                  <p className="text-forest-muted-alt text-sm leading-relaxed max-w-lg">
                    {user.bio || "Este usuario prefiere mantener su biografía en secreto. 🤫"}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="custom" className="bg-forest-stat/50 text-forest-muted flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-forest-border/30 text-xs">
                      <FiMapPin size={14} className="text-forest-accent" />
                      {user.location || "Planeta Tierra"}
                    </Badge>
                    <Badge variant="custom" className="bg-forest-stat/50 text-forest-muted flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-forest-border/30 text-xs">
                      <FiCalendar size={14} className="text-forest-accent" />
                      {user.joined_date}
                    </Badge>
                  </div>

                  <div className="bg-forest-border/40 h-px w-full my-1" />

                  {/* Condicional: Amigos (Self) o Clubes Compartidos (Others) */}
                  {isCurrentUser ? (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-forest-muted text-[11px] font-bold tracking-widest uppercase">Tus Amigos ({friends.length})</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        {friends.slice(0, 6).map((friend) => (
                          <Link key={friend.uuid} href={`?user=${friend.uuid}`} scroll={false} className="relative group">
                            <img src={friend.avatar_url} className="h-8 w-8 rounded-full border-2 border-forest-dark object-cover group-hover:border-forest-accent transition-all" alt={friend.display_name} title={friend.display_name} />
                            {friend.is_online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-forest-accent rounded-full border-2 border-forest-dark" />}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-forest-muted text-[11px] font-bold tracking-widest uppercase">Clubes en común</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        {resolvedClubs.slice(0, 4).map((club) => (
                          <Link key={club.uuid} href={buildPreviewHref(club.uuid)} scroll={false} className="bg-forest-stat/40 border border-forest-border/40 hover:border-forest-accent/40 flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all">
                            <img src={club.logo} className="h-5 w-5 rounded-full object-cover" alt="" />
                            <span className="text-forest-light text-xs font-semibold">{club.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-4">
                    {isCurrentUser ? (
                      <Link href="?settings=user" scroll={false} className="w-full">
                        <Button variant="custom" className="bg-forest-stat border border-forest-border hover:border-forest-accent/50 hover:text-forest-accent text-forest-light w-full py-3 rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2">
                          <FiSettings size={18} />
                          Configuración
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Button variant="custom" className="bg-forest-accent hover:bg-forest-accent-mid flex-1 py-3 rounded-xl text-black font-bold text-sm shadow-lg shadow-forest-accent/10">Enviar mensaje</Button>
                        <Button variant="custom" className="bg-forest-stat border border-forest-border hover:border-forest-accent/50 text-forest-light flex-1 py-3 rounded-xl font-bold text-sm transition-all">Añadir amigo</Button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
