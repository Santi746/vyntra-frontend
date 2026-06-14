import React, { useState } from "react";
import SettingsButton from "@/shared/components/ui/atoms/SettingsButton";
import { useMutateUser } from "@/features/users/hooks/useMutateUser";
import { useSessions } from "@/features/users/hooks/useSessions";
import { generateClientUUID } from "@/shared/utils/uuid";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { FiShield, FiAlertTriangle, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import SettingsHeader from "@/shared/components/ui/molecules/SettingsHeader";
import SettingsSection from "@/shared/components/ui/molecules/SettingsSection";
import SessionItem from "../../molecules/SessionItem";

const STRENGTH_LABELS = ["", "Débil", "Regular", "Fuerte"];

/**
 * Calcula la fortaleza de una contraseña basándose en complejidad.
 * @param {string} val - Contraseña a evaluar.
 * @returns {number} 0-3.
 */
function calcStrength(val) {
  if (!val) return 0;
  let s = 1;
  if (/[A-Z]/.test(val) && /[0-9]/.test(val)) s = 2;
  if (s === 2 && /[^A-Za-z0-9]/.test(val) && val.length >= 8) s = 3;
  return s;
}

import { useSearchParams } from "next/navigation";
import SettingsStickyFooter from "@/shared/components/ui/molecules/SettingsStickyFooter";

export default function SecuritySettings() {
  const { data: user } = useCurrentUser();
  const { data: sessions, isLoading: sessionsLoading } = useSessions();
  
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate: updateUser, isPending } = useMutateUser();

  const strength = calcStrength(newPw);
  const canSubmitPw = currentPw.length >= 4 && newPw.length >= 8 && confirmPw === newPw;
  const hasChanges = currentPw.length > 0 || newPw.length > 0 || confirmPw.length > 0;

  const handleUpdatePassword = () => {
    if (!canSubmitPw) return;
    updateUser({
      client_uuid: generateClientUUID(),
      current_password: currentPw,
      new_password: newPw
    }, {
      onSuccess: () => {
        toast.success("Contraseña actualizada correctamente");
        setCurrentPw(""); setNewPw(""); setConfirmPw("");
      }
    });
  };

  const handleReset = () => {
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
  };

  const handleResendEmail = () => {
    setCooldown(60);
    const iv = setInterval(() => {
      setCooldown((p) => { if (p <= 1) { clearInterval(iv); return 0; } return p - 1; });
    }, 1000);
    toast.info("Correo de verificación enviado");
  };

  const handleDeleteAccount = () => {
    toast.error("Funcionalidad de borrado no implementada en el simulador");
    setConfirmDelete(false);
  };

  const closeSession = (id) => {
    toast.success("Solicitud de cierre enviada");
  };

  const inputStyles = "bg-forest-deep border border-forest-border focus:border-forest-accent/50 rounded-lg px-3 py-2.5 text-forest-light text-sm outline-none transition-colors autofill:shadow-[0_0_0_30px_#0a0f0a_inset] autofill:text-forest-light";

  return (
    <div className="flex flex-col gap-10 pb-20">
      <SettingsHeader 
        title="Seguridad" 
        description="Administra tu contraseña y la integridad de tu cuenta." 
      />

      {/* ── Estado de verificación ── */}
      <div className="bg-forest-card border border-forest-border rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-forest-stat flex items-center justify-center text-forest-accent shrink-0">
            <FiShield size={18} />
          </div>
          <div>
            <p className="text-forest-light font-semibold text-sm">Estado de la cuenta</p>
            {user?.email_verified_at ? (
              <span className="inline-block mt-0.5 px-2 py-0.5 bg-forest-accent/10 border border-forest-accent/20 text-forest-accent text-[11px] font-bold rounded uppercase tracking-wide">
                Cuenta Verificada
              </span>
            ) : (
              <span className="inline-block mt-0.5 px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[11px] font-bold rounded uppercase tracking-wide">
                Verificación pendiente
              </span>
            )}
          </div>
        </div>
        {!user?.email_verified_at && (
          <SettingsButton
            variant="secondary"
            onClick={handleResendEmail}
            disabled={cooldown > 0}
            className="border border-forest-border bg-forest-stat/50 px-4!"
          >
            {cooldown > 0 ? `Reenviar en ${cooldown}s` : "Reenviar correo"}
          </SettingsButton>
        )}
      </div>

      <div className="bg-forest-border/30 h-px w-full" />

      {/* ── Cambiar contraseña ── */}
      <SettingsSection title="Cambiar contraseña">
        <div className="bg-forest-card border border-forest-border rounded-xl p-5 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-forest-muted text-[11px] font-bold uppercase tracking-widest">Contraseña actual</label>
            <input type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="••••••••" className={inputStyles} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-forest-muted text-[11px] font-bold uppercase tracking-widest">Nueva contraseña</label>
            <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Mínimo 8 caracteres" className={inputStyles} />
            {newPw.length > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-1 flex-1 h-1">
                  <div className={`h-full flex-1 rounded-full transition-colors duration-300 ${strength >= 1 ? "bg-red-500" : "bg-forest-border"}`} />
                  <div className={`h-full flex-1 rounded-full transition-colors duration-300 ${strength >= 2 ? "bg-yellow-500" : "bg-forest-border"}`} />
                  <div className={`h-full flex-1 rounded-full transition-colors duration-300 ${strength >= 3 ? "bg-forest-accent" : "bg-forest-border"}`} />
                </div>
                <span className="text-[11px] font-semibold text-forest-muted-alt w-12 text-right">{STRENGTH_LABELS[strength]}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-forest-muted text-[11px] font-bold uppercase tracking-widest">Confirmar contraseña</label>
            <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Repite la contraseña" className={inputStyles} />
          </div>
        </div>
      </SettingsSection>

      <div className="bg-forest-border/30 h-px w-full" />

      {/* ── Sesiones activas ── */}
      <SettingsSection 
        title="Sesiones activas" 
        description="Dispositivos donde has iniciado sesión recientemente."
      >
        <div className="flex flex-col gap-2">
          {sessionsLoading ? (
            <div className="animate-pulse h-20 bg-forest-card rounded-xl" />
          ) : (
            sessions?.map((session) => (
              <SessionItem key={session.uuid} session={session} onTerminate={closeSession} />
            ))
          )}
        </div>
      </SettingsSection>

      <div className="bg-forest-border/30 h-px w-full" />

      {/* ── Zona de peligro ── */}
      <div className="border border-forest-danger/20 bg-forest-danger/5 rounded-xl p-5">
        <div className="flex items-start gap-2 mb-3">
          <FiAlertTriangle size={15} className="text-forest-danger mt-0.5 shrink-0" />
          <div>
            <h3 className="text-forest-danger font-bold text-sm">Zona de peligro</h3>
            <p className="text-forest-muted text-xs mt-0.5 leading-relaxed">
              Estas acciones son permanentes. Procede con extrema precaución.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-forest-danger/10 gap-3">
          <div className="min-w-0">
            <p className="text-forest-light text-sm font-medium">Desactivar cuenta</p>
            <p className="text-forest-muted text-xs mt-0.5">Podrás reactivarla iniciando sesión de nuevo.</p>
          </div>
          <SettingsButton variant="secondary" className="border border-forest-border/40 hover:border-forest-muted px-3! py-1.5! h-auto">
            Desactivar
          </SettingsButton>
        </div>

        <div className="flex items-center justify-between pt-3 gap-3">
          <div className="min-w-0">
            <p className="text-forest-light text-sm font-medium">Eliminar cuenta</p>
            <p className="text-forest-muted text-xs mt-0.5">Borrado irreversible de todos tus datos.</p>
          </div>
          {!confirmDelete ? (
            <SettingsButton variant="danger" onClick={() => setConfirmDelete(true)} className="px-3! py-1.5! h-auto">
              Eliminar
            </SettingsButton>
          ) : (
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-forest-danger text-[11px] font-bold uppercase">¿Confirmas?</span>
              <button 
                onClick={handleDeleteAccount}
                className="text-[11px] font-bold text-white bg-forest-danger hover:bg-red-700 rounded-md px-3 py-1.5 transition-colors"
              >
                Sí
              </button>
              <button onClick={() => setConfirmDelete(false)} className="text-[11px] font-semibold text-forest-muted hover:text-forest-light bg-forest-stat rounded-md px-3 py-1.5 transition-colors">No</button>
            </div>
          )}
        </div>
      </div>

      <SettingsStickyFooter 
        show={hasChanges} 
        onSave={handleUpdatePassword} 
        onReset={handleReset}
        isSaving={isPending}
        message={!canSubmitPw && hasChanges ? "Contraseña no válida o no coincidente." : "Tienes cambios sin guardar en tu contraseña."}
      />
    </div>
  );
}

