import { useMemo, useState } from "react";
import { ICON_NAMES, Icon } from "../../lib/icons";

/**
 * Memilih ikon dari registry `src/lib/icons.jsx`. Hanya nama yang terdaftar
 * di sana yang boleh dipilih — mencegah menyimpan nama ikon yang nanti tidak
 * bisa dirender di website.
 */
export default function IconPicker({ value, onChange }) {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const names = q ? ICON_NAMES.filter((name) => name.toLowerCase().includes(q)) : ICON_NAMES;
    return names.slice(0, 60);
  }, [query]);

  return (
    <div className="icon-picker">
      <div className="icon-picker__current">
        <span className="icon-picker__preview">
          {value ? <Icon name={value} size="1.4rem" /> : "—"}
        </span>
        <input
          type="text"
          value={value ?? ""}
          placeholder="Nama ikon, mis. SiReact"
          onChange={(event) => onChange(event.target.value || null)}
        />
        {value && (
          <button
            type="button"
            className="admin-btn admin-btn--sm admin-btn--ghost"
            onClick={() => onChange(null)}
          >
            Kosongkan
          </button>
        )}
      </div>

      <input
        type="search"
        className="icon-picker__search"
        placeholder="Cari ikon..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <div className="icon-picker__grid">
        {matches.map((name) => (
          <button
            key={name}
            type="button"
            title={name}
            className={`icon-picker__item ${value === name ? "is-active" : ""}`}
            onClick={() => onChange(name)}
          >
            <Icon name={name} size="1.2rem" />
          </button>
        ))}
      </div>
      {matches.length === 0 && <p className="admin-muted">Tidak ada ikon yang cocok.</p>}
    </div>
  );
}
