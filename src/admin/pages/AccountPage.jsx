import { useState } from "react";
import { adminApi } from "../../lib/api";
import { useAuth } from "../AuthContext";
import { useToast } from "../components/Toast";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const toast = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setBusy(true);
    try {
      await adminApi.changePassword(currentPassword, newPassword);
      toast.success("Password diubah. Silakan login ulang.");
      // Server sudah mencabut semua sesi, jadi pulangkan ke halaman login.
      await logout();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <header className="admin-page__header">
        <div>
          <h1>Akun</h1>
          <p className="admin-muted">
            {user?.name} · {user?.email} · {user?.role}
          </p>
        </div>
      </header>

      <div className="admin-card admin-card--narrow">
        <h2>Ganti Password</h2>
        <p className="admin-muted">
          Mengganti password akan mengakhiri sesi di semua perangkat, termasuk yang ini.
        </p>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label htmlFor="currentPassword">Password Saat Ini</label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="newPassword">Password Baru</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
            <small className="admin-muted">Minimal 8 karakter.</small>
          </div>

          <div className="admin-field">
            <label htmlFor="confirmPassword">Ulangi Password Baru</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          {error && <p className="admin-error-box">{error}</p>}

          <div className="admin-form__actions">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={busy}>
              {busy ? "Menyimpan..." : "Ganti Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
