import { useState } from "react";
import { useAuth } from "../AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <h1>Portfolio CMS</h1>
        <p className="admin-muted">Masuk untuk mengelola konten website.</p>

        <div className="admin-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="admin-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {error && <p className="admin-error-box">{error}</p>}

        <button type="submit" className="admin-btn admin-btn--primary" disabled={busy}>
          {busy ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
