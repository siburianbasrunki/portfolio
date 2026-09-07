/**
 * Ikon disimpan di database sebagai nama string (mis. "SiPostgresql"), bukan
 * file gambar. Registry ini menerjemahkannya kembali jadi komponen react-icons.
 *
 * Alasannya: ikon tetap SVG inline yang mewarisi `color` dari CSS, tidak
 * berubah jadi <img> yang lebih berat dan tidak bisa diwarnai.
 *
 * Menambah ikon baru: import di sini, daftarkan di ICONS, lalu pakai namanya
 * di admin. Nama yang tidak dikenal jatuh ke ikon cadangan, bukan crash.
 */
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineProject,
  AiFillHtml5,
  AiFillCloud,
} from 'react-icons/ai';
import { BiBook, BiMessageRoundedDetail, BiCopyright, BiCodeAlt } from 'react-icons/bi';
import { BsLinkedin, BsInstagram, BsGithub, BsFacebook, BsTwitter, BsYoutube } from 'react-icons/bs';
import { TbFileCertificate, TbBrandCss3, TbBrandJavascript } from 'react-icons/tb';
import { FaAward, FaArrowLeft, FaArrowRight, FaLaravel } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { HiOutlineMail, HiOutlinePaperAirplane } from 'react-icons/hi';
import { RiEmotionLine } from 'react-icons/ri';
import { FiGithub, FiExternalLink, FiUser, FiMessageSquare } from 'react-icons/fi';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiBootstrap,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiReactrouter,
  SiReactquery,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiPhp,
  SiLaravel,
  SiGooglecloud,
  SiCloudinary,
  SiGit,
  SiMessenger,
  SiWhatsapp,
  SiTelegram,
  SiFigma,
  SiDocker,
} from 'react-icons/si';

export const ICONS = {
  // navigasi
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineProject,
  BiBook,
  BiMessageRoundedDetail,
  BiCodeAlt,
  TbFileCertificate,
  // sosial
  BsLinkedin,
  BsInstagram,
  BsGithub,
  BsFacebook,
  BsTwitter,
  BsYoutube,
  // statistik & umum
  FaAward,
  FaArrowLeft,
  FaArrowRight,
  FaLaravel,
  CgWebsite,
  BiCopyright,
  RiEmotionLine,
  FiGithub,
  FiExternalLink,
  FiUser,
  FiMessageSquare,
  // kontak
  HiOutlineMail,
  HiOutlinePaperAirplane,
  SiMessenger,
  SiWhatsapp,
  SiTelegram,
  // teknologi
  AiFillHtml5,
  AiFillCloud,
  TbBrandCss3,
  TbBrandJavascript,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiBootstrap,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiReactrouter,
  SiReactquery,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiPhp,
  SiLaravel,
  SiGooglecloud,
  SiCloudinary,
  SiGit,
  SiFigma,
  SiDocker,
};

/** Nama ikon yang tersedia — dipakai dropdown pemilih ikon di admin. */
export const ICON_NAMES = Object.keys(ICONS).sort();

/**
 * <Icon name="SiReact" size="2rem" />
 *
 * `name` boleh null/tidak dikenal; komponen memilih fallback agar layout tidak
 * rusak hanya karena satu ikon salah ketik.
 */
export function Icon({ name, fallback = 'BiCodeAlt', ...props }) {
  const Component = ICONS[name] ?? ICONS[fallback];
  if (!Component) return null;
  return <Component {...props} />;
}
