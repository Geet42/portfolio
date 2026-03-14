import { useEffect, useState } from "react";
import { api } from "../api";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchProjects = () => {
    setLoading(true);
    setError(false);
    api.get("/projects")
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => { fetchProjects(); }, []);

  const matchFilter = (p) => {
    if (filter === "all") return true;
    const text = `${p.title} ${p.description} ${(p.techStack || []).join(" ")}`.toLowerCase();
    if (filter === "distributed") return text.includes("distributed") || text.includes("microservice") || text.includes("resilience") || text.includes("circuit") || text.includes("grpc") || text.includes("socket") || text.includes("replication");
    if (filter === "ml") return text.includes("learning") || text.includes("nlp") || text.includes("bert") || text.includes("cnn") || text.includes("tensorflow") || text.includes("prediction") || text.includes("xgboost");
    if (filter === "cloud") return text.includes("docker") || text.includes("cloud") || text.includes("kubernetes") || text.includes("flask") || text.includes("fastapi");
    if (filter === "testing") return text.includes("junit") || text.includes("testing") || text.includes("evaluation") || text.includes("test");
    return true;
  };

  const filtered = projects.filter(matchFilter);

  const filters = [
    { key: "all", label: "All" },
    { key: "distributed", label: "Distributed Systems" },
    { key: "ml", label: "AI / ML" },
    { key: "cloud", label: "Cloud & DevOps" },
    { key: "testing", label: "Testing" },
  ];

  return (
    <section id="projects" style={{ padding: "120px 0", background: "rgba(255,255,255,0.008)" }}>
      <div className="section-container">
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: "var(--white)", letterSpacing: "-0.03em" }}>Projects</h2>
            {!loading && !error && (
              <span style={{
                fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 6,
                background: "var(--accent-dim)", border: "1px solid rgba(16,185,129,0.2)",
                color: "var(--accent)", letterSpacing: "0.05em",
              }}>LIVE FROM API</span>
            )}
          </div>
          <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 28 }}>
            Fetched in real-time from the Spring Boot REST API backed by PostgreSQL.
          </p>

          {!loading && !error && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 14px", borderRadius: 8, marginBottom: 24,
              background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
              fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-muted)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
              GET /api/projects &rarr; {projects.length} results
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {filters.map(f => {
                const count = f.key === "all" ? projects.length : projects.filter(p => matchFilter(p)).length;
                return (
                  <button key={f.key} onClick={() => setFilter(f.key)} style={{
                    fontSize: 12, fontWeight: 600, padding: "7px 16px", borderRadius: 8, cursor: "pointer",
                    border: filter === f.key ? "1px solid rgba(16,185,129,0.3)" : "1px solid var(--border)",
                    background: filter === f.key ? "var(--accent-dim)" : "transparent",
                    color: filter === f.key ? "var(--accent)" : "var(--text-muted)",
                    transition: "all 0.2s",
                  }}>
                    {f.label}
                    <span style={{ marginLeft: 6, opacity: 0.5, fontSize: 10 }}>{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{
              display: "inline-block", width: 36, height: 36,
              border: "3px solid rgba(16,185,129,0.15)", borderTopColor: "var(--accent)",
              borderRadius: "50%", animation: "float 0.8s linear infinite",
            }} />
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 16 }}>
              Fetching from <span style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>localhost:8080/api/projects</span>
            </p>
          </div>
        )}

        {error && (
          <div className="card" style={{ padding: 40, textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
            <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>&#9888;&#65039;</span>
            <p style={{ color: "var(--white)", fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Backend API not reachable</p>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 6 }}>
              Could not connect to <span style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>http://localhost:8080/api/projects</span>
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 24, lineHeight: 1.7 }}>
              This portfolio is powered by a Spring Boot backend. Start the backend:
            </p>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)",
              background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)",
              padding: "12px 20px", borderRadius: 10, marginBottom: 24, display: "inline-block",
            }}>
              docker-compose up
            </div>
            <br />
            <button onClick={fetchProjects} style={{
              padding: "10px 24px", borderRadius: 10, cursor: "pointer",
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff", fontWeight: 600, fontSize: 13, border: "none",
              boxShadow: "0 4px 20px rgba(16,185,129,0.2)",
            }}>Retry Connection</button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {filtered.map((p, i) => (
              <ProjectCard key={p.id || i} project={p} index={i} />
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "60px 0", fontSize: 14 }}>No projects match this filter.</p>
        )}

        {!loading && !error && (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "8px 18px", borderRadius: 8,
              background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
              fontSize: 11, color: "var(--text-muted)",
            }}>
              <span style={{ fontWeight: 600, color: "var(--white)" }}>{projects.length}</span> projects
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-muted)" }} />
              Spring Boot REST API
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-muted)" }} />
              PostgreSQL
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-muted)" }} />
              Docker
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
