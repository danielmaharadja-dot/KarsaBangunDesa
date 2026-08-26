import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sprout, Compass, Trees, Mountain } from "lucide-react";

const getProgramIcon = (ikon) => {
  switch (ikon) {
    case "sprout":
      return <Sprout className="w-6 h-6 text-emerald-500" />;
    case "leaf":
      return <Trees className="w-6 h-6 text-emerald-500" />;
    case "terrace":
      return <Mountain className="w-6 h-6 text-emerald-500" />;
    default:
      return <Compass className="w-6 h-6 text-emerald-500" />;
  }
};

export default function ProgramCard({ program }) {
  return (
    <div className="bg-white border border-emerald-900/10 hover:border-emerald-500/30 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 relative overflow-hidden">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
            {getProgramIcon(program.ikon)}
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 tracking-wider uppercase">
            Program Karsa
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
          {program.judul}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {program.ringkasan || program.deskripsi}
        </p>
      </div>

      <div>
        <Link
          to={`/program/${program.slug}`}
          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-md group-hover:shadow-emerald-600/30"
        >
          <span>Detail Program</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
