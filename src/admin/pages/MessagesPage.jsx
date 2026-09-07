import { useCallback, useEffect, useState } from "react";
import { adminApi } from "../../lib/api";
import Modal, { ConfirmDialog } from "../components/Modal";
import { useToast } from "../components/Toast";

const STATUSES = [
  { value: "", label: "Semua" },
  { value: "NEW", label: "Baru" },
  { value: "READ", label: "Dibaca" },
  { value: "REPLIED", label: "Dibalas" },
  { value: "ARCHIVED", label: "Diarsip" },
  { value: "SPAM", label: "Spam" },
];

export default function MessagesPage() {
  const toast = useToast();

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { items: rows, meta } = await adminApi.list("messages", { status, limit: 100 });
      setItems(rows);
      setUnread(meta?.unread ?? 0);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [status, toast]);

  useEffect(() => {
    load();
  }, [load]);

  // Membuka pesan otomatis menandainya terbaca di server; ambil versi
  // terbarunya supaya daftar dan detail sinkron.
  const openMessage = async (message) => {
    try {
      setOpen(await adminApi.get("messages", message.id));
      await load();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeStatus = async (message, nextStatus) => {
    try {
      await adminApi.update("messages", message.id, { status: nextStatus });
      toast.success("Status diperbarui");
      setOpen(null);
      await load();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await adminApi.remove("messages", deleting.id);
      toast.success("Pesan dihapus");
      setDeleting(null);
      setOpen(null);
      await load();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <header className="admin-page__header">
        <div>
          <h1>Pesan Masuk</h1>
          <p className="admin-muted">
            {unread > 0 ? `${unread} pesan belum dibaca.` : "Semua pesan sudah dibaca."}
          </p>
        </div>
      </header>

      <div className="admin-toolbar">
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          {STATUSES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="admin-muted">{items.length} pesan</span>
      </div>

      {loading ? (
        <p className="admin-muted">Memuat...</p>
      ) : items.length === 0 ? (
        <p className="admin-muted">Tidak ada pesan.</p>
      ) : (
        <ul className="admin-list admin-list--clickable">
          {items.map((message) => (
            // Baris pesan bisa diklik, jadi harus bisa dicapai keyboard juga:
            // tanpa role + tabIndex + onKeyDown, pengguna keyboard tidak punya
            // cara membuka pesan sama sekali.
            <li
              key={message.id}
              role="button"
              tabIndex={0}
              aria-label={`Buka pesan dari ${message.name}`}
              onClick={() => openMessage(message)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openMessage(message);
                }
              }}
            >
              <div>
                <strong>{message.name}</strong>{" "}
                <span className="admin-muted">&lt;{message.email}&gt;</span>
                {message.status === "NEW" && <span className="admin-badge admin-badge--on">Baru</span>}
                <p className="admin-muted admin-truncate">{message.message}</p>
              </div>
              <time className="admin-muted">
                {new Date(message.createdAt).toLocaleString("id-ID")}
              </time>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <Modal
          title={`Pesan dari ${open.name}`}
          onClose={() => setOpen(null)}
          wide
          footer={
            <>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                onClick={() => setDeleting(open)}
              >
                Hapus
              </button>
              <button type="button" className="admin-btn" onClick={() => changeStatus(open, "SPAM")}>
                Tandai Spam
              </button>
              <button
                type="button"
                className="admin-btn"
                onClick={() => changeStatus(open, "ARCHIVED")}
              >
                Arsipkan
              </button>
              <a className="admin-btn admin-btn--primary" href={`mailto:${open.email}`}>
                Balas via Email
              </a>
            </>
          }
        >
          <dl className="admin-detail">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${open.email}`}>{open.email}</a>
            </dd>
            <dt>Waktu</dt>
            <dd>{new Date(open.createdAt).toLocaleString("id-ID")}</dd>
            <dt>Status</dt>
            <dd>{STATUSES.find((s) => s.value === open.status)?.label ?? open.status}</dd>
            {open.ipAddress && (
              <>
                <dt>IP</dt>
                <dd>{open.ipAddress}</dd>
              </>
            )}
          </dl>
          <p className="admin-message-body">{open.message}</p>
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          title="Hapus pesan?"
          message="Pesan akan dihapus permanen."
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
          busy={busy}
        />
      )}
    </div>
  );
}
