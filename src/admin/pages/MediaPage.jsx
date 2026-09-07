import { useCallback, useEffect, useRef, useState } from "react";
import { adminApi } from "../../lib/api";
import { ConfirmDialog } from "../components/Modal";
import { useToast } from "../components/Toast";

export default function MediaPage() {
  const toast = useToast();
  const fileInput = useRef(null);

  const [items, setItems] = useState([]);
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState("");
  const [search, setSearch] = useState("");
  const [uploadFolder, setUploadFolder] = useState("misc");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

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

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (const file of files) {
        await adminApi.upload(file, { folder: uploadFolder });
      }
      toast.success(`${files.length} file diunggah`);
      await load();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await adminApi.remove("media", deleting.id);
      toast.success("File dihapus");
      setDeleting(null);
      await load();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  const copyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL disalin");
    } catch {
      toast.error("Browser menolak akses clipboard");
    }
  };

  return (
    <div>
      <header className="admin-page__header">
        <div>
          <h1>Media</h1>
          <p className="admin-muted">
            Semua gambar dan PDF. Menghapus file di sini membuat konten yang memakainya kehilangan
            gambar, tapi kontennya sendiri tetap ada.
          </p>
        </div>
      </header>

      <div className="admin-toolbar">
        <select value={activeFolder} onChange={(event) => setActiveFolder(event.target.value)}>
          <option value="">Semua folder</option>
          {folders.map((folder) => (
            <option key={folder.folder} value={folder.folder}>
              {folder.folder} ({folder.count})
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Cari nama file..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="admin-toolbar__upload">
          <input
            type="text"
            value={uploadFolder}
            onChange={(event) => setUploadFolder(event.target.value)}
            placeholder="folder tujuan"
            title="Folder tujuan upload"
          />
          <label className="admin-btn admin-btn--primary">
            {uploading ? "Mengunggah..." : "Upload"}
            <input
              ref={fileInput}
              type="file"
              hidden
              multiple
              accept="image/*,application/pdf"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {loading ? (
        <p className="admin-muted">Memuat...</p>
      ) : items.length === 0 ? (
        <p className="admin-muted">Belum ada file.</p>
      ) : (
        <div className="media-grid">
          {items.map((media) => (
            <figure key={media.id} className="media-grid__item">
              <div className="media-grid__thumb">
                {media.mimeType === "application/pdf" ? (
                  <span className="media-library__pdf">PDF</span>
                ) : (
                  <img src={media.url} alt={media.alt || media.fileName} loading="lazy" />
                )}
              </div>
              <figcaption>
                <strong title={media.fileName}>{media.fileName}</strong>
                <span className="admin-muted">
                  {media.folder} · {Math.round(media.sizeBytes / 1024)} KB
                </span>
                <div className="media-grid__actions">
                  <button
                    type="button"
                    className="admin-btn admin-btn--sm"
                    onClick={() => copyUrl(media.url)}
                  >
                    Salin URL
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--sm admin-btn--danger"
                    onClick={() => setDeleting(media)}
                  >
                    Hapus
                  </button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {deleting && (
        <ConfirmDialog
          title="Hapus file?"
          message={`"${deleting.fileName}" akan dihapus permanen dari server.`}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
          busy={busy}
        />
      )}
    </div>
  );
}
