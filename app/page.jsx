"use client";

import { useEffect, useState } from "react";

const experiences = [
  {
    period: "2025",
    role: "Intern Programmer",
    company: "Akun.tech",
    detail:
      "Berkontribusi dalam tim pengembangan aplikasi web di bawah bimbingan mentor untuk menyelesaikan proyek klien.",
    type: "Teknologi",
    photos: ["/assets/img/intern.jpeg"],
  },
  {
    period: "2024",
    role: "Sales Associate",
    company: "Matahari Department Store",
    detail:
      "Mengelola interaksi langsung dengan pelanggan, dengan fokus pada pencapaian target penjualan dan kepuasan pelanggan.",
    type: "Ritel",
    photos: ["/assets/img/sales.jpeg"],
  },
  {
    period: "2021 — 2022",
    role: "Frontliner",
    company: "MM Group",
    detail:
      "Melayani konsultasi produk, penjualan, serta penanganan keluhan pelanggan terkait perangkat mobile.",
    type: "Layanan",
    photos: ["/assets/img/frontliner.jpeg"],
  },
];

const projects = [
  {
    number: "01",
    title: "Rekomendasi Coffee Shop",
    category: "WEB APPLICATION",
    description:
      "Aplikasi rekomendasi coffee shop di Surakarta berdasarkan preferensi pengguna, dilengkapi pemetaan lokasi, kategori fasilitas, dan ulasan.",
    image: "/assets/img/kopi.png",
    link: "https://jiro.pythonanywhere.com",
    accent: "lavender",
  },
  {
    number: "02",
    title: "Website Billing PS",
    category: "MANAGEMENT SYSTEM",
    description:
      "Sistem manajemen rental PlayStation dengan pencatatan sewa real-time, kalkulasi tarif, laporan pendapatan, dan inventaris konsol.",
    image: "/assets/img/biling.png",
    link: "https://github.com/mrribut/biling-ps.git",
    accent: "lime",
  },
  {
    number: "03",
    title: "Aplikasi Pemilu",
    category: "E-VOTING PLATFORM",
    description:
      "Platform e-voting untuk membantu digitalisasi proses pemilihan ketua RT dan RW secara aman dan transparan.",
    image: "/assets/img/pemilu.png",
    link: "https://github.com/mrribut/Apk-Pemilu.git",
    accent: "peach",
  },
];

const skills = ["HTML5", "CSS3", "JavaScript", "PHP", "Laravel", "React", "MySQL", "Canva", "CapCut", "Microsoft Office"];

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/sahrul-ageng-prasetyo-8a9606367" },
  { label: "GitHub", href: "https://github.com/mrribut" },
  { label: "Instagram", href: "https://instagram.com/aaarrul_" },
  { label: "TikTok", href: "https://tiktok.com/@shrlap_" },
  { label: "YouTube", href: "https://youtube.com/@sahrulagengp" },
];

const navItems = [
  ["Profil", "about"],
  ["Pengalaman", "experience"],
  ["Karya", "work"],
  ["Keahlian", "skills"],
  ["Kontak", "contact"],
];

