import { Outlet } from "react-router-dom";
import { ContentProvider } from "../context/ContentContext";

/**
 * Membungkus semua halaman publik dengan satu ContentProvider, jadi
 * /api/public/bootstrap hanya dipanggil sekali walau pindah-pindah halaman.
 *
 * `.site-shell` juga membatasi skala tipografi editorial ke halaman publik —
 * CMS admin punya skalanya sendiri dan tidak boleh kena h1 setinggi 6rem.
 */
export default function PublicLayout() {
  return (
    <ContentProvider>
      <div className="site-shell">
        <Outlet />
      </div>
    </ContentProvider>
  );
}
