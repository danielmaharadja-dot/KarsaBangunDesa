// common.js — header, logo persis referensi, footer, dan utilitas bersama
const API_BASE = (() => {
  const origin = window.location.origin;
  if (
    window.location.protocol === "file:" ||
    !origin ||
    ((origin.includes("localhost") || origin.includes("127.0.0.1")) &&
      !origin.endsWith(":4000"))
  ) {
    return "http://localhost:4000";
  }
  return origin;
})();

function apiUrl(path) {
  return API_BASE + path;
}

const NAV_LINKS = [
  { href: "index.html", label: "Beranda" },
  { href: "tentang.html", label: "Tentang" },
  { href: "program.html", label: "Program" },
  { href: "produk.html", label: "Produk" },
  { href: "berita.html", label: "Berita" },
  { href: "kontak.html", label: "kontak" },
];

function currentFile() {
  const p = window.location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
}

function renderHeader() {
  const cur = currentFile();
  const links = NAV_LINKS.map(
    (l) =>
      `<a href="${l.href}" class="${l.href === cur ? "active" : ""}">${l.label}</a>`
  ).join("");

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="container">
      <a href="index.html" class="brand">
        <div class="brand-logo-icon">
          <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2 L33 10 V32 L18 40 L3 32 V10 Z" stroke="#ffffff" stroke-width="2.2" fill="none" stroke-linejoin="round"/>
            <path d="M18 10 V31" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M18 14 L10 19" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M18 14 L26 19" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M18 19 L10 24" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M18 19 L26 24" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M18 24 L11 28" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M18 24 L25 28" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="brand-text">
          <span>karsa bangun</span>
          <span>desa</span>
        </div>
      </a>
      <button class="nav-toggle" aria-label="Buka menu">&#9776;</button>
      <nav class="main-nav">
        ${links}
      </nav>
      <div class="nav-cta">
        <a href="https://api.whatsapp.com/send?phone=6285770003549&text=Assalamualaikum%20Wr.Wb.Hallo%20admin%20karsa%20saya%20dari%20website" target="_blank" class="btn btn-amber">Hubungi Kami</a>
      </div>
    </div>
  `;
  document.body.prepend(header);

  header.querySelector(".nav-toggle").addEventListener("click", () => {
    header.querySelector(".main-nav").classList.toggle("open");
  });
}

function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <!-- Col 1: Brand & CTA -->
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
            <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:34px;height:42px;">
              <path d="M18 2 L33 10 V32 L18 40 L3 32 V10 Z" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
              <path d="M18 10 V31" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M18 14 L10 19" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M18 14 L26 19" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M18 19 L10 24" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M18 19 L26 24" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M18 24 L11 28" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M18 24 L25 28" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            <div style="font-family:var(--font-display);font-weight:800;font-size:1.15rem;line-height:1.12;color:#ffffff;">
              <span>karsa</span><br><span>bangun</span><br><span>desa</span>
            </div>
          </div>
          <p style="color:rgba(255,255,255,0.92);font-size:0.9rem;line-height:1.6;margin-bottom:20px;max-width:32ch;">
            Kami siap membantu siapa pun yang berkomitmen untuk memajukan desa dan menciptakan perubahan positif
          </p>
          <a href="https://api.whatsapp.com/send?phone=6285770003549&text=Assalamualaikum%20Wr.Wb.Hallo%20admin%20karsa%20saya%20dari%20website" target="_blank" class="footer-btn-outline">
            HUBUNGI KAMI <span style="font-size:1rem;">➔</span>
          </a>
        </div>

        <!-- Col 2: Layanan Kami -->
        <div>
          <h4>Layanan Kami</h4>
          <ul class="footer-list">
            <li><a href="program.html">• Training</a></li>
            <li><a href="program.html">• Coaching</a></li>
            <li><a href="program.html">• Mentoring</a></li>
            <li><a href="program.html">• Consulting</a></li>
          </ul>
        </div>

        <!-- Col 3: Menu -->
        <div>
          <h4>Menu</h4>
          <ul class="footer-list">
            <li><a href="tentang.html">• Tentang</a></li>
            <li><a href="program.html">• Program</a></li>
            <li><a href="produk.html">• Produk</a></li>
            <li><a href="kontak.html">• Kontak</a></li>
          </ul>
        </div>

        <!-- Col 4: Contact Card -->
        <div>
          <div class="footer-contact-card">
            <p style="font-size:0.86rem;line-height:1.5;color:rgba(255,255,255,0.92);margin-bottom:14px;">
              D'Amerta Residence Blok E6 No. 1 RT 01 RW 16 Bojongsoang, Kab. Bandung 40287
            </p>
            <div style="font-weight:800;font-size:1.05rem;color:#ffffff;margin-bottom:4px;">
              0857 7000 3549
            </div>
            <div style="font-weight:800;font-size:1.05rem;color:#ffffff;margin-bottom:14px;">
              0852 8000 3548
            </div>
            <div style="font-size:0.88rem;color:rgba(255,255,255,0.95);word-break:break-all;">
              karsabangundesa@gmail.com
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div>Copyright &copy; All Right Reserved</div>
        <div class="footer-socials">
          <a href="#" class="footer-social-icon" aria-label="Facebook">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.808V8z"/></svg>
          </a>
          <a href="#" class="footer-social-icon" aria-label="Instagram">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" class="footer-social-icon" aria-label="YouTube">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}

// ---------- System Animasi & Interaksi Smooth ----------
function setupHeaderScroll() {
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    if (window.scrollY > 35) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );

  const targets = document.querySelectorAll(
    ".card, .section-head, .hero .container > *, .detail-row, .team-member, .form-grid"
  );

  targets.forEach((el) => {
    if (
      !el.classList.contains("reveal-init") &&
      !el.classList.contains("reveal-fade-init") &&
      !el.classList.contains("reveal-scale-init")
    ) {
      el.classList.add("reveal-init");
    }

    if (el.classList.contains("card")) {
      const parentGrid = el.parentElement;
      if (parentGrid && parentGrid.classList.contains("grid")) {
        const siblings = Array.from(parentGrid.children);
        const cardIndex = siblings.indexOf(el);
        el.style.transitionDelay = `${(cardIndex % 4) * 0.12}s`;
      }
    }
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  setupHeaderScroll();
  initScrollReveal();
});

