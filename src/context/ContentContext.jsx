/**
 * Memuat seluruh isi website sekali lewat /api/public/bootstrap, lalu
 * membagikannya ke semua halaman.
 *
 * Portfolio ini kecil (satu payload ~30KB), jadi satu request di awal terasa
 * jauh lebih cepat daripada tiap halaman fetch sendiri-sendiri saat dibuka.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { publicApi } from '../lib/api';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      setContent(await publicApi.bootstrap());
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo(() => ({ content, status, error, reload: load }), [
    content,
    status,
    error,
    load,
  ]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent harus dipakai di dalam <ContentProvider>');
  return ctx;
}

/**
 * Mengambil satu bagian konten sekaligus status muatnya.
 *
 *   const { data: projects, status } = useSection('projects', [])
 */
export function useSection(key, fallback = null) {
  const { content, status, error, reload } = useContent();
  return {
    data: content?.[key] ?? fallback,
    section: content?.sections?.[key] ?? null,
    status,
    error,
    reload,
  };
}
