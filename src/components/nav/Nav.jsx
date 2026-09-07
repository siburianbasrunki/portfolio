import { Link, useLocation } from "react-router-dom";
import { useContent } from "../../context/ContentContext";
import { Icon } from "../../lib/icons";
import "./nav.css";

/**
 * Menu diambil dari tabel `pages` — menambah halaman di admin otomatis
 * menambah ikon di sini, tanpa mengubah kode.
 */
const Nav = () => {
  const location = useLocation();
  const { content } = useContent();
  const items = content?.nav ?? [];

  if (items.length === 0) return null;

  return (
    // Class, bukan selector elemen: <nav> juga dipakai sidebar admin, dan CSS
    // di Vite berlingkup global.
    <nav className="site-nav" aria-label="Navigasi utama">
      {items.map((item) => (
        <Link
          key={item.key}
          to={item.path}
          className={location.pathname === item.path ? "active" : ""}
          aria-label={item.label}
        >
          <Icon name={item.iconKey} />
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
