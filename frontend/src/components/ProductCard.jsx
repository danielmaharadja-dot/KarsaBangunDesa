import React from "react";
import { Link } from "react-router-dom";
import { Tag, ArrowUpRight, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white border border-slate-200 hover:border-amber-500/40 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Tag className="w-3 h-3" />
            {product.kategori}
          </span>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            {product.harga}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
          {product.nama}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {product.deskripsi}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
        <Link
          to={`/produk/${product.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-medium text-xs uppercase tracking-wider transition-colors duration-300"
        >
          <span>Detail Produk</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        <a
          href={`https://api.whatsapp.com/send?phone=6285770003549&text=Halo%20admin%20Karsa,%20saya%20tertarik%20dengan%20produk/layanan%20${encodeURIComponent(product.nama)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
          title="Tanyakan via WhatsApp"
        >
          <ShoppingBag className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
