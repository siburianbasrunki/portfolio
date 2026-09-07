import { useEffect, useState } from "react";
import { adminApi } from "../../lib/api";
import MediaPicker from "./MediaPicker";
import IconPicker from "./IconPicker";

/** Mengambil daftar pilihan untuk field bertipe relation / relation-multi. */
function useRelationOptions(resource, labelKey = "name") {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let cancelled = false;
    if (!resource) return undefined;

    adminApi
      .list(resource, { limit: 100 })
      .then(({ items }) => {
        if (cancelled) return;
        setOptions(items.map((item) => ({ value: item.id, label: item[labelKey] ?? item.id })));
      })
      .catch(() => {
        if (!cancelled) setOptions([]);
      });

    return () => {
      cancelled = true;
    };
  }, [resource, labelKey]);

  return options;
}

/**
 * Satu field form. Semua halaman admin memakai komponen ini, jadi menambah
 * tipe input baru cukup dilakukan di satu tempat.
 */
export default function Field({ field, value, error, preview, onChange }) {
  const { name, label, type = "text", help, required, options: staticOptions, rows } = field;
  const relationOptions = useRelationOptions(
    type === "relation" || type === "relation-multi" ? field.resource : null,
    field.labelKey,
  );
  const options = staticOptions ?? relationOptions;

  const set = (next) => onChange(name, next);

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            id={name}
            rows={rows ?? 4}
            value={value ?? ""}
            onChange={(event) => set(event.target.value)}
          />
        );

      case "boolean":
        return (
          <label className="admin-switch">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(event) => set(event.target.checked)}
            />
            <span>{value ? "Aktif" : "Nonaktif"}</span>
          </label>
        );

      case "select":
        return (
          <select id={name} value={value ?? ""} onChange={(event) => set(event.target.value || null)}>
            {!required && <option value="">— tidak dipilih —</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "relation":
        return (
          <select id={name} value={value ?? ""} onChange={(event) => set(event.target.value || null)}>
            <option value="">— pilih —</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "relation-multi":
        return <MultiRelation value={value ?? []} options={options} onChange={set} />;

      // Array string (mis. highlights, metaKeywords) — satu baris satu item.
      case "tags":
        return (
          <textarea
            id={name}
            rows={rows ?? 3}
            value={Array.isArray(value) ? value.join("\n") : ""}
            placeholder="Satu baris satu item"
            onChange={(event) =>
              set(
                event.target.value
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean),
              )
            }
          />
        );

      case "media":
        return (
          <MediaPicker
            value={value}
            preview={preview}
            folder={field.folder}
            onChange={(mediaId) => set(mediaId)}
          />
        );

      case "icon":
        return <IconPicker value={value} onChange={set} />;

      case "color":
        return (
          <div className="admin-color">
            <input
              type="color"
              value={value || "#00ff00"}
              onChange={(event) => set(event.target.value)}
            />
            <input
              type="text"
              value={value ?? ""}
              placeholder="#25D366"
              onChange={(event) => set(event.target.value || null)}
            />
          </div>
        );

      case "number":
        return (
          <input
            id={name}
            type="number"
            value={value ?? ""}
            onChange={(event) => set(event.target.value === "" ? null : Number(event.target.value))}
          />
        );

      case "date":
        return (
          <input
            id={name}
            type="date"
            value={value ? String(value).slice(0, 10) : ""}
            onChange={(event) => set(event.target.value || null)}
          />
        );

      default:
        return (
          <input
            id={name}
            type={type === "password" ? "password" : "text"}
            inputMode={type === "url" ? "url" : undefined}
            value={value ?? ""}
            onChange={(event) => set(event.target.value)}
          />
        );
    }
  };

  return (
    <div className={`admin-field ${error ? "has-error" : ""}`}>
      <label htmlFor={name}>
        {label}
        {required && <span className="admin-required"> *</span>}
      </label>
      {renderInput()}
      {help && !error && <small className="admin-muted">{help}</small>}
      {error && <small className="admin-error-text">{error}</small>}
    </div>
  );
}

/**
 * Pilihan ganda yang urutannya bermakna — urutan tech stack di kartu project
 * mengikuti urutan di sini, jadi item bisa digeser naik/turun.
 */
function MultiRelation({ value, options, onChange }) {
  const selected = value.map((id) => options.find((o) => o.value === id)).filter(Boolean);
  const available = options.filter((option) => !value.includes(option.value));

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="multi-relation">
      <div className="multi-relation__selected">
        {selected.length === 0 && <span className="admin-muted">Belum ada yang dipilih</span>}
        {selected.map((option, index) => (
          <span key={option.value} className="multi-relation__chip">
            <button type="button" onClick={() => move(index, -1)} disabled={index === 0} title="Naik">
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(index, 1)}
              disabled={index === selected.length - 1}
              title="Turun"
            >
              ↓
            </button>
            {option.label}
            <button
              type="button"
              className="multi-relation__remove"
              onClick={() => onChange(value.filter((id) => id !== option.value))}
              title="Hapus"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <select
        value=""
        onChange={(event) => {
          if (event.target.value) onChange([...value, event.target.value]);
        }}
      >
        <option value="">+ Tambah...</option>
        {available.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
