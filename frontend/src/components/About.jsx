const education = [
  { school: "University College Dublin", degree: "MSc Computer Science (Negotiated Learning)", grade: "2:1", period: "Sep 2025 – Present" },
  { school: "Shri Ramdeobaba College of Engineering", degree: "B.Tech Computer Science", grade: "1:1", period: "Dec 2021 – May 2025" },
];

const certifications = [
  { name: "Spring Boot 1 to 100 – Expert", issuer: "Coding Shuttle", color: "#ec4899" },
  { name: "Spring Boot 0 to 1 – Fundamentals", issuer: "Coding Shuttle", color: "#ec4899" },
  { name: "Java", issuer: "Udemy", color: "#8b5cf6" },
  { name: "AWS Cloud Practitioner", issuer: "AWS", color: "#f59e0b" },
  { name: "Data Storage in Microsoft Azure", issuer: "Microsoft", color: "#3b82f6" },
  { name: "Azure Management & Security Solutions", issuer: "Microsoft", color: "#3b82f6" },
  { name: "Intro to Azure Cloud Services", issuer: "Microsoft", color: "#3b82f6" },
  { name: "Azure Services and Lifecycles", issuer: "Microsoft", color: "#3b82f6" },
  { name: "Introduction to Kubernetes", issuer: "The Linux Foundation", color: "#06b6d4" },
  { name: "Introduction to Linux", issuer: "The Linux Foundation", color: "#06b6d4" },
  { name: "Blockchain: Uses & Implications", issuer: "The Linux Foundation", color: "#06b6d4" },
];

const leetcode = {
  solved: 132,
  easy: 69,
  medium: 56,
  hard: 7,
  submissions: 119,
  url: "https://leetcode.com/u/bhutegp/",
};

export default function About() {
  return (
    <section id="about" style={{ padding: "120px 0" }}>
      <div className="section-container">
        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: "var(--white)", letterSpacing: "-0.03em", marginBottom: 10 }}>About Me</h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)" }}>Backend-focused engineer with a systems-first mindset.</p>
        </div>

        {/* Bio + Education */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, alignItems: "start", marginBottom: 56 }}>
          <div>
            <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8, marginBottom: 20 }}>
              I'm a Computer Science master's student at University College Dublin with a deep interest in building fault-tolerant,
              secure backend systems. My work spans Spring Boot microservices, Docker/Kubernetes infrastructure, and real-time
              ML inference APIs — always with a focus on reliability, clean architecture, and measurable performance gains.
            </p>
            <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8 }}>
              From digitizing dealership booking workflows to publishing ML research, I bring production-grade discipline to
              every codebase I touch. I'm driven by the challenge of making complex systems simple, observable, and resilient.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {education.map((e, i) => (
              <div key={i} className="card" style={{ padding: 20, display: "flex", gap: 14 }}>
                <span style={{ fontSize: 22 }}>🎓</span>
                <div>
                  <p style={{ color: "var(--white)", fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{e.school}</p>
                  <p style={{ fontSize: 13, color: "var(--text)", marginBottom: 2 }}>{e.degree}</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{e.grade} · {e.period}</p>
                </div>
              </div>
            ))}

            {/* LeetCode Card */}
            <a href={leetcode.url} target="_blank" rel="noreferrer" className="card" style={{ padding: 20, transition: "all 0.3s", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>🏆</span>
                  <span style={{ color: "var(--white)", fontWeight: 700, fontSize: 14 }}>LeetCode</span>
                </div>
                <span style={{ fontSize: 11, color: "var(--accent)", fontFamily: "var(--mono)" }}>@bhutegp ↗</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                <div style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 10, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)" }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: "var(--white)", display: "block" }}>{leetcode.solved}</span>
                  <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 500 }}>Solved</span>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, justifyContent: "center" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                    <span style={{ color: "#22c55e", fontWeight: 600 }}>Easy</span>
                    <span style={{ color: "var(--text-muted)" }}>{leetcode.easy}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                    <span style={{ color: "#f59e0b", fontWeight: 600 }}>Medium</span>
                    <span style={{ color: "var(--text-muted)" }}>{leetcode.medium}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                    <span style={{ color: "#ef4444", fontWeight: 600 }}>Hard</span>
                    <span style={{ color: "var(--text-muted)" }}>{leetcode.hard}</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center" }}>
                {leetcode.submissions} submissions · 50 Days Badge · Java primary
              </div>
            </a>
          </div>
        </div>

        {/* Certifications */}
        <div style={{ marginBottom: 56 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--white)", marginBottom: 20 }}>Certifications</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {certifications.map((c, i) => (
              <div key={i} className="card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 12.5, color: "var(--white)", fontWeight: 600, lineHeight: 1.3 }}>{c.name}</p>
                  <p style={{ fontSize: 10.5, color: "var(--text-muted)" }}>{c.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beyond Academics */}
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--white)", marginBottom: 20 }}>Beyond Academics</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            <div className="card" style={{ padding: 24 }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>🏏</span>
              <h4 style={{ color: "var(--white)", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Cricket</h4>
              <p style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.7 }}>
                Represented school and college in intercollegiate tournaments. Secured runner-up positions at Dhanwate National College and Sindhu Mahavidyalaya competitions.
              </p>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>🤝</span>
              <h4 style={{ color: "var(--white)", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Rotaract Club – RCOEM</h4>
              <p style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.7 }}>
                Distributed essentials to underprivileged families, organized awareness campaigns, and hosted events for differently-abled children through social initiatives.
              </p>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>💻</span>
              <h4 style={{ color: "var(--white)", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Competitive Programming</h4>
              <p style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.7 }}>
                132 LeetCode problems solved (Java). Active competitive programmer focused on data structures, algorithms, and problem-solving under constraints.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
