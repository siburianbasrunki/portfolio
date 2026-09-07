import { useCallback, useEffect, useState } from "react";
import { adminApi } from "../../lib/api";
import { findResource } from "../resources";
import DataTable from "../components/DataTable";
import ResourceForm from "../components/ResourceForm";
import Modal, { ConfirmDialog } from "../components/Modal";
import { useToast } from "../components/Toast";

/**
 * Satu halaman untuk semua resource berbentuk daftar. Yang membedakan hanya
 * konfigurasi di resources.jsx — kolom tabel dan field form.
 */
export default function ResourcePage({ resourceKey }) {
  const resource = findResource(resourceKey);
  const toast = useToast();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // objek item, atau "new"
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!resource) return;
    setLoading(true);
    try {
      const { items: rows } = await adminApi.list(resource.key, { search, limit: 100 });
      setItems(rows);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [resource, search, toast]);

  useEffect(() => {
    // Reset saat pindah resource supaya tabel lama tidak sempat terlihat.
    setItems([]);
    setSearch("");
    setEditing(null);
  }, [resourceKey]);

  useEffect(() => {
    load();
  }, [load]);

  if (!resource) return <p className="admin-muted">Resource tidak dikenal.</p>;

  const handleSubmit = async (payload) => {
    if (editing === "new") {
      await adminApi.create(resource.key, payload);
      toast.success(`${resource.label} ditambahkan`);
    } else {
      await adminApi.update(resource.key, editing.id, payload);
      toast.success(`${resource.label} diperbarui`);
    }
    setEditing(null);
    await load();
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await adminApi.remove(resource.key, deleting.id);
      toast.success(`${resource.label} dihapus`);
      setDeleting(null);
      await load();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  /**
   * Tukar posisi dua baris lalu kirim seluruh urutan baru. Tampilan diperbarui
   * lebih dulu supaya terasa responsif; kalau server menolak, data dimuat ulang.
   */
  const handleMove = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);

    try {
      await adminApi.reorder(
        resource.key,
        next.map((item, order) => ({ id: item.id, sortOrder: order })),
      );
    } catch (error) {
      toast.error(error.message);
      await load();
    }
  };

  return (
    <div>
      <header className="admin-page__header">
        <div>
          <h1>{resource.label}</h1>
          {resource.description && <p className="admin-muted">{resource.description}</p>}
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={() => setEditing("new")}
        >
          + Tambah
        </button>
      </header>

      <div className="admin-toolbar">
        <input
          type="search"
          placeholder={`Cari ${resource.label.toLowerCase()}...`}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <span className="admin-muted">{items.length} data</span>
      </div>

      <DataTable
        columns={resource.columns}
        items={items}
        loading={loading}
        sortable={resource.sortable}
        onEdit={setEditing}
        onDelete={setDeleting}
        onMove={handleMove}
      />

      {editing && (
        <Modal
          title={editing === "new" ? `Tambah ${resource.label}` : `Edit ${resource.label}`}
          onClose={() => setEditing(null)}
          wide
        >
          <ResourceForm
            fields={resource.fields}
            item={editing === "new" ? null : editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          title={`Hapus ${resource.label}?`}
          message="Data yang dihapus tidak bisa dikembalikan."
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
          busy={busy}
        />
      )}
    </div>
  );
}
