import { useEffect, useState, useRef } from "react";
import { api } from "../api";
import ProjectCard from "./ProjectCard";
import useInView from "../hooks/useInView";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("all");
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const [animKey, setAnimKey] = useState(0); // re-trigger animations on filter change

  const [headingRef, headingVisible] = useInView({ threshold: 0.2 });
  const [gridRef, gridVisible] = useInView({ threshold: 0.05 });

  const startTimer = () => {
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const fetchProjects = () => {
    setLoading(true);
    setError(false);
    startTimer();
    api.get("/projects")
      .then(res => {
        setProjects(res.data);
        setLoading(false);
        stopTimer();
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        stopTimer();
      });
  };

  useEffect(() => {
    fetchProjects();
    return () => stopTimer();
  }, []);

  const matchFilter = (p) => {
    if (filter === "all") return true;
    const text = `${p.title} ${p.description} ${(p.techStack || []).join(" ")}`.toLowerCase();
    if (filter === "distributed") return text.includes("distributed") || text.includes("microservice") || text.includes("resilience") || text.includes("circuit") || text.includes("grpc") || text.includes("socket") || text.includes("replication");
    if (filter === "ml") return text.includes("learning") || text.includes("nlp") || text.includes("bert") || text.includes("cnn") || text.includes("tensorflow") || text.includes("prediction") || text.includes("xgboost");
    if (filter === "cloud") return text.includes("docker") || text.includes("cloud") || text.includes("kubernetes") || text.includes("flask") || text.includes("fastapi");
    if (filter === "testing") return text.includes("junit") || text.includes("testing") || text.includes("evaluation") || text.includes("test");
    return true;
  };

  const handleFilter = (key) => {
    setFilter(key);
    setAnimKey(prev => prev + 1); // re-trigger card animations
  };

  const filtered = projects.filter(matchFilter);

  const filters = [
    { key: "all", label: "All" },
    { key: "distributed", label: "Distributed Systems" },
    { key: "ml", label: "AI / ML" },
    { key: "cloud", label: "Cloud & DevOps" },
    { key: "testing", label: "Testing" },
  ];

  // Cold start message after 5 seconds
  const showColdStartMsg = loading && elapsed >= 5;

  return (
    <section id="projects" style={{ padding: "120px 0", background: "rgba(255,255,255,0.008)" }}>
      <div className="section-container">
        <div ref={headingRef} style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
            <h2
              className={`section-heading ${headingVisible ? "anim-blur-in" : "anim-hidden"}`}
              style={{ fontSize: 40, fontWeight: 800, color: "var(--white)", letterSpacing: "-0.03em" }}
            >Projects</h2>
            {!loading && !error && (
              <span
                className={headingVisible ? "anim-fade-up" : "anim-hidden"}
                style={{
                  fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 6,
                  background: "var(--accent-dim)", border: "1px solid rgba(16,185,129,0.2)",
                  color: "var(--accent)", letterSpacing: "0.05em", animationDelay: "0.2s",
                }}
              >LIVE FROM API</span>
            )}
          </div>
          <p
            className={headingVisible ? "anim-fade-up" : "anim-hidden"}
            style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 28, animationDelay: "0.15s" }}
          >
            Fetched in real-time from the Spring Boot REST API backed by PostgreSQL.
          </p>

          {!loading && !error && (
            <div
              className={headingVisible ? "anim-fade-up" : "anim-hidden"}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px", borderRadius: 8, marginBottom: 24,
                background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
                fontFamily: "var(--mono)", fontSize: 11, color: "var(--text-muted)",
                animationDelay: "0.25s",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
              GET /api/projects &rarr; {projects.length} results
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="filter-tabs" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {filters.map((f, fi) => {
                const count = f.key === "all" ? projects.length : projects.filter(p => {
                  // Re-use matchFilter logic with temporarily set filter
                  const text = `${p.title} ${p.description} ${(p.techStack || []).join(" ")}`.toLowerCase();
                  if (f.key === "distributed") return text.includes("distributed") || text.includes("microservice") || text.includes("resilience") || text.includes("circuit") || text.includes("grpc") || text.includes("socket") || text.includes("replication");
                  if (f.key === "ml") return text.includes("learning") || text.includes("nlp") || text.includes("bert") || text.includes("cnn") || text.includes("tensorflow") || text.includes("prediction") || text.includes("xgboost");
                  if (f.key === "cloud") return text.includes("docker") || text.includes("cloud") || text.includes("kubernetes") || text.includes("flask") || text.includes("fastapi");
                  if (f.key === "testing") return text.includes("junit") || text.includes("testing") || text.includes("evaluation") || text.includes("test");
                  return true;
                }).length;
                return (
                  <button
                    key={f.key}
                    onClick={() => handleFilter(f.key)}
                    className={headingVisible ? "anim-fade-up" : "anim-hidden"}
                    style={{
                      fontSize: 12, fontWeight: 600, padding: "7px 16px", borderRadius: 8, cursor: "pointer",
                      border: filter === f.key ? "1px solid rgba(16,185,129,0.3)" : "1px solid var(--border)",
                      background: filter === f.key ? "var(--accent-dim)" : "transparent",
                      color: filter === f.key ? "var(--accent)" : "var(--text-muted)",
                      transition: "all 0.2s",
                      animationDelay: `${0.3 + fi * 0.06}s`,
                    }}
                  >
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
              borderRadius: "50%", animation: "spin 0.8s linear infinite",
            }} />
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 16 }}>
              Waking up the backend server<span style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}> {elapsed}s</span>
            </p>
            {showColdStartMsg && (
              <p style={{
                color: "var(--text-muted)", fontSize: 12, marginTop: 10,
                maxWidth: 380, margin: "10px auto 0",
                lineHeight: 1.6, opacity: 0.7,
              }}>
                The backend is hosted on Render's free tier and sleeps after inactivity. Cold starts take up to 50 seconds — hang tight!
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="card" style={{ padding: 40, textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
            <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>&#9888;&#65039;</span>
            <p style={{ color: "var(--white)", fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Backend is still waking up</p>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 6 }}>
              The server is hosted on Render's free tier and may need a moment to start.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 24, lineHeight: 1.7 }}>
              This usually takes 30–50 seconds on the first visit. Hit retry and it should load.
            </p>
            <button onClick={fetchProjects} style={{
              padding: "10px 24px", borderRadius: 10, cursor: "pointer",
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff", fontWeight: 600, fontSize: 13, border: "none",
              boxShadow: "0 4px 20px rgba(16,185,129,0.2)",
            }}>Retry Connection</button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div ref={gridRef} key={animKey} className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {filtered.map((p, i) => (
              <div
                key={p.id || i}
                className={gridVisible ? "anim-scale-in" : "anim-hidden"}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "60px 0", fontSize: 14 }}>No projects match this filter.</p>
        )}

        {!loading && !error && (
          <div
            className={gridVisible ? "anim-fade-up" : "anim-hidden"}
            style={{ textAlign: "center", marginTop: 32, animationDelay: "0.5s" }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "8px 18px", borderRadius: 8,
              background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
              fontSize: 11, color: "var(--text-muted)",
              flexWrap: "wrap", justifyContent: "center",
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
