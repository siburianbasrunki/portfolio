import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { adminApi, setSessionExpiredHandler, tokenStore } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("checking"); // checking | authenticated | anonymous

  const logout = useCallback(async () => {
    await adminApi.logout();
    tokenStore.clear();
    setUser(null);
    setStatus("anonymous");
  }, []);

  // Saat refresh token juga habis, api.js memanggil ini supaya UI langsung
  // kembali ke halaman login alih-alih menampilkan tabel kosong.
  useEffect(() => {
    setSessionExpiredHandler(() => {
      setUser(null);
      setStatus("anonymous");
    });
    return () => setSessionExpiredHandler(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!tokenStore.get()) {
        if (!cancelled) setStatus("anonymous");
        return;
      }
      try {
        const me = await adminApi.me();
        if (cancelled) return;
        setUser(me);
        setStatus("authenticated");
      } catch {
        if (cancelled) return;
        tokenStore.clear();
        setStatus("anonymous");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const result = await adminApi.login(email, password);
    tokenStore.set(result.accessToken);
    setUser(result.user);
    setStatus("authenticated");
    return result.user;
  }, []);

  const value = useMemo(() => ({ user, status, login, logout }), [user, status, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}
