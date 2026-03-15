import { useState, useEffect, useRef } from "react";

const termLines = [
  { cmd: "$ whoami", out: "geet.bhute — software developer" },
  { cmd: "$ cat stack.txt", out: "Java · Spring Boot · Docker · K8s · AWS" },
  { cmd: "$ uptime", out: "3+ years building distributed systems" },
  { cmd: "$ location", out: "Dublin, Ireland 🇮🇪" },
  { cmd: "$ status", out: "MSc @ UCD · Open to SDE roles" },
];

function Terminal() {
  const [lines, setLines] = useState([]);
  const idx = useRef(0);
  const phase = useRef("cmd");

  useEffect(() => {
    const t = setInterval(() => {
      if (idx.current >= termLines.length) { clearInterval(t); return; }
      const cur = termLines[idx.current];
      if (phase.current === "cmd") {
        setLines(p => [...p, { type: "cmd", text: cur.cmd }]);
        phase.current = "out";
      } else {
        setLines(p => [...p, { type: "out", text: cur.out }]);
        phase.current = "cmd";
        idx.current++;
      }
    }, 550);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      width: "100%", maxWidth: 480, borderRadius: 16,
      background: "#0c0c12", border: "1px solid var(--border)",
      overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 80px rgba(16,185,129,0.04)",
      animation: "float 7s ease-in-out infinite",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 7, padding: "11px 16px",
        background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--border)",
      }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: "#3f3f46", fontFamily: "var(--mono)" }}>geet@portfolio ~ bash</span>
      </div>
      <div style={{ padding: "18px 22px", minHeight: 210, fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.85 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.type === "cmd" ? "var(--accent)" : "#71717a", marginBottom: l.type === "out" ? 8 : 0 }}>{l.text}</div>
        ))}
        <span style={{ color: "var(--accent)", animation: "blink 1s infinite" }}>▌</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* Background glows */}
      <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-8%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="section-container grid-hero" style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", paddingTop: 100, paddingBottom: 80, position: "relative", zIndex: 2 }}>
        <div className="animate-fade-up">
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 20,
            background: "var(--accent-dim)", border: "1px solid rgba(16,185,129,0.2)",
            marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "pulse-dot 2s infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.03em" }}>Open to SDE roles</span>
          </div>

          {/* Name + Avatar row */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 14 }}>
            <h1 className="hero-heading" style={{ fontSize: 62, fontWeight: 800, color: "var(--white)", lineHeight: 1.08, letterSpacing: "-0.04em" }}>
              Geet<br />Bhute
            </h1>
            <img
              src="/avatar.png"
              alt="Geet Bhute"
              className="hero-avatar"
              style={{
                width: 120, height: 120,
                objectFit: "contain",
                filter: "drop-shadow(0 8px 24px rgba(16,185,129,0.15))",
                animation: "float 7s ease-in-out infinite",
              }}
            />
          </div>

          <p className="hero-subtitle" style={{ fontSize: 21, fontWeight: 500, color: "var(--accent)", marginBottom: 16, letterSpacing: "-0.01em" }}>
            Software Developer
          </p>
          <p style={{ fontSize: 15.5, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 430, marginBottom: 34 }}>
            Building resilient, scalable distributed systems with Java, Spring Boot & Cloud Infrastructure.
          </p>

          <div className="hero-buttons" style={{ display: "flex", gap: 12 }}>
            <a href="#projects" style={{
              padding: "13px 28px", borderRadius: 12,
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff", fontWeight: 600, fontSize: 14,
              boxShadow: "0 8px 30px rgba(16,185,129,0.2)",
              transition: "all 0.2s",
            }}>View Projects</a>
            <a href="#contact" style={{
              padding: "13px 28px", borderRadius: 12,
              border: "1px solid var(--border)", color: "#d4d4d8",
              fontWeight: 600, fontSize: 14, background: "rgba(255,255,255,0.02)",
              transition: "all 0.2s",
            }}>Get in Touch</a>
          </div>
        </div>

        <div className="animate-fade-up delay-200 hero-terminal" style={{ display: "flex", justifyContent: "flex-end" }}>
          <Terminal />
        </div>
      </div>
    </section>
  );
}
