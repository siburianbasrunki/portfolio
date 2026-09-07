import { useMemo, useState } from "react";
import Field from "./Field";

/** Nilai awal form untuk data baru. */
function blankValues(fields) {
  return fields.reduce((acc, field) => {
    if (field.default !== undefined) acc[field.name] = field.default;
    else if (field.type === "boolean") acc[field.name] = false;
    else if (field.type === "relation-multi" || field.type === "tags") acc[field.name] = [];
    else if (field.type === "number") acc[field.name] = 0;
    else acc[field.name] = "";
    return acc;
  }, {});
}

/** Ambil nilai awal dari data yang sedang diedit. */
function valuesFromItem(fields, item) {
  return fields.reduce((acc, field) => {
    const raw = field.fromItem ? field.fromItem(item) : item[field.name];
    if (field.type === "relation-multi" || field.type === "tags") acc[field.name] = raw ?? [];
    else if (field.type === "boolean") acc[field.name] = Boolean(raw);
    else if (field.type === "date") acc[field.name] = raw ? String(raw).slice(0, 10) : null;
    else acc[field.name] = raw ?? (field.type === "number" ? 0 : "");
    return acc;
  }, {});
}

/**
 * Form generik. Bentuknya sepenuhnya ditentukan array `fields` dari
 * resources.js — menambah kolom baru tidak butuh komponen baru.
 */
export default function ResourceForm({ fields, item, onSubmit, onCancel, submitLabel = "Simpan" }) {
  const initial = useMemo(
    () => (item ? valuesFromItem(fields, item) : blankValues(fields)),
    [fields, item],
  );

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setErrors({});
    setFormError(null);

    // String kosong dikirim sebagai null supaya kolom opsional benar-benar
    // kosong di database, bukan berisi "".
    const payload = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value === "" ? null : value]),
    );

    try {
      await onSubmit(payload);
    } catch (error) {
      const fieldErrors = error.fieldErrors ?? {};
      setErrors(fieldErrors);
      if (Object.keys(fieldErrors).length === 0) setFormError(error.message);
      else setFormError("Periksa kembali isian yang ditandai merah.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={values[field.name]}
          error={errors[field.name]}
          preview={field.preview && item ? field.preview(item) : null}
          onChange={handleChange}
        />
      ))}

      {formError && <p className="admin-error-box">{formError}</p>}

      <div className="admin-form__actions">
        {onCancel && (
          <button type="button" className="admin-btn" onClick={onCancel} disabled={saving}>
            Batal
          </button>
        )}
        <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
          {saving ? "Menyimpan..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