export default function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeExperience, setActiveExperience] = useState(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    if (saved === "dark") setDark(true);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      }),
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    window.localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (!activeExperience) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActiveExperience(null);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeExperience]);

  function sendMessage(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Pesan portofolio dari ${form.get("name")}`);
    const body = encodeURIComponent(`${form.get("message")}\n\nBalas ke: ${form.get("email")}`);
    window.location.href = `mailto:sahrulap66@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand-name" href="#home">Sahrul Ageng Prasetyo</a>
        <nav className={menuOpen ? "navigation open" : "navigation"} aria-label="Navigasi utama">
          {navItems.map(([label, id]) => (
            <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="theme-button" type="button" onClick={() => setDark((value) => !value)} aria-label={dark ? "Gunakan tema terang" : "Gunakan tema gelap"}>
            {dark ? "☼" : "☾"}
          </button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={menuOpen ? "Tutup menu" : "Buka menu"}>
            <span /><span />
          </button>
        </div>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <h1 className="hero-title">Membangun<br /><span className="hero-highlight">solusi web</span><br />yang berguna<span className="title-period">.</span></h1>
          <p className="hero-intro">Halo, saya <strong>Sahrul Ageng Prasetyo</strong>, lulusan Teknik Informatika yang berfokus pada pengembangan sistem berbasis web.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="/CV.pdf" target="_blank" rel="noreferrer">Lihat CV <span>&#8599;</span></a>
          </div>
        </div>
        <div className="hero-portrait-wrap">
          <div className="portrait-galaxy" aria-hidden="true">
            <span className="galaxy-core" />
            <span className="galaxy-arm galaxy-arm-one" />
            <span className="galaxy-arm galaxy-arm-two" />
            <span className="galaxy-stars" />
          </div>
          <div className="portrait-backdrop" />
          <div className="portrait-frame"><img src="/assets/img/sahrul.jpeg" alt="Sahrul Ageng Prasetyo" /><span className="portrait-glint" aria-hidden="true" /></div>
          <span className="portrait-caption-chip" aria-hidden="true"><i /> IT ENTHUSIAST</span>
        </div>
      </section>

      <section className="about section-shell section-pad" id="about">
        <div className="section-label reveal"> TENTANG SAYA</div>
        <div className="about-content reveal">
          <h2>Teknik, layanan, dan <span className="serif-word">pengalaman pengguna.</span></h2>
          <div className="about-detail">
            <p>Memiliki latar belakang pendidikan di bidang Teknik Informatika dengan pemahaman dalam pengembangan perangkat lunak, khususnya aplikasi berbasis web, serta pengalaman praktis melalui program magang di perusahaan pengembangan perangkat lunak. Didukung kemampuan berpikir analitis, pemecahan masalah, komunikasi, dan adaptasi yang baik, serta pengalaman kerja di bidang pelayanan pelanggan dan ritel.</p>
            <p>Saya ingin terus berkembang dan berkontribusi dalam tim yang membangun produk digital dengan perhatian pada fungsi dan pengalaman penggunanya.</p>
            <a className="text-link dark-link" href="mailto:sahrulap66@gmail.com">Hubungi saya <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="experience section-shell section-pad" id="experience">
        <div className="section-heading reveal"><div className="section-label"> PENGALAMAN</div><h2>Pengalaman kerja.</h2></div>
        <div className="timeline">
          {experiences.map((item, index) => (
            <article className="timeline-item reveal" role="button" tabIndex={0} key={item.role} style={{ "--delay": `${index * 100}ms` }} onClick={() => setActiveExperience(item)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveExperience(item); } }} aria-label={`Lihat bukti foto pengalaman ${item.role} di ${item.company}`}>
              <span className="timeline-dot" />
              <span className="timeline-period">{item.period}</span>
              <div className="timeline-main"><p className="eyebrow">{item.type}</p><h3>{item.role}</h3><p className="timeline-company">{item.company}</p></div>
              <p className="timeline-detail">{item.detail}</p>
              <span className="timeline-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      {activeExperience && (
        <div className="lightbox" role="presentation" onClick={() => setActiveExperience(null)}>
          <section className="lightbox-panel experience-gallery" role="dialog" aria-modal="true" aria-label={`Bukti foto ${activeExperience.role}`} onClick={(event) => event.stopPropagation()}>
            <button className="lightbox-close" type="button" onClick={() => setActiveExperience(null)} aria-label="Tutup galeri">×</button>
            <h3>{activeExperience.role} <span>· {activeExperience.company}</span></h3>
            <div className="experience-photo-grid">
              {activeExperience.photos.map((photo, index) => <img key={photo} src={photo} alt={`Bukti ${activeExperience.role} ${index + 1}`} onError={(event) => event.currentTarget.remove()} />)}
            </div>
          </section>
        </div>
      )}

      <section className="work section-shell section-pad" id="work">
        <div className="section-heading work-heading reveal"><div><div className="section-label">KARYA</div><h2>Hal yang pernah<br /><span className="serif-word">saya bangun.</span></h2></div></div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.accent} reveal`} key={project.number}>
              <a className="project-image" href={project.link} target="_blank" rel="noreferrer" aria-label={`Buka ${project.title}`}>
                <img src={project.image} alt={`Tampilan ${project.title}`} loading="lazy" />
                <span className="project-image-arrow">↗</span>
              </a>
              <div className="project-info"><div className="project-meta"><span>{project.number}</span><span>{project.category}</span></div><h3>{project.title}</h3><p>{project.description}</p><a className="project-link" href={project.link} target="_blank" rel="noreferrer">Lihat proyek <span>↗</span></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="skills section-shell section-pad" id="skills">
        <div className="section-heading reveal"><div className="section-label"> KEAHLIAN</div><h2>Kemampuan yang<br /><span className="serif-word">saya kuasai.</span></h2></div>
        <div className="skill-list reveal">{skills.map((skill, index) => <span className="skill-chip" key={skill}><small>0{index + 1}</small>{skill}<span>✳</span></span>)}</div>
      </section>

      <section className="contact section-shell section-pad" id="contact">
        <div className="contact-inner reveal"><div className="section-label"> KONTAK</div><p className="contact-pretitle">PUNYA IDE ATAU PELUANG?</p><h2>Mari mulai<br /><span className="serif-word">percakapan.</span></h2>
          <div className="contact-bottom"><a className="contact-email" href="mailto:sahrulap66@gmail.com">sahrulap66@gmail.com <span>↗</span></a><div className="contact-info"><a href="tel:+6282145528676">+62 821-4552-8676</a><span>Wonogiri, Jawa Tengah</span><div className="social-list">{socials.map((social) => <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>{social.label}<span>↗</span></a>)}</div></div><form className="contact-form" onSubmit={sendMessage}><label>Nama<input name="name" placeholder="Nama kamu" required /></label><label>Email<input name="email" type="email" placeholder="email@contoh.com" required /></label><label>Pesan<textarea name="message" rows="3" placeholder="Ceritakan yang ingin kamu diskusikan" required /></label><button type="submit">Kirim pesan <span>↗</span></button></form></div>
        </div>
      </section>

      <footer className="footer section-shell"><span>© {new Date().getFullYear()} Sahrul Ageng Prasetyo</span></footer>
      {showTop && <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Kembali ke atas">↑</button>}
    </main>
  );
}
