import React from "react";
import { UserCheck } from "lucide-react";

export default function TeamCard({ member }) {
  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl shadow-md transition-all duration-300 flex items-center gap-4 group">
      <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shrink-0">
        <UserCheck className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-white text-base truncate group-hover:text-emerald-400 transition-colors">
          {member.nama}
        </h4>
        <p className="text-xs text-slate-400 font-medium truncate">
          {member.jabatan}
        </p>
        {member.divisi && (
          <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/40">
            Divisi {member.divisi}
          </span>
        )}
      </div>
    </div>
  );
}
