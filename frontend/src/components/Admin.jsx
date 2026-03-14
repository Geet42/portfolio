import { useState } from "react";
import { api } from "../api";

export default function Admin() {
  const [form, setForm] = useState({ title: "", description: "", demoVideoUrl: "" });
  const [status, setStatus] = useState(null);

  const submit = async () => {
    try {
      await api.post("/admin/projects", form, { headers: { "X-ADMIN-TOKEN": "ADMIN_SECRET_TOKEN" } });
      setStatus("success");
      setForm({ title: "", description: "", demoVideoUrl: "" });
    } catch { setStatus("error"); }
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <section style={{ padding: "100px 0" }}>
      <div className="section-container" style={{ maxWidth: 560 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--white)", marginBottom: 28 }}>Admin Panel</h2>
        {Object.keys(form).map(key => (
          <input key={key} placeholder={key} value={form[key]}
            style={{ width: "100%", padding: "12px 16px", marginBottom: 10, borderRadius: 12, background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--white)", fontSize: 13, outline: "none" }}
            onChange={e => setForm({ ...form, [key]: e.target.value })} />
        ))}
        <button onClick={submit} style={{ marginTop: 8, padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer" }}>
          Add Project
        </button>
        {status === "success" && <p style={{ color: "var(--accent)", fontSize: 13, marginTop: 12 }}>Added!</p>}
        {status === "error" && <p style={{ color: "#ef4444", fontSize: 13, marginTop: 12 }}>Failed.</p>}
      </div>
    </section>
  );
}
