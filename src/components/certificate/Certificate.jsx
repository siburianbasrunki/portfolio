import React, { useRef, useState, useEffect } from "react";
import "./certificate.css";
import Nav from "../nav/Nav";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
// Import images instansi
import Dicoding from "../../assets/instansi/dicoding.png";
import Dts from "../../assets/instansi/dts.jpg";
import Progate from "../../assets/instansi/progate.jpg";
import BuildWithAngga from "../../assets/instansi/bwa.svg";
import Bangkit from "../../assets/instansi/bangkit.jpg";
import Coursera from "../../assets/instansi/Coursera.jpg";
// import images sertifikat
import BangkitAc from "../../assets/sertifikat/bangkit.jpg";
import Coursera1 from "../../assets/sertifikat/admingoogle.png";
import Coursera2 from "../../assets/sertifikat/bit and byte coursera.png";
import ApkBE from "../../assets/sertifikat/aplikasi back-end.png";
import Cloud from "../../assets/sertifikat/cloudengineer.jpg";
import PemJS from "../../assets/sertifikat/sertif dasar javascript.png";
import pengsoft from "../../assets/sertifikat/sertifpengsoft.png";
import Jwd from "../../assets/sertifikat/JWD.png";
import FronnendD from "../../assets/sertifikat/FrontendD.png";
import DasarWebD from "../../assets/sertifikat/DasarWebD.png";
import Git from "../../assets/sertifikat/GIT.png";
import Htmlcss from "../../assets/sertifikat/HTMLCSS.png";
import Js from "../../assets/sertifikat/JavaScript.png";
import Reactjs from "../../assets/sertifikat/ReactJS.png";
import Nodejs from "../../assets/sertifikat/NodeJs.png";
import HtoR from "../../assets/sertifikat/HTML-ReactJs.png";

const Sertifikat = [
  {
    logo: Bangkit,
    jsertifikat: "Bangkit Batch 1 2023 ( Bangkit Academy )",
    sertifikat: BangkitAc,
  },
  {
    logo: Dts,
    jsertifikat: "Junior Web Developer (Digital Talent Scholarship)",
    sertifikat: Jwd,
  },
  {
    logo: Coursera,
    jsertifikat:
      "System Administrator and IT Infrastructur Service ( Coursera )",
    sertifikat: Coursera1,
  },
  {
    logo: Coursera,
    jsertifikat: "The Bits and Bytes of Computer Networking ( Coursera )",
    sertifikat: Coursera2,
  },
  {
    logo: Dicoding,
    jsertifikat: "Menjadi Google Cloud Engineer ( Dicoding )",
    sertifikat: Cloud,
  },
  {
    logo: Dicoding,
    jsertifikat: "Belajar Dasar Pemrograman JavaScript (Dicoding)",
    sertifikat: PemJS,
  },
  {
    logo: Dicoding,
    jsertifikat:
      "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software (Dicoding) ",
    sertifikat: pengsoft,
  },
  {
    logo: Dicoding,
    jsertifikat:
      "Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud ( Dicoding )",
    sertifikat: ApkBE,
  },
  {
    logo: Dicoding,
    jsertifikat: "Membuat Front-End Web (Dicoding)",
    sertifikat: FronnendD,
  },
  {
    logo: Progate,
    jsertifikat: "GIT (Progate)",
    sertifikat: Git,
  },
  {
    logo: Progate,
    jsertifikat: "JavaScripts (Progate)",
    sertifikat: Js,
  },
  {
    logo: Progate,
    jsertifikat: "React JS (Progate)",
    sertifikat: Reactjs,
  },
  {
    logo: Dicoding,
    jsertifikat: "Dasar Pemrograman Web (Dicoding)",
    sertifikat: DasarWebD,
  },
  {
    logo: Progate,
    jsertifikat: "HTML & CSS (Progate)",
    sertifikat: Htmlcss,
  },
  {
    logo: Progate,
    jsertifikat: "Pengembangan WEB dengan Node.Js (Progate)",
    sertifikat: Nodejs,
  },
  {
    logo: BuildWithAngga,
    jsertifikat: "Convert HTML to React JS FrameWork",
    sertifikat: HtoR,
  },
];

const Certificate = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % Sertifikat.length;
    setCurrentSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + Sertifikat.length) % Sertifikat.length;
    setCurrentSlide(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <>
      <Nav />
      <section id="sertifikat">
        <motion.h5
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Review my Certificate
        </motion.h5>
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Certificate
        </motion.h2>
        <div className="container sertifikats__container">
          <motion.div
            className="sertifikats-slider"
            ref={sliderRef}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {Sertifikat.map(({ logo, jsertifikat, sertifikat }, index) => (
              <motion.div
                key={index}
                className="sertifikat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="instansi__avatar">
                  <img src={logo} alt={`instansi-logo-${index}`} />
                </div>
                <h5 className="nama__instansi">{jsertifikat}</h5>
                <small className="gambar__sertifikat">
                  <img src={sertifikat} alt={`sertifikat-${index}`} />
                </small>
              </motion.div>
            ))}
          </motion.div>
          <button className="slider-arrow left" onClick={prevSlide}>
            <FaArrowLeft />
          </button>
          <button className="slider-arrow right" onClick={nextSlide}>
            <FaArrowRight />
          </button>
        </div>
      </section>
    </>
  );
};

export default Certificate;
