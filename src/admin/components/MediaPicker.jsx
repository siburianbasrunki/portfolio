import { useCallback, useEffect, useState } from "react";
import { adminApi } from "../../lib/api";
import Modal from "./Modal";
import { useToast } from "./Toast";

/**
 * Pemilih gambar/PDF untuk field bertipe `media`.
 *
 * Nilai yang disimpan ke form adalah `mediaId`. Preview-nya diambil dari
 * objek media yang menyertai data (mis. `project.cover`), atau dari hasil
 * pilih/upload terbaru.
 */
export default function MediaPicker({ value, preview, folder = "misc", onChange }) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(preview ?? null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setCurrent(preview ?? null);
  }, [preview]);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const media = await adminApi.upload(file, { folder });
      setCurrent(media);
      onChange(media.id);
      toast.success("File berhasil diunggah");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const pick = (media) => {
    setCurrent(media);
    onChange(media.id);
    setOpen(false);
  };

  const clear = () => {
    setCurrent(null);
    onChange(null);
  };

  const isPdf = current?.mimeType === "application/pdf" || current?.url?.endsWith(".pdf");

  return (
    <div className="media-picker">
      <div className="media-picker__preview">
        {current ? (
          isPdf ? (
            <a href={current.url} target="_blank" rel="noopener noreferrer" className="media-picker__pdf">
              PDF: {current.fileName ?? "lihat file"}
            </a>
          ) : (
            <img src={current.url} alt={current.alt || ""} />
          )
        ) : (
          <span className="media-picker__empty">Belum ada file</span>
        )}
      </div>

      <div className="media-picker__actions">
        <button type="button" className="admin-btn admin-btn--sm" onClick={() => setOpen(true)}>
          Pilih dari library
        </button>

        <label className="admin-btn admin-btn--sm">
          {uploading ? "Mengunggah..." : "Upload baru"}
          <input
            type="file"
            hidden
            accept="image/*,application/pdf"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>

        {value && (
          <button type="button" className="admin-btn admin-btn--sm admin-btn--ghost" onClick={clear}>
            Kosongkan
          </button>
        )}
      </div>

      {open && <MediaLibraryModal folder={folder} onPick={pick} onClose={() => setOpen(false)} />}
    </div>
  );
}

function MediaLibraryModal({ folder, onPick, onClose }) {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(folder);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [media, folderList] = await Promise.all([
        adminApi.list("media", { folder: activeFolder, search, limit: 100 }),
        adminApi.list("media/folders"),
      ]);
      setItems(media.items);
      setFolders(folderList.items);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [activeFolder, search, toast]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Modal title="Media Library" onClose={onClose} wide>
      <div className="media-library__toolbar">
        <select value={activeFolder} onChange={(event) => setActiveFolder(event.target.value)}>
          <option value="">Semua folder</option>
          {folders.map((item) => (
            <option key={item.folder} value={item.folder}>
              {item.folder} ({item.count})
            </option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Cari nama file..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <p className="admin-muted">Memuat...</p>
      ) : items.length === 0 ? (
        <p className="admin-muted">Belum ada file di folder ini.</p>
      ) : (
        <div className="media-library__grid">
          {items.map((media) => (
            <button
              key={media.id}
              type="button"
              className="media-library__item"
              onClick={() => onPick(media)}
              title={media.fileName}
            >
              {media.mimeType === "application/pdf" ? (
                <span className="media-library__pdf">PDF</span>
              ) : (
                <img src={media.url} alt={media.alt || media.fileName} loading="lazy" />
              )}
              <span className="media-library__name">{media.fileName}</span>
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}
