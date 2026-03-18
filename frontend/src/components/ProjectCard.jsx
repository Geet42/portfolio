import { useState } from "react";

const COLORS = ["#10b981","#f59e0b","#6366f1","#3b82f6","#ef4444","#8b5cf6","#ec4899","#14b8a6","#f97316","#06b6d4","#84cc16"];
const ICONS = ["🎟️","🏦","🔌","🗄️","☁️","🍊","🤖","🧬","₿","📈","🧪"];

export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const c = COLORS[index % COLORS.length];
  const icon = ICONS[index % ICONS.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", borderRadius: 16, overflow: "hidden",
        background: hovered ? "rgba(255,255,255,0.04)" : "var(--bg-card)",
        border: `1px solid ${hovered ? c + "35" : "var(--border)"}`,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 48px ${c}12` : "none",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex", flexDirection: "column", cursor: "default",
      }}
    >
      {/* Accent bar */}
      <div style={{ height: 3, background: c, flexShrink: 0 }} />

      <div style={{ padding: "24px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
        <span style={{ fontSize: 28, marginBottom: 12 }}>{icon}</span>
        <h3 style={{ fontSize: 14.5, fontWeight: 700, color: "var(--white)", lineHeight: 1.35, marginBottom: 10, letterSpacing: "-0.01em" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 16 }}>
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <ul style={{ marginBottom: 16, display: "flex", flexDirection: "column", gap: 5, padding: 0, listStyle: "none" }}>
            {project.highlights.map((h, i) => (
              <li key={i} style={{ fontSize: 11.5, color: "var(--text)", display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ marginTop: 5, width: 4, height: 4, borderRadius: "50%", background: c, flexShrink: 0, opacity: 0.7 }} />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack at bottom */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "auto", paddingTop: 12 }}>
          {(project.techStack || []).map(t => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 5,
              color: c, border: `1px solid ${c}28`, background: `${c}08`,
              letterSpacing: "0.02em",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
