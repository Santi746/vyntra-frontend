"use client";

import Sidebar from "@/features/clubs/components/organisms/Sidebar";
import SidebarClub from "@/features/clubs/components/organisms/SidebarClub";
import CreateClubModal from "@/features/clubs/components/organisms/CreateClubModal";
import NotificationModalTemplate from "@/features/notifications/components/templates/NotificationModalTemplate";
import { useNavigation } from "@/shared/context/NavigationContext";
import useMobileDetector from "@/shared/hooks/mobileDetector";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQueryString } from "@/shared/hooks/useQueryString";
import { useSettingsStore } from "@/features/settings/stores/useSettingsStore";

import UserSettingsTemplate from "@/features/users/components/templates/UserSettingsTemplate";

/**
 * Plantilla maestra que integra tanto el Sidebar de iconos como el Sidebar de Clubes.
 * Gestiona el layout global y el desplazamiento del contenido principal cuando se expanden/contraen los paneles.
 * Detecta la ruta actual para renderizar el sidebar apropiado:
 * - `/me/*`: No renderiza SidebarClub (el DMTemplate maneja su propio sidebar).
 * - Otras rutas: Comportamiento original con SidebarClub.
 *
 * @component SidebarTemplate
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - El contenido principal de la página.
 */
export default function SidebarTemplate({ children }) {
  const { isClubOpen } = useNavigation();
  const isMobile = useMobileDetector();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { createQueryString } = useQueryString();
  const pathname = usePathname();
  const { clubSidebarLayout } = useSettingsStore();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  // ── Detección de ruta de Mensajes Directos ──
  const isDMRoute = pathname.startsWith("/me");
  const isInDMChat = isDMRoute && pathname.split("/").filter(Boolean).length > 1; // e.g. ['me', '1234']

  const isNotificationsOpen = searchParams.get("notifications") === "true";

  const closeNotifications = () => {
    const url = createQueryString("notifications", null);
    router.replace(url, { scroll: false });
  };

  if (isAuthPage) return <>{children}</>;

  // En la ruta de MD, el sidebar de clubs no se muestra.
  // El padding solo considera el sidebar de iconos principal (80px en desktop).
  const showClubSidebar = isClubOpen && !isDMRoute;

  // En móvil el sidebar no desplaza el contenido hacia la derecha (está abajo o se superpone)
  // En desktop, el sidebar base mide 80px y el de clubes expandido 78px adicionales.
  const desktopPaddingLeft = showClubSidebar ? "158px" : "80px";

  // En móvil, si el club está abierto, necesitamos más padding inferior para no tapar el contenido
  // pb-24 = 96px base. SidebarClub mide 70px. Total = 166px.
  // [NOTA DE ARQUITECTURA]: Esto podría cambiar si el usuario elige layout vertical en móviles.
  const isVerticalMobile = isMobile && clubSidebarLayout === "vertical";

  // Si estamos en un chat de DM en móvil, ocultamos el padding inferior por completo
  // para que el chat ocupe el 100% de la pantalla y el teclado no rompa el input.
  const hideMobileSidebar = isMobile && isInDMChat;
  let mobilePaddingBottom = "96px";
  if (hideMobileSidebar) {
    mobilePaddingBottom = "0px";
  } else if (showClubSidebar && !isVerticalMobile) {
    mobilePaddingBottom = "166px";
  }

  // En móvil vertical, el sidebar está a la izquierda (ocupa 70px aprox).
  const mobilePaddingLeft = showClubSidebar && isVerticalMobile ? "70px" : "0px";

  return (
    <>
      {/* Sidebar de Iconos (Siempre presente a menos que estemos en un chat DM en móvil) */}
      {!hideMobileSidebar && (
        <aside className="sidebar">
          <Sidebar isMobile={isMobile} />
        </aside>
      )}

      {/* Sidebar de Clubes (Solo cuando NO estamos en MD) */}
      {!isDMRoute && (
        <SidebarClub isClubOpen={isClubOpen} isMobile={isMobile} clubSidebarLayout={clubSidebarLayout} />
      )}

      {/* 
        Main Content Layout:
        - md:pl-20 asegura el espacio base en desktop vía Tailwind.
        - 'style' sobreescribe o añade el padding dinámico.
      */}
      <main
        className="bg-forest-card ease-out-expo h-dvh flex flex-col overflow-y-auto overflow-x-hidden transition-all duration-400 md:pb-0 md:pl-20"
        style={{
          paddingLeft: !isMobile ? desktopPaddingLeft : mobilePaddingLeft,
          paddingBottom: isMobile ? mobilePaddingBottom : "0px",
        }}
      >
        {children}
      </main>

      {/* Modales Globales */}
      <CreateClubModal />
      <UserSettingsTemplate />
      {isNotificationsOpen && (
        <NotificationModalTemplate onClose={closeNotifications} />
      )}
    </>
  );
}
