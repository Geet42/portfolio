import useInView from "../hooks/useInView";

export default function Footer() {
  const [ref, isVisible] = useInView({ threshold: 0.3 });

  return (
    <footer
      ref={ref}
      className={isVisible ? "anim-fade-in" : "anim-hidden"}
      style={{ padding: "36px 0", textAlign: "center", borderTop: "1px solid var(--border)" }}
    >
      <p style={{ fontSize: 12, color: "#3f3f46" }}>Designed & built by Geet Bhute · 2026</p>
      <p style={{ fontSize: 11, color: "#27272a", marginTop: 4 }}>Spring Boot · React · Docker · PostgreSQL</p>
    </footer>
  );
}
