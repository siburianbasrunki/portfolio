import { motion } from 'framer-motion';

/**
 * Judul di atas tiap halaman ("Get To Know" / "About Me"). Isinya datang dari
 * tabel `pages`, jadi bisa diubah dari admin tanpa menyentuh kode.
 */
export default function SectionHeader({ section, fallbackEyebrow, fallbackTitle }) {
  const eyebrow = section?.eyebrow ?? fallbackEyebrow;
  const title = section?.title ?? fallbackTitle;
  const subtitle = section?.subtitle;

  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {eyebrow && (
        <motion.h5
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {eyebrow}
        </motion.h5>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {title}
        </motion.h2>
      )}
      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
