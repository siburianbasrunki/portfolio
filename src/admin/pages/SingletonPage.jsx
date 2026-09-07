import { useCallback, useEffect, useState } from "react";
import { adminApi } from "../../lib/api";
import { findSingleton } from "../resources";
import ResourceForm from "../components/ResourceForm";
import { useToast } from "../components/Toast";

/** Halaman untuk resource yang isinya selalu satu baris: Profil & Pengaturan Situs. */
export default function SingletonPage({ resourceKey }) {
  const resource = findSingleton(resourceKey);
  const toast = useToast();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!resource) return;
    setLoading(true);
    try {
      setItem(await adminApi.getOne(resource.key));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [resource, toast]);

  useEffect(() => {
    load();
  }, [load]);

  if (!resource) return <p className="admin-muted">Resource tidak dikenal.</p>;

  const handleSubmit = async (payload) => {
    const updated = await adminApi.updateOne(resource.key, payload);
    setItem(updated);
    toast.success(`${resource.label} disimpan`);
  };

  return (
    <div>
      <header className="admin-page__header">
        <div>
          <h1>{resource.label}</h1>
          {resource.description && <p className="admin-muted">{resource.description}</p>}
        </div>
      </header>

      {loading ? (
        <p className="admin-muted">Memuat...</p>
      ) : (
        <div className="admin-card">
          {/* key memaksa form dibuat ulang setelah simpan, supaya preview
              gambar ikut menyegarkan diri. */}
          <ResourceForm
            key={item?.updatedAt ?? "form"}
            fields={resource.fields}
            item={item}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}
