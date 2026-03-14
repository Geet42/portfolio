const skills = {
  "Languages":      { icon: "⌨️", items: ["Java", "Python", "C", "SQL"] },
  "Backend":        { icon: "⚙️", items: ["Spring Boot", "Microservices", "REST APIs", "Flask", "Spring Security"] },
  "Cloud & DevOps": { icon: "☁️", items: ["AWS", "Docker", "Kubernetes", "CI/CD", "GitHub Actions"] },
  "Databases":      { icon: "🗄️", items: ["PostgreSQL", "MySQL"] },
  "Tools":          { icon: "🔧", items: ["Git", "Postman", "Swagger", "IntelliJ", "VS Code", "Kafka"] },
  "Concepts":       { icon: "🧠", items: ["DSA", "OOP", "System Design", "Distributed Systems", "Fault Tolerance"] },
};

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "120px 0", background: "rgba(255,255,255,0.008)" }}>
      <div className="section-container">
        <div style={{ marginBottom: 56 }}>
          <h2 className="section-heading" style={{ fontSize: 40, fontWeight: 800, color: "var(--white)", letterSpacing: "-0.03em", marginBottom: 10 }}>Technical Skills</h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)" }}>Core technologies I work with daily.</p>
        </div>

        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {Object.entries(skills).map(([name, { icon, items }], i) => (
            <div key={name} className="card animate-fade-up" style={{ padding: 26, animationDelay: `${i * 0.07}s` }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 14 }}>{icon}</span>
              <h3 style={{ color: "var(--white)", fontWeight: 700, fontSize: 14, marginBottom: 14 }}>{name}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {items.map(s => (
                  <span key={s} style={{
                    fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 6,
                    background: "var(--accent-dim)", border: "1px solid rgba(16,185,129,0.14)",
                    color: "#6ee7b7",
                  }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
