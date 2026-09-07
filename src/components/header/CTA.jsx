import { Link } from "react-router-dom";

/**
 * Tombol CV & "Let's Talk". Kalau CV belum diunggah lewat admin, tombolnya
 * tidak dirender — lebih baik hilang daripada mengunduh tautan kosong.
 */
const CTA = ({ cta }) => {
  const cvUrl = cta?.cvUrl;
  const label = cta?.primaryLabel || "Let's Talk";
  const url = cta?.primaryUrl || "/contact";
  const isExternal = /^https?:\/\//.test(url);

  return (
    <div className="cta">
      {cvUrl && (
        <a href={cvUrl} download className="btn" target="_blank" rel="noopener noreferrer">
          Download CV
        </a>
      )}
      {isExternal ? (
        <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <Link to={url} className="btn btn-primary">
          {label}
        </Link>
      )}
    </div>
  );
};

export default CTA;
