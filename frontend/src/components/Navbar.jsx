import { useState, useEffect, useRef } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);

  // Slide-down entrance
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Active section scroll spy
  useEffect(() => {
    const sectionIds = ["hero", ...links.map(l => l.id)];
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id === "hero" ? "" : id);
          }
        },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || open ? "rgba(9,9,11,0.88)" : "transparent",
      backdropFilter: scrolled || open ? "blur(20px) saturate(180%)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.35s ease",
      transform: mounted ? "translateY(0)" : "translateY(-100%)",
      opacity: mounted ? 1 : 0,
    }}>
      <div className="section-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 110 }}>
          <span style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, #10b981, #059669)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 15,
          }}>G</span>
          <span style={{ color: "var(--white)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em" }}>
            Geet Bhute
          </span>
        </a>

        {/* Desktop nav */}
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`}
              className={activeSection === l.id ? "nav-link-active" : ""}
              style={{
                fontSize: 13, fontWeight: 500,
                color: activeSection === l.id ? "var(--accent)" : "var(--text-muted)",
                transition: "color 0.3s ease", letterSpacing: "0.01em",
                position: "relative",
              }}
              onMouseEnter={e => { if (activeSection !== l.id) e.target.style.color = "var(--white)"; }}
              onMouseLeave={e => { if (activeSection !== l.id) e.target.style.color = "var(--text-muted)"; }}
            >{l.label}</a>
          ))}
          <a href="https://github.com/Geet42" target="_blank" rel="noreferrer" style={{
            fontSize: 12, fontWeight: 600, color: "var(--accent)",
            padding: "7px 16px", borderRadius: 8,
            border: "1px solid rgba(16,185,129,0.25)",
            background: "rgba(16,185,129,0.06)",
            transition: "all 0.2s",
          }}>GitHub ↗</a>
        </div>

        {/* Hamburger button */}
        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {links.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="https://github.com/Geet42"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: 14, fontWeight: 600, color: "var(--accent)",
            padding: "10px 24px", borderRadius: 10,
            border: "1px solid rgba(16,185,129,0.25)",
            background: "rgba(16,185,129,0.06)",
            marginTop: 8,
          }}
          onClick={() => setOpen(false)}
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  );
}
