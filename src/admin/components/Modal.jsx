import { useEffect } from "react";

export default function Modal({ title, onClose, children, footer, wide = false }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    // Cegah halaman di belakang ikut bergulir saat modal terbuka.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="admin-modal__backdrop" onMouseDown={onClose}>
      <div
        className={`admin-modal ${wide ? "admin-modal--wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="admin-modal__header">
          <h3>{title}</h3>
          <button type="button" onClick={onClose} aria-label="Tutup">
            ×
          </button>
        </header>

        <div className="admin-modal__body">{children}</div>

        {footer && <footer className="admin-modal__footer">{footer}</footer>}
      </div>
    </div>
  );
}

export function ConfirmDialog({ title, message, confirmLabel = "Hapus", onConfirm, onClose, busy }) {
  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="admin-btn" onClick={onClose} disabled={busy}>
            Batal
          </button>
          <button
            type="button"
            className="admin-btn admin-btn--danger"
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? "Memproses..." : confirmLabel}
          </button>
        </>
      }
    >
      <p className="admin-muted">{message}</p>
    </Modal>
  );
}
