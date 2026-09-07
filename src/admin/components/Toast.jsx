import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (type, message) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => dismiss(id), type === "error" ? 6000 : 3500);
    },
    [dismiss],
  );

  const value = useMemo(
    () => ({
      success: (message) => push("success", message),
      error: (message) => push("error", message),
      info: (message) => push("info", message),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="admin-toasts" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`admin-toast admin-toast--${toast.type}`}>
            <span>{toast.message}</span>
            <button type="button" onClick={() => dismiss(toast.id)} aria-label="Tutup">
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus dipakai di dalam <ToastProvider>");
  return ctx;
}
