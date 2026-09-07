import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminApi, API_URL } from "../../lib/api";
import { useToast } from "../components/Toast";
import { Icon } from "../../lib/icons";

const COUNTERS = [
  { key: "projects", label: "Project", icon: "AiOutlineProject" },
  { key: "certificates", label: "Sertifikat", icon: "TbFileCertificate" },
  { key: "skills", label: "Skill", icon: "BiCodeAlt" },
  { key: "technologies", label: "Teknologi", icon: "SiReact" },
];

export default function Dashboard() {
  const toast = useToast();
  const [counts, setCounts] = useState({});
  const [messages, setMessages] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const results = await Promise.all([
          ...COUNTERS.map((counter) => adminApi.list(counter.key, { limit: 1 })),
          adminApi.list("messages", { limit: 5 }),
        ]);
        if (cancelled) return;

        const nextCounts = {};
        COUNTERS.forEach((counter, index) => {
          // technologies tidak paginated, jadi meta bisa kosong — hitung dari array.
          nextCounts[counter.key] = results[index].meta?.total ?? results[index].items.length;
        });

        const inbox = results[results.length - 1];
        setCounts(nextCounts);
        setMessages(inbox.items);
        setUnread(inbox.meta?.unread ?? 0);
      } catch (error) {
        if (!cancelled) toast.error(error.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [toast]);

  return (
    <div>
      <header className="admin-page__header">
        <div>
          <h1>Dashboard</h1>
          <p className="admin-muted">Ringkasan konten website.</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="admin-btn">
          Lihat website
        </a>
      </header>

      <div className="admin-stats">
        {COUNTERS.map((counter) => (
          <Link key={counter.key} to={`/admin/${counter.key}`} className="admin-stat">
            <Icon name={counter.icon} size="1.5rem" />
            <strong>{loading ? "—" : counts[counter.key] ?? 0}</strong>
            <span>{counter.label}</span>
          </Link>
        ))}
        <Link to="/admin/messages" className="admin-stat admin-stat--accent">
          <Icon name="HiOutlineMail" size="1.5rem" />
          <strong>{loading ? "—" : unread}</strong>
          <span>Pesan belum dibaca</span>
        </Link>
      </div>

      <section className="admin-card">
        <h2>Pesan terbaru</h2>
        {loading ? (
          <p className="admin-muted">Memuat...</p>
        ) : messages.length === 0 ? (
          <p className="admin-muted">Belum ada pesan masuk.</p>
        ) : (
          <ul className="admin-list">
            {messages.map((message) => (
              <li key={message.id}>
                <div>
                  <strong>{message.name}</strong>{" "}
                  <span className="admin-muted">&lt;{message.email}&gt;</span>
                  {message.status === "NEW" && <span className="admin-badge admin-badge--on">Baru</span>}
                  <p className="admin-muted admin-truncate">{message.message}</p>
                </div>
                <time className="admin-muted">
                  {new Date(message.createdAt).toLocaleDateString("id-ID")}
                </time>
              </li>
            ))}
          </ul>
        )}
        <Link to="/admin/messages" className="admin-btn admin-btn--sm">
          Lihat semua pesan
        </Link>
      </section>

      <p className="admin-muted admin-footnote">
        API: <code>{API_URL}</code>
      </p>
    </div>
  );
}
