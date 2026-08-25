// kontak.js — kirim formulir kontak ke backend

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const msg = document.getElementById("contact-msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.className = "form-msg";
    msg.textContent = "";

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        msg.className = "form-msg err";
        msg.textContent = data.error || "Terjadi kesalahan. Silakan coba lagi.";
        return;
      }

      msg.className = "form-msg ok";
      msg.textContent = "Terima kasih! Pesan Anda sudah kami terima dan akan segera ditindaklanjuti.";
      form.reset();
    } catch (err) {
      msg.className = "form-msg err";
      msg.textContent = "Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.";
    }
  });
});
