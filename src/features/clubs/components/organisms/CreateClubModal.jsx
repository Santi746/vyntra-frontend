"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";

import ModalOverlay from "@/shared/components/ui/atoms/ModalOverlay";
import ModalShell from "@/shared/components/ui/atoms/ModalShell";
import { CLUB_TYPES } from "@/features/clubs/data/club_types";
import { useMutateCreateClub } from "@/features/clubs/hooks/useMutateCreateClub";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { generateClientUUID } from "@/shared/utils/uuid";
import { useQueryString } from "@/shared/hooks/useQueryString";

// Moléculas extraídas
import ClubIdentityStep from "../molecules/ClubIdentityStep";
import ClubTypeStep from "../molecules/ClubTypeStep";

/**
 * @component CreateClubModal (Organism)
 * @description Modal de creación de club optimizado siguiendo Atomic Design.
 */
export default function CreateClubModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { createQueryString } = useQueryString();
  const isOpen = searchParams.get("create_club") === "true";

  // Estado local del formulario
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [fandomTag, setFandomTag] = useState("");

  const { data: currentUser } = useCurrentUser();
  const createClubMutation = useMutateCreateClub();

  const closeHref = createQueryString("create_club", null);

  const handleClose = useCallback(() => {
    setStep(1);
    setName("");
    setDescription("");
    setLogoFile(null);
    setLogoPreview(null);
    setBannerFile(null);
    setBannerPreview(null);
    setSelectedType(null);
    setFandomTag("");
    router.push(closeHref);
  }, [closeHref, router]);

  const handleFileSelect = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    if (type === "logo") {
      setLogoFile(file);
      setLogoPreview(previewUrl);
    } else {
      setBannerFile(file);
      setBannerPreview(previewUrl);
    }
  };

  const isStep1Valid = name.trim() && description.trim() && logoPreview && bannerPreview;

  const isStep2Valid = useMemo(() => {
    if (!selectedType) return false;
    const type = CLUB_TYPES.find((t) => t.uuid === selectedType);
    if (type?.requiresCustomTag && !fandomTag.trim()) return false;
    return true;
  }, [selectedType, fandomTag]);

  const handleCreateClub = () => {
    if (!isStep2Valid || createClubMutation.isPending) return;

    const type = CLUB_TYPES.find((t) => t.uuid === selectedType);
    const categoryTag = type.requiresCustomTag
      ? `${type.tagPrefix}${fandomTag.trim()}`
      : type.name;

    const client_uuid = generateClientUUID();

    createClubMutation.mutate(
      {
        client_uuid,
        name: name.trim(),
        description: description.trim(),
        category_tag: categoryTag,
        avatar_url: logoPreview,
        banner_url: bannerPreview,
        owner_uuid: currentUser?.uuid,
      },
      { onSuccess: () => handleClose() }
    );
  };

  return (
    <ModalOverlay isOpen={isOpen} onClose={handleClose}>
      <ModalShell className="max-w-3xl">
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-forest-border px-6 py-4">
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-forest-muted transition-colors hover:bg-forest-stat hover:text-forest-light"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <h2 className="text-lg font-bold text-forest-light tracking-tight">
              {step === 1 ? "Crear Club" : "Tipo de Club"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-forest-muted transition-all hover:bg-forest-stat hover:text-forest-light"
          >
            <X size={18} />
          </button>
        </div>

        {/* Contenido animado por paso */}
        <div className="px-6 py-5">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ClubIdentityStep
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                  logoPreview={logoPreview}
                  bannerPreview={bannerPreview}
                  onFileSelect={handleFileSelect}
                  onNext={() => setStep(2)}
                  isValid={isStep1Valid}
                />
              </motion.div>
            ) : (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <ClubTypeStep
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  fandomTag={fandomTag}
                  setFandomTag={setFandomTag}
                  onSubmit={handleCreateClub}
                  isValid={isStep2Valid}
                  isPending={createClubMutation.isPending}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ModalShell>
    </ModalOverlay>
  );
}
