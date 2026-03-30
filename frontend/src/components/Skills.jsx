import useInView from "../hooks/useInView";

const skills = {
  "Languages":          { icon: "⌨️", items: ["Java", "Python", "C", "SQL", "JavaScript", "HTML/CSS"] },
  "Backend":            { icon: "⚙️", items: ["Spring Boot", "REST APIs", "Microservices", "Flask", "Spring Security", "Hibernate"] },
  "Frontend":           { icon: "🎨", items: ["React", "Tailwind CSS", "Vite", "Axios", "Responsive Design"] },
  "Cloud & DevOps":     { icon: "☁️", items: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "CI/CD", "Linux"] },
  "Databases":          { icon: "🗄️", items: ["PostgreSQL", "MySQL", "MongoDB", "JPA", "SQL Programming"] },
  "CS Fundamentals":    { icon: "🧠", items: ["DSA", "OOP", "System Design", "OS", "Computer Networks", "DBMS", "Software Engineering"] },
};

export default function Skills() {
  const [headingRef, headingVisible] = useInView({ threshold: 0.2 });
  const [gridRef, gridVisible] = useInView({ threshold: 0.1 });

  return (
    <section id="skills" style={{ padding: "120px 0", background: "rgba(255,255,255,0.008)" }}>
      <div className="section-container">
        <div ref={headingRef} style={{ marginBottom: 56 }}>
          <h2
            className={`section-heading ${headingVisible ? "anim-blur-in" : "anim-hidden"}`}
            style={{ fontSize: 40, fontWeight: 800, color: "var(--white)", letterSpacing: "-0.03em", marginBottom: 10 }}
          >Technical Skills</h2>
          <p
            className={headingVisible ? "anim-fade-up" : "anim-hidden"}
            style={{ fontSize: 15, color: "var(--text-muted)", animationDelay: "0.15s" }}
          >Core technologies and fundamentals I work with.</p>
        </div>

        <div ref={gridRef} className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {Object.entries(skills).map(([name, { icon, items }], i) => (
            <div
              key={name}
              className={`card ${gridVisible ? "anim-scale-in" : "anim-hidden"}`}
              style={{ padding: 26, animationDelay: `${i * 0.08}s` }}
            >
              <span style={{ fontSize: 28, display: "block", marginBottom: 14 }}>{icon}</span>
              <h3 style={{ color: "var(--white)", fontWeight: 700, fontSize: 14, marginBottom: 14 }}>{name}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {items.map((s, si) => (
                  <span
                    key={s}
                    className={gridVisible ? "anim-fade-up" : "anim-hidden"}
                    style={{
                      fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 6,
                      background: "var(--accent-dim)", border: "1px solid rgba(16,185,129,0.14)",
                      color: "#6ee7b7",
                      animationDelay: `${(i * 0.08) + 0.2 + (si * 0.04)}s`,
                    }}
                  >{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
