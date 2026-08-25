// main.js — mengisi konten dinamis halaman Beranda dari API backend

const ICONS = {
  terrace: `<svg viewBox="0 0 40 40" fill="none"><path d="M4 30 Q12 24 20 27 Q28 30 36 22" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M4 22 Q12 16 20 19 Q28 22 36 14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" opacity="0.5"/></svg>`,
  sprout: `<svg viewBox="0 0 40 40" fill="none"><path d="M20 34V18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M20 18C20 10 12 8 8 10c0 8 6 10 12 8Z" fill="currentColor" opacity="0.85"/><path d="M20 22c0-6 8-8 12-6 0 7-6 9-12 6Z" fill="currentColor"/></svg>`,
  leaf: `<svg viewBox="0 0 40 40" fill="none"><path d="M10 30C10 16 22 8 32 8c0 12-8 22-22 22Z" fill="currentColor" opacity="0.85"/><path d="M12 28C18 22 24 16 30 10" stroke="var(--paper)" stroke-width="1.6"/></svg>`,
  contour: `<svg viewBox="0 0 40 40" fill="none"><path d="M4 12 Q14 6 20 12 Q26 18 36 12" stroke="currentColor" stroke-width="2.2"/><path d="M4 20 Q14 14 20 20 Q26 26 36 20" stroke="currentColor" stroke-width="2.2" opacity="0.6"/><path d="M4 28 Q14 22 20 28 Q26 34 36 28" stroke="currentColor" stroke-width="2.2" opacity="0.35"/></svg>`,
};

async function loadStats() {
  const el = document.getElementById("stats-container");
  if (!el) return;
  try {
    const res = await fetch(apiUrl("/api/stats"));
    const data = await res.json();
    el.innerHTML = data
      .map(
        (s) =>
          `<div class="card" style="padding:24px 16px;text-align:center;">
             <div style="font-family:var(--font-display);font-size:2.2rem;font-weight:800;color:var(--teal-main);">${s.nilai}</div>
             <div style="font-size:0.88rem;color:var(--ink-soft);font-weight:600;margin-top:4px;">${s.label}</div>
           </div>`
      )
      .join("");
  } catch (e) {
    el.innerHTML = "";
  }
}

async function loadHomePrograms() {
  const el = document.getElementById("home-programs");
  if (!el) return;
  try {
    const res = await fetch(apiUrl("/api/programs"));
    const data = await res.json();
    el.innerHTML = data
      .map((p, i) => {
        const isAmberBtn = (i % 2 === 1);
        const btnStyle = isAmberBtn 
          ? "background:#f5a623;color:#ffffff;padding:10px 22px;border-radius:6px;font-weight:700;font-size:0.88rem;display:inline-block;box-shadow:0 4px 12px rgba(245,166,35,0.3);" 
          : "background:#3ea692;color:#ffffff;padding:10px 22px;border-radius:6px;font-weight:700;font-size:0.88rem;display:inline-block;box-shadow:0 4px 12px rgba(62,166,146,0.3);";
        return `
        <div class="card" style="background:#ffffff;border-radius:24px;padding:36px 28px 44px;box-shadow:0 10px 30px rgba(0,0,0,0.05);position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;border:1px solid rgba(69,188,165,0.18);">
          <div>
            <div style="font-size:0.88rem;color:var(--ink-soft);font-weight:600;margin-bottom:8px;">Program Karsa</div>
            <h3 style="color:#2b7a6d;font-size:1.3rem;font-weight:800;margin-bottom:4px;line-height:1.25;">${p.judul}</h3>
            ${p.subjudul ? `<div style="font-size:0.85rem;color:var(--ink-soft);font-weight:600;margin-bottom:10px;">${p.subjudul}</div>` : ''}
            <p style="font-size:0.9rem;color:var(--ink-soft);line-height:1.65;margin-top:10px;margin-bottom:28px;">${p.ringkasan}</p>
          </div>
          <div>
            <a href="detail-program.html?slug=${p.slug}" style="${btnStyle}">Detail Program</a>
          </div>
          <div style="position:absolute;bottom:12px;right:14px;opacity:0.4;pointer-events:none;">
            <svg width="60" height="22" viewBox="0 0 60 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5C10 1 18 9 26 5C34 1 42 9 50 5" stroke="#ffb6c1" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M2 15C10 11 18 19 26 15C34 11 42 19 50 15" stroke="#ffb6c1" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            <div style="width:4px;height:4px;border-radius:50%;background:#add8e6;margin:3px auto 0;"></div>
          </div>
        </div>`;
      })
      .join("");
  } catch (e) {
    el.innerHTML = "<p>Konten sedang tidak dapat dimuat.</p>";
  }
}

async function loadHomeNews() {
  const el = document.getElementById("home-news");
  if (!el) return;
  try {
    const res = await fetch(apiUrl("/api/berita"));
    const data = await res.json();
    el.innerHTML = data
      .map(
        (b) => `
      <div class="card">
        <div class="tag">${b.kategori || "Berita Desa"}</div>
        <h3 style="font-size:1.1rem;margin-bottom:8px;">${b.judul}</h3>
        <p style="font-size:0.88rem;color:var(--ink-soft);">${b.ringkasan}</p>
        <div style="margin-top:14px;font-size:0.8rem;color:var(--teal-dark);font-weight:600;">📅 ${b.tanggal}</div>
      </div>`
      )
      .join("");
  } catch (e) {
    el.innerHTML = "<p>Berita sedang tidak dapat dimuat.</p>";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    loadStats(),
    loadHomePrograms(),
    loadHomeNews()
  ]);
  if (typeof initScrollReveal === "function") {
    initScrollReveal();
  }
});
