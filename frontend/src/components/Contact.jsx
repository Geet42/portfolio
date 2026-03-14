const links = [
  { icon: "✉️", label: "Email", value: "geetbhute18@gmail.com", href: "mailto:geetbhute18@gmail.com" },
  { icon: "🐙", label: "GitHub", value: "Geet42", href: "https://github.com/Geet42" },
  { icon: "🔗", label: "LinkedIn", value: "geetbhute", href: "https://linkedin.com/in/geetbhute" },
  { icon: "🏆", label: "LeetCode", value: "bhutegp", href: "https://leetcode.com/u/bhutegp/" },
];

export default function Contact() {
  return (
    <section id="contact" style={{
      padding: "120px 0",
      background: "linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.02) 50%, transparent 100%)",
    }}>
      <div className="section-container" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, color: "var(--white)", letterSpacing: "-0.03em", marginBottom: 12 }}>Let's Connect</h2>
        <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 52, maxWidth: 440, margin: "0 auto 52px" }}>
          I'm actively seeking Backend / SDE opportunities. Let's talk about how I can contribute to your team.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, maxWidth: 820, margin: "0 auto" }}>
          {links.map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="card" style={{
                padding: "28px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                textAlign: "center", transition: "all 0.3s",
              }}
            >
              <span style={{ fontSize: 28 }}>{l.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l.label}</span>
              <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 500 }}>{l.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
