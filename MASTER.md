# MASTER — Sistem Desain Portfolio

**Neubrutalism Kertas Krem** · v1 · Divalidasi 2026-09-06

Sumber kebenaran tunggal untuk seluruh tampilan portfolio dan CMS admin.
Setiap warna, ukuran huruf, jarak, dan durasi di kode harus berasal dari token
di sini. Tidak ada nilai hex atau angka ajaib yang ditulis langsung di komponen.

Implementasi token: `src/styles/tokens.css`.

---

## Thesis

**Visual** — Kanvas `#FFFDF5` dengan tinta hitam pekat; tiga blok jenuh dipakai
sebagai isian penuh, bukan aksen. Space Grotesk 700 melawan JetBrains Mono huruf
besar dengan kontras ukuran ekstrem. Spasi berbasis 8px yang lapang. Sudut tajam
maksimal 4px, border 3px, bayangan offset 6px tanpa blur.

**Interaksi** — Mekanis dan kering. 120ms, `cubic-bezier(.2,.9,.3,1)`. Hover
mengangkat 2px sambil memanjangkan bayangan ke 10px; klik menurunkan 4px sampai
bayangan habis. Reveal berupa geseran posisi tanpa fade, stagger 40ms.
**Terlarang:** bounce, elastic, spring overshoot, blur, crossfade opacity.

---

## 1. Warna

| Token | Nilai | Peran |
|---|---|---|
| `--nb-paper` | `#FFFDF5` | kanvas halaman |
| `--nb-ink` | `#000000` | teks, border, bayangan |
| `--nb-well` | `#E8E4D8` | area cekung: input, placeholder, track |
| `--nb-muted` | `#5A5648` | teks sekunder |
| `--nb-yellow` | `#FFE14D` | aksi utama, halaman aktif |
| `--nb-pink` | `#FF6B9D` | penanda unggulan |
| `--nb-blue` | `#4DA3FF` | tautan, media, demo |
| `--nb-tosca` | `#00C2A8` | status berhasil / tayang |
| `--nb-red` | `#FF4D4D` | hapus, error |

### Kontras (WCAG, tinta hitam di atas blok)

| Kombinasi | Rasio | Level |
|---|---|---|
| ink / paper | 20.62:1 | AAA |
| ink / well | 16.52:1 | AAA |
| ink / yellow | 16.13:1 | AAA |
| ink / tosca | 9.28:1 | AAA |
| ink / blue | 8.00:1 | AAA |
| ink / pink | 7.84:1 | AAA |
| muted / paper | 7.21:1 | AAA |

Blok sengaja dipilih terang supaya teks **selalu** bisa hitam. Konsekuensi yang
harus dihormati: sistem ini tidak punya blok gelap, dan tidak pernah memakai
teks putih di atas warna.

### Aturan pakai

- Satu halaman memakai **maksimal dua** warna blok. Lebih dari itu berubah jadi
  ruang bermain.
- `--nb-red` hanya untuk aksi merusak dan pesan error. Tidak pernah dekoratif.
- Warna tidak pernah jadi satu-satunya pembawa makna — status selalu punya teks.

### Mode gelap

Tidak ada, dan ini keputusan. Menggelapkan kanvas membatalkan seluruh tabel
kontras di atas. Kalau dark mode dibutuhkan nanti, itu palet kedua yang harus
dirancang utuh, bukan hasil pembalikan.

---

## 2. Tipografi

Dua peran saja: **Space Grotesk** membawa suara, **JetBrains Mono** membawa data.

| Token | Font | Ukuran | Detail |
|---|---|---|---|
| `--nb-fs-display` | Space Grotesk 700 | `clamp(2.75rem, 9vw, 6rem)` | tracking −0.04em, leading 0.92 |
| `--nb-fs-h2` | Space Grotesk 700 | `clamp(1.6rem, 4vw, 2.4rem)` | tracking −0.025em, leading 1.05 |
| `--nb-fs-h3` | Space Grotesk 700 | `1.05rem` | tracking −0.01em |
| `--nb-fs-body` | Space Grotesk 400 | `1rem` | leading 1.6, maks 62ch |
| `--nb-fs-label` | JetBrains Mono 700 | `0.7rem` | tracking 0.14em, UPPERCASE |
| `--nb-fs-data` | JetBrains Mono 500 | `0.85rem` | `tabular-nums` |

