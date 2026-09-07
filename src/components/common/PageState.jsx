import { motion } from 'framer-motion';
import './page-state.css';

/** Ditampilkan selagi /api/public/bootstrap dimuat. */
export function LoadingState({ label = 'Memuat konten...' }) {
  return (
    <div className="page-state">
      <div className="page-state__spinner" aria-hidden="true" />
      <p className="page-state__text">{label}</p>
    </div>
  );
}

/**
 * Ditampilkan saat API tidak bisa dihubungi. Sengaja menyebut kemungkinan
 * penyebab paling umum — server belum dinyalakan — supaya tidak menebak-nebak.
 */
export function ErrorState({ error, onRetry }) {
  const offline = error?.status === undefined || error?.status === 0;

  return (
    <motion.div
      className="page-state"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="page-state__title">Konten gagal dimuat</h3>
      <p className="page-state__text">
        {offline
          ? 'Tidak bisa menghubungi server. Pastikan portfolio-api sudah jalan.'
          : error?.message ?? 'Terjadi kesalahan yang tidak diketahui.'}
      </p>
      {onRetry && (
        <button type="button" className="btn btn-primary page-state__retry" onClick={onRetry}>
          Coba lagi
        </button>
      )}
    </motion.div>
  );
}

/**
 * Membungkus isi halaman dengan state muat/gagal, jadi tiap halaman tidak
 * perlu mengulang percabangan yang sama.
 */
export function ContentGate({ status, error, onRetry, children }) {
  if (status === 'loading') return <LoadingState />;
  if (status === 'error') return <ErrorState error={error} onRetry={onRetry} />;
  return children;
}
