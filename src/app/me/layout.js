"use client";

import DMTemplate from "@/features/chat/components/templates/DMTemplate";
import UserModal from "@/features/users/components/organisms/UserModal";
import ClubPreviewModal from "@/features/clubs/components/organisms/ClubPreviewModal";
import { Suspense } from "react";

/**
 * Layout para la sección de Mensajes Directos.
 * Envuelve todas las páginas de /me con el DMTemplate
 * y los modales globales necesarios.
 *
 * @component DMLayout
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la página.
 * @returns {React.ReactElement}
 */
export default function DMLayout({ children }) {
  return (
    <Suspense fallback={null}>
      <DMTemplate>
        {children}
      </DMTemplate>
      <UserModal />
      <ClubPreviewModal />
    </Suspense>
  );
}
