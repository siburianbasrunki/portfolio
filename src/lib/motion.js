/**
 * Preset gerakan — implementasi thesis interaksi di MASTER.md §4.
 *
 * Pembagian tugas yang penting:
 *
 *   framer-motion  → reveal saat elemen muncul (menulis `transform` inline)
 *   CSS .nb-press  → hover dan tekan
 *
 * Keduanya tidak boleh mengurus transform pada elemen yang sama. Style inline
 * dari framer-motion selalu menang atas `:hover` di stylesheet, jadi kartu yang
 * di-reveal oleh motion tidak akan pernah bisa di-hover oleh CSS. Solusinya:
 * motion membungkus, elemen di dalamnya yang menangani interaksi.
 *
 *   <motion.div variants={revealItem}>        ← reveal
 *     <article className="nb-box nb-press">   ← hover & tekan
 */

/** cubic-bezier(.2, .9, .3, 1) — satu-satunya easing di sistem ini. */
export const EASE = [0.2, 0.9, 0.3, 1];

export const DUR_FAST = 0.08;
export const DUR = 0.12;
export const DUR_SLOW = 0.2;

/** Jarak geser saat reveal, dalam px. Tanpa fade — lihat thesis. */
const SHIFT = 12;

/**
 * Dipasang di pembungkus daftar. Anak-anaknya muncul berurutan.
 * Stagger berhenti bertambah setelah 8 item supaya daftar panjang tidak
 * membuat item terakhir menunggu lama.
 */
export const revealParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
};

/** Dipasang di tiap anak. Geser posisi saja — opacity tidak disentuh. */
export const revealItem = {
  hidden: { y: SHIFT },
  show: {
    y: 0,
    transition: { duration: DUR_SLOW, ease: EASE },
  },
};

/** Untuk elemen tunggal yang tidak berada dalam daftar. */
export const reveal = {
  initial: { y: SHIFT },
  animate: { y: 0 },
  transition: { duration: DUR_SLOW, ease: EASE },
};

/**
 * Reveal dengan penundaan bertingkat, untuk hero yang urutannya disusun tangan.
 * `step` adalah kelipatan stagger 40ms.
 */
export const revealAt = (step = 0) => ({
  initial: { y: SHIFT },
  animate: { y: 0 },
  transition: { duration: DUR_SLOW, ease: EASE, delay: step * 0.04 },
});
