import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./certificate.css";
import Nav from "../nav/Nav";
import SectionHeader from "../common/SectionHeader";
import { ContentGate } from "../common/PageState";
import { useContent } from "../../context/ContentContext";
import { Icon } from "../../lib/icons";

const Certificate = () => {
  const { content, status, error, reload } = useContent();
  const certificates = content?.certificates ?? [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerSlide(3);
      else if (width >= 768) setItemsPerSlide(2);
      else setItemsPerSlide(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSlides = Math.ceil(certificates.length / itemsPerSlide);

  const nextSlide = useCallback(() => {
    if (maxSlides === 0) return;
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  }, [maxSlides]);

  const prevSlide = useCallback(() => {
    if (maxSlides === 0) return;
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  }, [maxSlides]);

  // Jumlah slide bisa mengecil saat layar dikecilkan atau data berubah;
  // tarik kembali indeks yang terlanjur melewati batas.
  useEffect(() => {
    if (currentSlide >= maxSlides) setCurrentSlide(0);
  }, [currentSlide, maxSlides]);

  useEffect(() => {
    if (maxSlides <= 1) return undefined;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, maxSlides]);

  const visible = certificates.slice(
    currentSlide * itemsPerSlide,
    currentSlide * itemsPerSlide + itemsPerSlide,
  );

  return (
    <>
      <Nav />
      <ContentGate status={status} error={error} onRetry={reload}>
        <section id="sertifikat" className="container certificate-section">
          <SectionHeader
            section={content?.sections?.certificate}
            fallbackEyebrow="Review My Certificates"
            fallbackTitle="My Achievements"
          />

          <div className="certificate-slider-container">
            <button className="slider-arrow left" onClick={prevSlide} aria-label="Sebelumnya">
              <Icon name="FaArrowLeft" />
            </button>

            <div className="certificate-slider-wrapper">
              <div className="certificate-grid">
                {visible.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className="certificate-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="certificate-header">
                      <div className="institution-logo">
                        {cert.institution?.logo && (
                          <img
                            src={cert.institution.logo.url}
                            alt={cert.institution.name}
                          />
                        )}
                      </div>
                      <h3 className="certificate-title">
                        {cert.title}
                        {cert.institution?.name ? ` (${cert.institution.name})` : ""}
                      </h3>
                    </div>
                    <div className="certificate-image-container">
                      {cert.image && (
                        <img
                          src={cert.image.url}
                          alt={cert.image.alt || cert.title}
                          className="certificate-image"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button className="slider-arrow right" onClick={nextSlide} aria-label="Berikutnya">
              <Icon name="FaArrowRight" />
            </button>
          </div>

          <div className="slider-dots">
            {Array.from({ length: maxSlides }, (_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>
      </ContentGate>
    </>
  );
};

export default Certificate;
