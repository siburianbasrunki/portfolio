import { useEffect, useState } from "react";
import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { ToastProvider } from "./components/Toast";
import { RESOURCES, SINGLETONS } from "./resources";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResourcePage from "./pages/ResourcePage";
import SingletonPage from "./pages/SingletonPage";
import MediaPage from "./pages/MediaPage";
import MessagesPage from "./pages/MessagesPage";
import AccountPage from "./pages/AccountPage";
import { Icon } from "../lib/icons";
import "./admin.css";

export default function AdminApp() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AdminGate />
      </AuthProvider>
    </ToastProvider>
  );
}

/** Menentukan apakah menampilkan layar login atau isi CMS. */
function AdminGate() {
  const { status } = useAuth();

  if (status === "checking") {
    return (
      <div className="admin-root admin-root--center">
        <p className="admin-muted">Memeriksa sesi...</p>
      </div>
    );
  }

  if (status === "anonymous") {
    return (
      <div className="admin-root">
        <Login />
      </div>
    );
  }

  return (
    <div className="admin-root">
      <AdminShell />
    </div>
  );
}

function AdminShell() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Tutup menu mobile setiap kali pindah halaman.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Escape menutup menu — jalur keyboard, karena lapisan gelapnya aria-hidden.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <div className="admin-shell">
      <button
        type="button"
        className="admin-menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Buka menu"
      >
        ☰
      </button>

      <aside className={`admin-sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="admin-sidebar__brand">
          <span>Portfolio CMS</span>
          <small className="admin-muted">{user?.email}</small>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end className={navClass}>
            <Icon name="CgWebsite" /> Dashboard
          </NavLink>

          <p className="admin-nav__group">Konten Utama</p>
          {SINGLETONS.map((resource) => (
            <NavLink key={resource.key} to={`/admin/${resource.key}`} className={navClass}>
              <Icon name={resource.icon} /> {resource.label}
            </NavLink>
          ))}

          <p className="admin-nav__group">Konten</p>
          {RESOURCES.map((resource) => (
            <NavLink key={resource.key} to={`/admin/${resource.key}`} className={navClass}>
              <Icon name={resource.icon} /> {resource.label}
            </NavLink>
          ))}

          <p className="admin-nav__group">Lainnya</p>
          <NavLink to="/admin/media" className={navClass}>
            <Icon name="CgWebsite" /> Media
          </NavLink>
          <NavLink to="/admin/messages" className={navClass}>
            <Icon name="HiOutlineMail" /> Pesan Masuk
          </NavLink>
          <NavLink to="/admin/account" className={navClass}>
            <Icon name="AiOutlineUser" /> Akun
          </NavLink>
        </nav>

        <div className="admin-sidebar__footer">
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn--sm">
            Lihat website
          </a>
          <button type="button" className="admin-btn admin-btn--sm" onClick={logout}>
            Keluar
          </button>
        </div>
      </aside>

      {/* Lapisan gelap di belakang menu mobile. aria-hidden karena ini murni
          dekoratif — jalur keyboard untuk menutup menu adalah tombol ☰ dan
          Escape, bukan lapisan ini. */}
      {menuOpen && (
        <div
          className="admin-sidebar__scrim"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main className="admin-main">
        <Routes>
          <Route index element={<Dashboard />} />

          {SINGLETONS.map((resource) => (
            <Route
              key={resource.key}
              path={resource.key}
              element={<SingletonPage resourceKey={resource.key} />}
            />
          ))}

          {RESOURCES.map((resource) => (
            <Route
              key={resource.key}
              path={resource.key}
              element={<ResourcePage resourceKey={resource.key} />}
            />
          ))}

          <Route path="media" element={<MediaPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  );
}

const navClass = ({ isActive }) => `admin-nav__link ${isActive ? "is-active" : ""}`;
