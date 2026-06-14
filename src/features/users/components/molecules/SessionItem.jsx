"use client";

import React from "react";
import { FiMonitor, FiSmartphone, FiX } from "react-icons/fi";

/**
 * @file SessionItem.jsx
 * @description Molécula para representar una sesión activa.
 *
 * @component SessionItem
 * @param {Object} props
 * @param {Object} props.session - Datos de la sesión.
 * @param {Function} props.onTerminate - Callback para cerrar la sesión.
 */
export default function SessionItem({ session, onTerminate }) {
  return (
    <div className="bg-forest-card border border-forest-border rounded-xl px-4 py-3.5 flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${session.is_current ? "bg-forest-accent/10 text-forest-accent" : "bg-forest-stat text-forest-muted"}`}>
        {session.type === "desktop" ? <FiMonitor size={16} /> : <FiSmartphone size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-forest-light font-semibold text-sm">{session.os} · {session.browser}</span>
          {session.is_current && (
            <span className="px-1.5 py-0.5 bg-forest-accent/15 border border-forest-accent/25 text-forest-accent text-[10px] font-bold rounded uppercase tracking-widest">
              Actual
            </span>
          )}
        </div>
        <p className="text-forest-muted-alt text-xs mt-0.5 truncate">{session.location} · IP: {session.ip}</p>
      </div>
      {!session.is_current && (
        <button
          onClick={() => onTerminate(session.id)}
          className="w-7 h-7 rounded-md bg-forest-stat hover:bg-forest-danger/20 text-forest-muted hover:text-forest-danger flex items-center justify-center transition-colors shrink-0"
          title="Cerrar esta sesión"
        >
          <FiX size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}
