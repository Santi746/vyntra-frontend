import React, { useState, useRef } from "react";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { useMutateUser } from "@/features/users/hooks/useMutateUser";
import { generateClientUUID } from "@/shared/utils/uuid";
import { FiCamera, FiMail, FiUser, FiAtSign } from "react-icons/fi";
import { toast } from "sonner";
import SettingsHeader from "@/shared/components/ui/molecules/SettingsHeader";
import SettingsSection from "@/shared/components/ui/molecules/SettingsSection";
import EditableRow from "@/shared/components/ui/molecules/EditableRow";
import SettingsStickyFooter from "@/shared/components/ui/molecules/SettingsStickyFooter";
import EmailChangeModal from "../../molecules/EmailChangeModal";

/**
 * @component MyAccountSettings
 * @description Sección "Mi cuenta" de los ajustes del usuario.
 * Optimizado para pantallas desde 320px hasta escritorio.
 */
export default function MyAccountSettings() {
  const { data: user, isPending: isLoading } = useCurrentUser();
  const { mutate: updateUser, isPending: isSaving } = useMutateUser();
  
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState({});
  const [previews, setPreviews] = useState({});
  
  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const hasChanges = Object.keys(pendingData).length > 0;

  const handleUpdatePending = (fields) => {
    setPendingData((prev) => ({ ...prev, ...fields }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Generar preview local
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews((prev) => ({ ...prev, [type]: reader.result }));
      handleUpdatePending({ [type === "avatar" ? "avatar_file" : "banner_file"]: file });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateUser({
      client_uuid: generateClientUUID(),
      ...pendingData,
    }, {
      onSuccess: () => {
        toast.success("Perfil actualizado");
        setPendingData({});
        setPreviews({});
      }
    });
  };

  const handleReset = () => {
    setPendingData({});
    setPreviews({});
  };

  if (isLoading) return <div className="animate-pulse h-64 bg-forest-card rounded-xl" />;
  if (!user) return null;

  // Combinar datos reales con pendientes para la UI
  const displayData = {
    ...user,
    ...pendingData,
    banner_url: previews.banner || pendingData.banner_url || user.banner_url,
    avatar_url: previews.avatar || pendingData.avatar_url || user.avatar_url,
    full_name: pendingData.first_name 
      ? `${pendingData.first_name} ${pendingData.last_name || user.last_name}`
      : `${user.first_name} ${user.last_name}`
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <SettingsHeader title="Mi cuenta" />

      <div className="bg-forest-card border border-forest-border rounded-xl overflow-hidden shadow-lg">
        {/* Banner */}
        <div
          className="relative h-20 sm:h-32 w-full bg-forest-stat/50 group cursor-pointer"
          onClick={() => bannerInputRef.current?.click()}
        >
          {displayData.banner_url ? (
            <img src={displayData.banner_url} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-forest-accent/20 to-forest-deep" />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-black/70 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm border border-white/10">
              <FiCamera size={13} />
              <span className="hidden sm:inline">Cambiar Banner</span>
            </div>
          </div>
          <input 
            ref={bannerInputRef} 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => handleFileChange(e, "banner")}
          />
        </div>

        {/* Profile Card */}
        <div className="px-3 sm:px-6 pb-5">
          <div className="relative h-6 sm:h-10">
            <div className="absolute -top-10 sm:-top-12 left-1">
              <div
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-forest-card bg-forest-deep overflow-hidden cursor-pointer group shadow-xl"
                onClick={() => avatarInputRef.current?.click()}
              >
                <img src={displayData.avatar_url} alt={displayData.display_name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FiCamera size={16} className="text-white" />
                </div>
              </div>
              <span className={`absolute bottom-0.5 right-0.5 w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 border-3 border-forest-card rounded-full ${user.is_online ? "bg-forest-accent" : "bg-forest-muted"}`} />
              <input 
                ref={avatarInputRef} 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => handleFileChange(e, "avatar")}
              />
            </div>
          </div>

          <div className="bg-forest-deep/60 border border-forest-border/40 rounded-xl px-3 sm:px-4 mt-2 overflow-hidden">
            <EditableRow
              label="Nombre"
              icon={<FiUser size={11} />}
              value={displayData.full_name}
              onSave={(val) => {
                // Split inteligente: primer espacio es el corte
                const parts = val.trim().split(/\s+/);
                const first = parts[0] || "";
                const last = parts.slice(1).join(" ") || "";
                handleUpdatePending({ first_name: first, last_name: last });
              }}
            />
            <EditableRow
              label="Usuario"
              icon={<FiAtSign size={11} />}
              value={`@${pendingData.username || user.username}`}
              readonlySuffix={user.category_tag}
              onSave={(val) => handleUpdatePending({ username: val.replace(/^@/, "") })}
            />
            <div className="flex items-start sm:items-center justify-between py-3.5 gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <FiMail size={11} className="text-forest-muted shrink-0" />
                  <p className="text-forest-muted text-[10px] font-bold uppercase tracking-widest">Correo</p>
                </div>
                <p className="text-forest-light text-[13px] sm:text-sm font-medium truncate">
                  {user.email ? user.email.replace(/(.{3})(.*)(?=@)/, "$1••••") : "••••••••••••@gmail.com"}
                </p>
              </div>
              <button
                onClick={() => setEmailModalOpen(true)}
                className="shrink-0 text-[11px] font-semibold text-forest-muted hover:text-forest-light bg-forest-stat hover:bg-forest-border border border-forest-border/60 rounded-md px-2.5 py-1.5 transition-colors mt-1 sm:mt-0"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>

      <EmailChangeModal isOpen={emailModalOpen} onClose={() => setEmailModalOpen(false)} />
      
      <SettingsStickyFooter 
        show={hasChanges} 
        onSave={handleSave} 
        onReset={handleReset}
        isSaving={isSaving}
      />
    </div>
  );
}

