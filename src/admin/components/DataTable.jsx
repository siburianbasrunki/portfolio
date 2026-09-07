/**
 * Tabel daftar data. Tombol naik/turun memakai endpoint PATCH /reorder —
 * sengaja bukan drag & drop supaya tidak menambah dependensi dan tetap bisa
 * dipakai lewat keyboard.
 */
export default function DataTable({
  columns,
  items,
  loading,
  sortable = false,
  onEdit,
  onDelete,
  onMove,
  emptyText = "Belum ada data.",
}) {
  if (loading) return <p className="admin-muted">Memuat...</p>;
  if (items.length === 0) return <p className="admin-muted">{emptyText}</p>;

  return (
    <div className="admin-table__wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {sortable && <th className="admin-table__order">#</th>}
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            <th className="admin-table__actions">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              {sortable && (
                <td className="admin-table__order">
                  <button
                    type="button"
                    onClick={() => onMove(index, -1)}
                    disabled={index === 0}
                    title="Naikkan"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => onMove(index, 1)}
                    disabled={index === items.length - 1}
                    title="Turunkan"
                  >
                    ↓
                  </button>
                </td>
              )}

              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(item) : formatCell(item[column.key])}
                </td>
              ))}

              <td className="admin-table__actions">
                <button type="button" className="admin-btn admin-btn--sm" onClick={() => onEdit(item)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--sm admin-btn--danger"
                  onClick={() => onDelete(item)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatCell(value) {
  if (value === null || value === undefined || value === "") return <span className="admin-muted">—</span>;
  if (typeof value === "boolean") return value ? "Ya" : "Tidak";
  return String(value);
}
