/* eslint-disable react/display-name --
 * Fungsi di bawah adalah *cell renderer* — dipanggil biasa sebagai
 * `column.render(item)`, bukan dirender sebagai <Component />. ESLint salah
 * mengenalinya sebagai komponen karena mengembalikan JSX.
 */

/**
 * Definisi seluruh CMS.
 *
 * Satu entri di sini = satu menu di sidebar + satu halaman daftar + satu form.
 * Menambah entity baru (mis. "Testimoni") cukup menambah objek di bawah —
 * tidak ada komponen baru yang perlu ditulis.
 *
 * `fields` mengikuti skema validasi di portfolio-api; kalau backend menolak
 * sebuah nilai, pesan errornya otomatis muncul di field yang bersangkutan.
 */
import { Icon } from "../lib/icons";

const STATUS_OPTIONS = [
  { value: "PUBLISHED", label: "Tayang" },
  { value: "DRAFT", label: "Draft" },
  { value: "ARCHIVED", label: "Arsip" },
];

const sortField = { name: "sortOrder", label: "Urutan", type: "number", default: 0 };
const visibleField = { name: "isVisible", label: "Tampilkan", type: "boolean", default: true };

/** Kolom badge untuk kolom gambar di tabel. */
const thumb = (get) => (item) => {
  const media = get(item);
  return media ? (
    <img src={media.url} alt="" className="admin-thumb" />
  ) : (
    <span className="admin-muted">—</span>
  );
};

const iconCell = (item) =>
  item.iconKey ? (
    <span className="admin-icon-cell">
      <Icon name={item.iconKey} /> {item.iconKey}
    </span>
  ) : (
    <span className="admin-muted">—</span>
  );

const statusCell = (item) => (
  <span className={`admin-badge admin-badge--${item.status?.toLowerCase()}`}>
    {STATUS_OPTIONS.find((s) => s.value === item.status)?.label ?? item.status}
  </span>
);

const boolCell = (key) => (item) =>
  item[key] ? <span className="admin-badge admin-badge--on">Ya</span> : <span className="admin-muted">Tidak</span>;

