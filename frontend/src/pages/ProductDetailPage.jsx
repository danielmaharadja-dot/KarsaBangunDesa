import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Tag, ShoppingBag } from "lucide-react";
import { getApiUrl } from "../config/api";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(getApiUrl(`/api/products/${slug}`))
      .then((r) => {
        if (!r.ok) throw new Error("Product not found");
        return r.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center text-slate-500 min-h-[60vh] flex items-center justify-center">
        Memuat detail produk...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto text-center space-y-4 px-4">
        <h2 className="text-2xl font-bold text-slate-900">Produk Tidak Ditemukan</h2>
        <p className="text-slate-600 text-sm">Produk atau layanan yang Anda cari tidak tersedia.</p>
        <Link
          to="/produk"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Produk</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 space-y-12">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-[#043327] via-[#059669] to-[#10b981] text-white py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            to="/produk"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Produk</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              {product.kategori}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
              {product.harga}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
            {product.nama}
          </h1>
        </div>
      </section>

      {/* DETAILS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg space-y-8">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-900 mb-3">
              Informasi Deskripsi & Keterangan
            </h2>
            <p className="text-slate-700 leading-relaxed text-base whitespace-pre-line">
              {product.deskripsi}
            </p>
          </div>

          <div className="p-6 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2">
            <div className="font-bold text-slate-900 text-sm">Estimasi Biaya / Penawaran</div>
            <div className="text-2xl font-black font-display text-amber-600">
              {product.harga}
            </div>
            <p className="text-xs text-slate-600">
              *Pemesanan komoditas panen atau kerjasama pendampingan BUMDes dapat disesuaikan dengan volume kebutuhan desa Anda.
            </p>
          </div>

          <div>
            <a
              href={`https://api.whatsapp.com/send?phone=6285770003549&text=Halo%20admin%20Karsa,%20saya%20tertarik%20dengan%20produk/layanan%20${encodeURIComponent(product.nama)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Pesan / Tanya via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
