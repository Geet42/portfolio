const experience = [
  {
    role: "Software Engineering Intern", company: "Tajshree Autowheels Pvt. Ltd.",
    location: "Nagpur, Maharashtra", period: "May 2025 – Aug 2025", color: "#10b981",
    bullets: [
      "Engineered backend booking & payment workflows using Java and Spring Boot REST APIs with authentication, refund logic, and transactional consistency across 100+ test transactions.",
      "Optimized system reliability through structured logging, debugging, and defect isolation — resolving 12+ reproducible defects and reducing API error frequency by ~30%.",
      "Automated CI/CD pipelines with GitHub Actions and Docker, cutting manual deployment steps by ~50% and enabling faster patch releases.",
    ],
  },
  {
    role: "Software Engineering Intern", company: "Shri Ramdeobaba College of Engineering",
    location: "Nagpur, Maharashtra", period: "Dec 2024 – May 2025", color: "#818cf8",
    bullets: [
      "Built Flask REST APIs for real-time ML inference in a Citrus Disease Detection system, achieving sub-second response time and improving prediction latency by ~35%.",
      "Containerized the inference backend with Docker and automated CI/CD via GitHub Actions, reducing environment setup time by ~40%.",
      "Implemented centralized logging and performance monitoring to identify API bottlenecks during continuous inference testing.",
    ],
  },
  {
    role: "Frontend Developer Intern", company: "Oasis Infobyte",
    location: "Remote", period: "Jun 2023 – Aug 2023", color: "#f59e0b",
    bullets: [
      "Developed responsive web application components using React.js, HTML, CSS, and JavaScript.",
      "Built reusable UI components and implemented state management for dynamic user interfaces.",
      "Improved frontend performance and usability through debugging, testing, and UI optimization.",
    ],
  },
  {
    role: "Data Analytics Intern", company: "All India Council for Technical Education (AICTE)",
    location: "Remote", period: "May 2023 – Jun 2023", color: "#06b6d4",
    bullets: [
      "Completed AWS Academy-supported virtual internship focused on Python and data analytics using cloud-based lab environments.",
      "Performed data preprocessing, analysis, and visualization using Python in virtual lab simulations.",
      "Worked with structured datasets to derive insights and apply analytical problem-solving techniques.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "120px 0" }}>
      <div className="section-container">
        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: "var(--white)", letterSpacing: "-0.03em", marginBottom: 10 }}>Experience</h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)" }}>Internships where I shipped real systems.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {experience.map((exp, i) => (
            <div key={i} style={{ position: "relative", paddingLeft: 36 }}>
              <div style={{ position: "absolute", left: 0, top: 8, width: 14, height: 14, borderRadius: "50%", background: exp.color, border: "3px solid var(--bg)" }} />
              {i < experience.length - 1 && <div style={{ position: "absolute", left: 6, top: 24, bottom: -36, width: 2, background: "var(--border)" }} />}

              <div className="card" style={{ padding: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--white)", marginBottom: 4 }}>{exp.role}</h3>
                    <p style={{ fontSize: 14, color: "var(--text)" }}>{exp.company}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: exp.color, display: "block", marginBottom: 2 }}>{exp.period}</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{exp.location}</span>
                  </div>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 12, padding: 0, listStyle: "none" }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.75, paddingLeft: 18, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, top: 9, width: 5, height: 5, borderRadius: "50%", background: exp.color, opacity: 0.5 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