export const RESOURCES = [
  {
    key: "pages",
    label: "Halaman & Menu",
    icon: "BiBook",
    description:
      "Judul tiap section, menu navigasi, dan meta SEO. Satu baris di sini mengatur satu halaman website.",
    sortable: true,
    columns: [
      { key: "navLabel", label: "Menu" },
      { key: "path", label: "Path" },
      { key: "title", label: "Judul Section" },
      { key: "nav", label: "Di Nav", render: boolCell("showInNav") },
      { key: "status", label: "Status", render: statusCell },
    ],
    fields: [
      { name: "key", label: "Key", type: "text", required: true, help: 'Dipakai kode, mis. "about". Hindari mengubah key halaman yang sudah ada.' },
      { name: "path", label: "Path", type: "text", required: true, help: 'Harus diawali "/", mis. /about' },
      { name: "navLabel", label: "Label Menu", type: "text", required: true },
      { name: "navIconKey", label: "Ikon Menu", type: "icon" },
      { name: "eyebrow", label: "Teks Kecil (h5)", type: "text", help: 'Mis. "Get To Know"' },
      { name: "title", label: "Judul Besar (h2)", type: "text", help: 'Mis. "About Me"' },
      { name: "subtitle", label: "Subjudul", type: "textarea", rows: 2 },
      { name: "showInNav", label: "Tampilkan di Nav", type: "boolean", default: true },
      {
        name: "showInFooter",
        label: "Tampilkan di Footer",
        type: "boolean",
        default: true,
        help: "Belum berpengaruh — footer website sedang tidak ditampilkan. Nilainya tetap disimpan.",
      },
      { name: "status", label: "Status", type: "select", options: STATUS_OPTIONS, default: "PUBLISHED", required: true },
      sortField,
      { name: "metaTitle", label: "Meta Title (SEO)", type: "text" },
      { name: "metaDescription", label: "Meta Description (SEO)", type: "textarea", rows: 2 },
    ],
  },

  {
    key: "social-links",
    label: "Sosial Media",
    icon: "BsInstagram",
    description: "Tautan yang muncul di header dan footer.",
    sortable: true,
    columns: [
      { key: "platform", label: "Platform" },
      { key: "iconKey", label: "Ikon", render: iconCell },
      { key: "url", label: "URL" },
      { key: "placement", label: "Posisi" },
      { key: "isVisible", label: "Aktif", render: boolCell("isVisible") },
    ],
    fields: [
      { name: "platform", label: "Platform", type: "text", required: true },
      { name: "url", label: "URL", type: "url", required: true },
      { name: "iconKey", label: "Ikon", type: "icon", required: true },
      {
        name: "placement",
        label: "Tampil di",
        type: "select",
        required: true,
        default: "BOTH",
        options: [
          { value: "BOTH", label: "Header & Footer" },
          { value: "HEADER", label: "Header saja" },
          { value: "FOOTER", label: "Footer saja" },
        ],
        help: 'Footer website sedang tidak ditampilkan, jadi "Footer saja" berarti tautannya tidak muncul di mana pun.',
      },
      sortField,
      visibleField,
    ],
  },

  {
    key: "stats",
    label: "Statistik About",
    icon: "FaAward",
    description: 'Kartu angka di halaman About: "2+ Years", "10+ Earned", dst.',
    sortable: true,
    columns: [
      { key: "iconKey", label: "Ikon", render: iconCell },
      { key: "title", label: "Judul" },
      { key: "value", label: "Nilai" },
      { key: "description", label: "Keterangan" },
      { key: "isVisible", label: "Aktif", render: boolCell("isVisible") },
    ],
    fields: [
      { name: "title", label: "Judul", type: "text", required: true, help: 'Mis. "Experience"' },
      { name: "value", label: "Nilai", type: "text", required: true, help: 'Mis. "2+ Years"' },
      { name: "description", label: "Keterangan", type: "text" },
      { name: "iconKey", label: "Ikon", type: "icon" },
      sortField,
      visibleField,
    ],
  },

  {
    key: "technologies",
    label: "Teknologi",
    icon: "SiReact",
    description:
      "Master data teknologi. Dipakai bersama oleh daftar Skill dan tech stack Project — ubah ikon di sini, berubah di dua halaman.",
    columns: [
      { key: "iconKey", label: "Ikon", render: iconCell },
      { key: "name", label: "Nama" },
      { key: "slug", label: "Slug" },
      {
        key: "color",
        label: "Warna",
        render: (item) =>
          item.color ? (
            <span className="admin-color-cell">
              <span style={{ background: item.color }} /> {item.color}
            </span>
          ) : (
            <span className="admin-muted">—</span>
          ),
      },
      {
        key: "usage",
        label: "Dipakai",
        render: (item) => `${item._count?.projects ?? 0} project`,
      },
    ],
    fields: [
      { name: "name", label: "Nama", type: "text", required: true },
      { name: "iconKey", label: "Ikon", type: "icon" },
      { name: "color", label: "Warna Brand", type: "color" },
    ],
  },

  {
    key: "skills",
    label: "Skill",
    icon: "BiCodeAlt",
    description: "Kartu di halaman Experience. Satu teknologi hanya bisa jadi satu skill.",
    sortable: true,
    columns: [
      {
        key: "name",
        label: "Skill",
        render: (item) => (
          <span className="admin-icon-cell">
            <Icon name={item.technology?.iconKey} />
            {item.displayName || item.technology?.name}
          </span>
        ),
      },
      { key: "category", label: "Kategori" },
      { key: "level", label: "Level" },
      { key: "isVisible", label: "Aktif", render: boolCell("isVisible") },
    ],
    fields: [
      {
        name: "technologyId",
        label: "Teknologi",
        type: "relation",
        resource: "technologies",
        labelKey: "name",
        required: true,
        help: "Ikon skill mengikuti teknologi yang dipilih.",
      },
      {
        name: "displayName",
        label: "Nama Tampilan",
        type: "text",
        help: 'Opsional. Mis. teknologi "React.js" ditampilkan sebagai "React/Next".',
      },
      { name: "category", label: "Kategori", type: "text", default: "General" },
      {
        name: "level",
        label: "Level",
        type: "select",
        default: "INTERMEDIATE",
        required: true,
        options: [
          { value: "BEGINNER", label: "Pemula" },
          { value: "INTERMEDIATE", label: "Menengah" },
          { value: "ADVANCED", label: "Mahir" },
          { value: "EXPERT", label: "Ahli" },
        ],
      },
      sortField,
      visibleField,
    ],
  },

  {
    key: "institutions",
    label: "Penerbit Sertifikat",
    icon: "TbFileCertificate",
    description: "Dicoding, Progate, Coursera, dan seterusnya.",
    columns: [
      { key: "logo", label: "Logo", render: thumb((item) => item.logo) },
      { key: "name", label: "Nama" },
      { key: "website", label: "Website" },
      {
        key: "count",
        label: "Sertifikat",
        render: (item) => `${item._count?.certificates ?? 0}`,
      },
    ],
    fields: [
      { name: "name", label: "Nama", type: "text", required: true },
      { name: "website", label: "Website", type: "url" },
      {
        name: "logoId",
        label: "Logo",
        type: "media",
        folder: "institutions",
        preview: (item) => item.logo,
      },
    ],
  },

  {
    key: "certificates",
    label: "Sertifikat",
    icon: "TbFileCertificate",
    sortable: true,
    columns: [
      { key: "image", label: "Gambar", render: thumb((item) => item.image) },
      { key: "title", label: "Judul" },
      { key: "institution", label: "Penerbit", render: (item) => item.institution?.name ?? "—" },
      { key: "status", label: "Status", render: statusCell },
    ],
    fields: [
      { name: "title", label: "Judul", type: "text", required: true },
      {
        name: "institutionId",
        label: "Penerbit",
        type: "relation",
        resource: "institutions",
        labelKey: "name",
        required: true,
      },
      {
        name: "imageId",
        label: "Gambar Sertifikat",
        type: "media",
        folder: "certificates",
        preview: (item) => item.image,
      },
      { name: "issuedAt", label: "Tanggal Terbit", type: "date" },
      { name: "expiresAt", label: "Berlaku Sampai", type: "date", help: "Kosongkan kalau berlaku selamanya." },
      { name: "credentialId", label: "ID Kredensial", type: "text" },
      { name: "credentialUrl", label: "Link Verifikasi", type: "url" },
      { name: "description", label: "Deskripsi", type: "textarea", rows: 3 },
      { name: "isFeatured", label: "Unggulan", type: "boolean" },
      { name: "status", label: "Status", type: "select", options: STATUS_OPTIONS, default: "PUBLISHED", required: true },
      sortField,
    ],
  },

  {
    key: "projects",
    label: "Project",
    icon: "AiOutlineProject",
    sortable: true,
    columns: [
      { key: "cover", label: "Cover", render: thumb((item) => item.cover) },
      { key: "title", label: "Judul" },
      {
        key: "techStack",
        label: "Tech Stack",
        render: (item) => (
          <span className="admin-tech-cell">
            {(item.techStack ?? []).map((tech) => (
              <span key={tech.id} title={tech.name}>
                <Icon name={tech.iconKey} />
              </span>
            ))}
          </span>
        ),
      },
      { key: "status", label: "Status", render: statusCell },
    ],
    fields: [
      { name: "title", label: "Judul", type: "text", required: true },
      { name: "description", label: "Deskripsi Singkat", type: "textarea", rows: 2, help: "Tampil di kartu portfolio." },
      {
        name: "coverId",
        label: "Gambar Cover",
        type: "media",
        folder: "projects",
        preview: (item) => item.cover,
      },
      {
        name: "technologyIds",
        label: "Tech Stack",
        type: "relation-multi",
        resource: "technologies",
        labelKey: "name",
        help: "Urutan di sini menentukan urutan badge di kartu.",
        fromItem: (item) => (item.techStack ?? []).map((tech) => tech.id),
      },
      { name: "githubUrl", label: "Link GitHub", type: "url" },
      { name: "demoUrl", label: "Link Demo", type: "url" },
      { name: "client", label: "Client / Organisasi", type: "text" },
      { name: "role", label: "Peran", type: "text", help: 'Mis. "Frontend Developer"' },
      { name: "startedAt", label: "Mulai", type: "date" },
      { name: "finishedAt", label: "Selesai", type: "date" },
      { name: "content", label: "Isi Panjang", type: "textarea", rows: 6, help: "Markdown, untuk halaman detail project." },
      { name: "isFeatured", label: "Unggulan", type: "boolean" },
      { name: "status", label: "Status", type: "select", options: STATUS_OPTIONS, default: "PUBLISHED", required: true },
      sortField,
    ],
  },

  {
    key: "contact-methods",
    label: "Metode Kontak",
    icon: "BiMessageRoundedDetail",
    description: "Kartu Email / WhatsApp / Messenger di halaman Contact.",
    sortable: true,
    columns: [
      { key: "iconKey", label: "Ikon", render: iconCell },
      { key: "platform", label: "Platform" },
      { key: "detail", label: "Detail" },
      { key: "isVisible", label: "Aktif", render: boolCell("isVisible") },
    ],
    fields: [
      { name: "platform", label: "Platform", type: "text", required: true },
      { name: "detail", label: "Detail", type: "text", required: true, help: 'Teks yang ditampilkan, mis. "+6282277611415"' },
      { name: "link", label: "Link", type: "text", required: true, help: "mailto:... / https://wa.me/..." },
      { name: "iconKey", label: "Ikon", type: "icon" },
      { name: "color", label: "Warna Kotak Ikon", type: "color" },
      sortField,
      visibleField,
    ],
  },

  {
    key: "work-experiences",
    label: "Riwayat Kerja",
    icon: "AiOutlineUser",
    description: "Belum ditampilkan di website, tapi datanya sudah siap dipakai kapan saja.",
    sortable: true,
    columns: [
      { key: "position", label: "Posisi" },
      { key: "company", label: "Perusahaan" },
      { key: "startedAt", label: "Mulai", render: (item) => String(item.startedAt ?? "").slice(0, 10) },
      { key: "isCurrent", label: "Sekarang", render: boolCell("isCurrent") },
    ],
    fields: [
      { name: "position", label: "Posisi", type: "text", required: true },
      { name: "company", label: "Perusahaan", type: "text", required: true },
      { name: "employmentType", label: "Tipe", type: "text", help: "Full-time / Internship / Freelance" },
      { name: "location", label: "Lokasi", type: "text" },
      { name: "startedAt", label: "Mulai", type: "date", required: true },
      { name: "finishedAt", label: "Selesai", type: "date" },
      { name: "isCurrent", label: "Masih bekerja di sini", type: "boolean" },
      { name: "description", label: "Deskripsi", type: "textarea", rows: 3 },
      { name: "highlights", label: "Pencapaian", type: "tags", rows: 4 },
      { name: "companyUrl", label: "Website Perusahaan", type: "url" },
      { name: "logoId", label: "Logo", type: "media", folder: "companies", preview: (item) => item.logo },
      sortField,
      visibleField,
    ],
  },

  {
    key: "educations",
    label: "Pendidikan",
    icon: "BiBook",
    description: "Belum ditampilkan di website, tapi datanya sudah siap dipakai kapan saja.",
    sortable: true,
    columns: [
      { key: "school", label: "Sekolah / Kampus" },
      { key: "degree", label: "Jenjang" },
      { key: "fieldOfStudy", label: "Jurusan" },
    ],
    fields: [
      { name: "school", label: "Sekolah / Kampus", type: "text", required: true },
      { name: "degree", label: "Jenjang", type: "text", help: "S1, D3, dst." },
      { name: "fieldOfStudy", label: "Jurusan", type: "text" },
      { name: "grade", label: "IPK / Nilai", type: "text" },
      { name: "startedAt", label: "Mulai", type: "date", required: true },
      { name: "finishedAt", label: "Selesai", type: "date" },
      { name: "description", label: "Deskripsi", type: "textarea", rows: 3 },
      { name: "logoId", label: "Logo", type: "media", folder: "schools", preview: (item) => item.logo },
      sortField,
      visibleField,
    ],
  },
];

