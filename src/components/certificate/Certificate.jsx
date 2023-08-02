import React, { useRef, useState ,useEffect} from "react";
import "./certificate.css";
import Fade from "react-reveal/Fade";
import Nav from "../nav/Nav";

// Import images
import Dicoding from "../../assets/instansi/dicoding.png";
import Dts from "../../assets/instansi/dts.jpg";
import Progate from "../../assets/instansi/progate.jpg";
import BuildWithAngga from "../../assets/instansi/bwa.svg";
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
    logo: Dts,
    jsertifikat: "Junior Web Developer (Digital Talent Scholarship)",
    sertifikat: Jwd,
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

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); 
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <>
      <Nav />
      <section id="sertifikat">
        <Fade top>
          <h5>Review my Certificate</h5>
          <h2>Certificate</h2>
        </Fade>
        <Fade bottom>
          <div className="container sertifikats__container">
            <div
              className="sertifikats-slider"
              ref={sliderRef}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: "transform 0.5s ease-in-out", 
              }}
            >
              {Sertifikat.map(({ logo, jsertifikat, sertifikat }, index) => (
                <div key={index} className="sertifikat">
                  <div className="instansi__avatar">
                    <img src={logo} alt={`instansi-logo-${index}`} />
                  </div>
                  <h5 className="nama__instansi">{jsertifikat}</h5>
                  <small className="gambar__sertifikat">
                    <img src={sertifikat} alt={`sertifikat-${index}`} />
                  </small>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </section>
    </>
  );
};

export default Certificate;