Tidak ada ukuran di antara label dan judul. Lompatan itu yang menciptakan
ketegangan — mengisinya melunakkan seluruh sistem.

Angka yang berjajar dalam kolom selalu `font-variant-numeric: tabular-nums`.

---

## 3. Struktur

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `--nb-bd` | `3px` | border struktural: kartu, tombol, nav |
| `--nb-bd-thin` | `2px` | border di dalam kartu: badge, thumbnail |
| `--nb-r` | `4px` | radius kartu & tombol |
| `--nb-r-pill` | `999px` | **hanya** nav dan chip |
| `--nb-sh-sm` | `3px 3px 0 var(--nb-ink)` | elemen kecil, input |
| `--nb-sh` | `6px 6px 0 var(--nb-ink)` | kartu, tombol |
| `--nb-sh-lg` | `10px 10px 0 var(--nb-ink)` | saat hover |

Bayangan tidak pernah punya blur dan tidak pernah berwarna selain tinta.

### Jarak — basis 8px

| Token | Nilai |
|---|---|
| `--nb-s1` … `--nb-s9` | `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` px |

---

## 4. Gerakan

| Token | Nilai | Kapan |
|---|---|---|
| `--nb-dur-fast` | `80ms` | perubahan warna, focus ring |
| `--nb-dur` | `120ms` | hover, tekan — default |
| `--nb-dur-slow` | `200ms` | modal, drawer |
| `--nb-ease` | `cubic-bezier(.2,.9,.3,1)` | semuanya |

| Gerak | Nilai |
|---|---|
| Angkat saat hover | `translate(-2px, -2px)` + bayangan `6px → 10px` |
| Turun saat ditekan | `translate(4px, 4px)` + bayangan `0` |
| Stagger antar item | `40ms`, maksimal 8 item lalu berhenti bertambah |
| Reveal | geser `translateY(12px) → 0`, **tanpa** fade |

### Aturan yang tidak bisa ditawar

- Hanya `transform`, `opacity`, dan `box-shadow` yang dianimasikan. Tidak pernah
  `width`, `height`, `top`, `left`.
- Tidak pernah `transition: all` — properti selalu disebut satu per satu.
- `prefers-reduced-motion: reduce` memotong semua durasi ke `0.01ms`.
- Animasi masuk tidak pernah `ease-in`.

---

## 5. Komponen

Setiap elemen interaktif wajib punya kelima state: **default, hover, focus,
active, disabled**. Focus memakai outline biru `--nb-bd` dengan offset 3px, dan
tidak pernah dihilangkan tanpa pengganti.

| Komponen | Bentuk |
|---|---|
| Tombol | isian blok, border 3px, `--nb-sh`, radius 4px |
| Kartu | paper, border 3px, `--nb-sh`, radius 4px |
| Badge | border 2px, radius 2px, mono uppercase |
| Input | paper, border 3px, `--nb-sh-sm`; fokus menaikkan ke `--nb-sh` |
| Nav | pill, border 3px, `--nb-sh`; aktif = blok kuning |

---

## 6. Navigasi

Pola, posisi, ikon, dan perilaku **tidak berubah** dari desain sebelumnya:
floating bar di bawah layar. Hanya kulitnya yang mengikuti sistem ini. Halaman
aktif ditandai blok kuning berbingkai, bukan perubahan warna ikon — penanda
bentuk lebih terbaca daripada penanda warna.

---

## 7. Cakupan

Sistem ini berlaku untuk **seluruh** permukaan: halaman publik (Home, About,
Experience, Certificate, Portfolio, Contact) dan CMS admin.

Admin memakai token yang sama; yang berbeda hanya kerapatannya — tabel dan form
memakai jarak satu langkah lebih rapat.

### Footer: dihapus

Footer website dihapus atas permintaan. Konsekuensi yang perlu diingat:

- Social link dengan `placement = FOOTER` (Facebook, Twitter) tidak muncul di
  mana pun. Ubah ke `HEADER` atau `BOTH` kalau ingin ditampilkan.
- `pages.show_in_footer` dan `site_settings.brand_text` jadi tidak terpakai.
- Kolomnya tetap ada di database dan tetap bisa diisi dari CMS, supaya datanya
  tidak hilang kalau footer dipasang kembali. Field-field itu diberi keterangan
  di admin bahwa efeknya sedang nihil.