/** Resource singleton — hanya satu baris, jadi langsung form tanpa tabel. */
export const SINGLETONS = [
  {
    key: "profile",
    label: "Profil",
    icon: "AiOutlineUser",
    description: "Nama, headline, bio, foto, dan file CV.",
    fields: [
      { name: "greeting", label: "Sapaan", type: "text", help: 'Mis. "Hello I\'m"' },
      { name: "fullName", label: "Nama Lengkap", type: "text", required: true },
      { name: "headline", label: "Headline", type: "text", required: true, help: 'Mis. "Front End Developer"' },
      { name: "bio", label: "Bio", type: "textarea", rows: 6, help: "Paragraf di halaman About." },
      { name: "heroImageId", label: "Foto Header", type: "media", folder: "profile", preview: (item) => item.heroImage },
      { name: "avatarId", label: "Foto About", type: "media", folder: "profile", preview: (item) => item.avatar },
      { name: "cvFileId", label: "File CV (PDF)", type: "media", folder: "profile", preview: (item) => item.cvFile },
      { name: "ctaPrimaryLabel", label: "Label Tombol CTA", type: "text", help: 'Mis. "Let\'s Talk"' },
      { name: "ctaPrimaryUrl", label: "Target Tombol CTA", type: "text", help: "Mis. /contact" },
      { name: "location", label: "Lokasi", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Telepon", type: "text" },
      { name: "availableForWork", label: "Terbuka untuk pekerjaan", type: "boolean", default: true },
    ],
  },
  {
    key: "site-settings",
    label: "Pengaturan Situs",
    icon: "CgWebsite",
    description: "Branding, SEO default, dan teks footer.",
    fields: [
      { name: "siteName", label: "Nama Situs", type: "text", required: true },
      {
        name: "brandText",
        label: "Teks Brand",
        type: "text",
        help: 'Mis. "SBRCODE". Belum ditampilkan di website — dulu dipakai logo footer.',
      },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "copyrightText", label: "Teks Copyright", type: "text" },
      { name: "primaryColor", label: "Warna Utama", type: "color" },
      { name: "metaTitle", label: "Meta Title", type: "text" },
      { name: "metaDescription", label: "Meta Description", type: "textarea", rows: 3 },
      { name: "metaKeywords", label: "Meta Keywords", type: "tags", rows: 4 },
      { name: "notifyEmail", label: "Email Notifikasi", type: "email", help: "Tujuan pemberitahuan saat ada pesan masuk." },
      { name: "logoId", label: "Logo", type: "media", folder: "brand", preview: (item) => item.logo },
      { name: "faviconId", label: "Favicon", type: "media", folder: "brand", preview: (item) => item.favicon },
      { name: "ogImageId", label: "Gambar OG (share)", type: "media", folder: "brand", preview: (item) => item.ogImage },
      { name: "isMaintenance", label: "Mode Maintenance", type: "boolean" },
    ],
  },
];

export function findResource(key) {
  return RESOURCES.find((resource) => resource.key === key) ?? null;
}

export function findSingleton(key) {
  return SINGLETONS.find((resource) => resource.key === key) ?? null;
}
