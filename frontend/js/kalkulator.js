// kalkulator.js — kirim jawaban ke backend dan tampilkan hasil klasifikasi

const KLAS_NOTE = {
  "Desa Mandiri": "Desa Anda berada pada posisi kuat. Fokus berikutnya: menjaga keberlanjutan dan memperluas jangkauan manfaat usaha desa.",
  "Desa Berkembang": "Fondasi desa sudah cukup baik. Prioritaskan penguatan kelembagaan dan diversifikasi sumber daya yang belum optimal.",
  "Desa Berkembang Awal": "Ada beberapa aspek yang masih menjadi tantangan. Pendampingan terarah dapat mempercepat perkembangan desa.",
  "Desa Tertinggal": "Desa membutuhkan intervensi menyeluruh, dimulai dari akses dan infrastruktur dasar sebagai fondasi program lanjutan.",
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calc-form");
  const msg = document.getElementById("calc-msg");
  const resultBox = document.getElementById("result-box");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.className = "form-msg";
    msg.textContent = "";

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch(apiUrl("/api/kalkulator"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        msg.className = "form-msg err";
        msg.textContent = data.error || "Terjadi kesalahan. Silakan periksa kembali isian Anda.";
        return;
      }

      document.getElementById("result-score").textContent = `${data.total_skor}/${data.skor_maksimum}`;
      document.getElementById("result-klas").textContent = data.klasifikasi;
      document.getElementById("result-note").textContent = KLAS_NOTE[data.klasifikasi] || "";
      resultBox.classList.add("show");
      resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      msg.className = "form-msg err";
      msg.textContent = "Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.";
    }
  });
});
