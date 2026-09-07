# Portfolio — Basrunki Siburian

Website portfolio (React + Vite) beserta CMS-nya di `/admin`. Seluruh konten
diambil dari [portfolio-api](../portfolio-api) — tidak ada lagi teks, gambar,
atau link yang ditulis langsung di kode komponen.

---

## Menjalankan

Butuh `portfolio-api` jalan lebih dulu.

```bash
cp .env.example .env      # isi VITE_API_URL
npm install
npm run dev               # http://localhost:4555
```

| Bagian | Alamat |
|---|---|
| Website | http://localhost:4555 |
| CMS | http://localhost:4555/admin |
| API | http://localhost:4551 |

Login CMS memakai akun dari `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` di
`.env` milik portfolio-api.

Port frontend diatur di `vite.config.js`; kalau diubah, tambahkan port baru itu
ke `CORS_ORIGINS` di `.env` portfolio-api — kalau tidak, browser akan memblokir
semua request ke API.

---

## Cara konten mengalir

```
portfolio-api  ──GET /api/public/bootstrap──▶  ContentProvider  ──▶  semua halaman
```

`ContentProvider` (`src/context/ContentContext.jsx`) memanggil API **sekali**
saat aplikasi dibuka, lalu membagikan hasilnya lewat `useContent()`. Pindah
halaman tidak memicu request baru.

Komponen tinggal membaca bagian yang dibutuhkan:

```jsx
const { content, status, error, reload } = useContent();

<ContentGate status={status} error={error} onRetry={reload}>
  {content.projects.map(...)}
</ContentGate>
```

`ContentGate` menangani state memuat dan gagal, jadi tiap halaman tidak perlu
menulis percabangan yang sama.

### Ikon

Database menyimpan ikon sebagai **nama string** (`"SiReact"`), bukan file.
`src/lib/icons.jsx` menerjemahkannya kembali jadi komponen `react-icons`:

```jsx
<Icon name={tech.iconKey} size="2rem" />
```

Ikon tetap SVG inline yang mewarisi warna dari CSS. Nama yang tidak terdaftar
jatuh ke ikon cadangan — salah ketik di CMS tidak membuat halaman blank.

**Menambah ikon baru:** import di `src/lib/icons.jsx`, daftarkan di objek
`ICONS`. Setelah itu ikon otomatis muncul di pemilih ikon dalam CMS.

---

## CMS (`/admin`)

| Menu | Isi |
|---|---|
| Dashboard | jumlah konten + pesan terbaru |
| Profil | nama, headline, bio, foto, file CV |
| Pengaturan Situs | branding, SEO default, teks footer |
| Halaman & Menu | judul section, urutan nav, meta SEO per halaman |
| Sosial Media | tautan header & footer |
| Statistik About | kartu angka di halaman About |
| Teknologi | master ikon, dipakai Skill **dan** tech stack Project |
| Skill | kartu di halaman Experience |
| Penerbit Sertifikat | Dicoding, Progate, Coursera, … |
| Sertifikat | 16 sertifikat + gambar |
| Project | 9 project + tech stack + cover |
| Metode Kontak | Email / WhatsApp / Messenger |
| Riwayat Kerja, Pendidikan | belum tampil di website, datanya sudah siap |
| Media | semua gambar & PDF |
| Pesan Masuk | inbox dari form kontak |
| Akun | ganti password |

### Menambah entity baru ke CMS

CMS ini digerakkan konfigurasi. Untuk menambah, misalnya, "Testimoni":

1. Tambah model di `prisma/schema.prisma` + router di portfolio-api.
2. Tambah satu objek di `src/admin/resources.jsx`.

Tidak ada komponen baru yang perlu ditulis — menu, tabel, form, validasi,
dan tombol urutan dibuat dari konfigurasi itu.

```js
{
  key: "testimonials",        // path API
  label: "Testimoni",
  icon: "FaAward",
  sortable: true,             // aktifkan tombol naik/turun
  columns: [{ key: "name", label: "Nama" }],
  fields: [
    { name: "name", label: "Nama", type: "text", required: true },
    { name: "photoId", label: "Foto", type: "media", folder: "testimonials" },
  ],
}
```

Tipe field yang tersedia: `text`, `textarea`, `url`, `email`, `number`, `date`,
`boolean`, `select`, `color`, `icon`, `media`, `tags`, `relation`,
`relation-multi`.

---

## Struktur

```
src/
  lib/
    api.js              satu-satunya tempat memanggil API
    icons.jsx           registry nama ikon → komponen react-icons
  context/
    ContentContext.jsx  memuat /api/public/bootstrap sekali
  layouts/
    PublicLayout.jsx    pembungkus halaman publik + footer
  components/
    common/             SectionHeader, ContentGate (loading & error)
    header/ nav/ about/ experience/ certificate/ portfolio/ contact/ footer/
  admin/
    AdminApp.jsx        layout + routing CMS
    AuthContext.jsx     login, refresh token, logout
    resources.jsx       definisi seluruh CMS
    components/         DataTable, ResourceForm, Field, MediaPicker, …
    pages/              Login, Dashboard, ResourcePage, Media, Messages, …
```

Halaman publik dan CMS punya cabang router terpisah di `src/main.jsx`. CMS
tidak ikut memuat konten publik, dan sebaliknya.

---

## Catatan deploy

- Set `VITE_API_URL` ke domain API production. Variabel Vite dibaca **saat
  build**, jadi mengubahnya butuh build ulang.
- Tambahkan domain frontend ke `CORS_ORIGINS` di portfolio-api.
- `/admin` dan `/about` adalah rute client-side. Host harus mengarahkan semua
  path ke `index.html` (Vercel melakukan ini otomatis untuk preset Vite).
- `/admin` tidak diblokir di level server — keamanannya ada di API. Tanpa token
  yang valid, CMS hanya menampilkan layar login dan setiap request tulis
  ditolak 401.
