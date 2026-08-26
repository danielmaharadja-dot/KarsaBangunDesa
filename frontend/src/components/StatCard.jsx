import React from "react";

export default function StatCard({ label, nilai, icon }) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 p-6 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl lg:text-4xl font-extrabold font-display text-white tracking-tight group-hover:text-emerald-400 transition-colors">
          {nilai}
        </span>
        {icon && <div className="text-2xl p-2 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">{icon}</div>}
      </div>
      <p className="text-sm text-slate-400 font-medium tracking-wide leading-snug">
        {label}
      </p>
    </div>
  );
}
