import React from "react";
import "./about.css";
import Babout from "../../assets/aboutimage.jpg";
import { FaAward } from "react-icons/fa";
import { TbFileCertificate } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import { RiEmotionLine } from "react-icons/ri";
import { Zoom, Fade } from "react-reveal";
import Nav from "../nav/Nav";
const About = () => {
  return (
    <>
    <Nav/>
      <section id="about">
        <Fade top>
          <h5>Get To Know</h5>
          <h2>About Me</h2>
        </Fade>
        <div className="container about__container">
          <div className="about__me">
            <Zoom left delay={500}>
              <div className="about__me-image">
                <img src={Babout} alt="photoabout_me" />
              </div>
            </Zoom>
          </div>
          <div className="about__content">
            <Zoom bottom cascade delay={500}>
              <div className="about__cards">
                <article className="about__card">
                  <FaAward className="about__icon" />
                  <h5>Pengalaman</h5>
                  <small>1 Tahun</small>
                </article>
                <article className="about__card">
                  <TbFileCertificate className="about__icon" />
                  <h5>Sertifikat</h5>
                  <small>Junior Web Developer</small>
                </article>
                <article className="about__card">
                  <CgWebsite className="about__icon" />
                  <h5>Proyek Website</h5>
                  <small>5 Website</small>
                </article>
              </div>
            </Zoom>
            <Fade bottom delay={1000}>
              <p>
                Haii <RiEmotionLine /> saya Basrunki Siburian,saya sekarang
                mahasiswa di sebuah Institut negeri di Indonesia jurusan Teknik
                Informatika.Saya sekarang mempelajari Website terkhusus bagian
                Front End Developer.Saya juga alumni dari Bangkit Academy Batch 1 2023 Dengan Learning Path Cloud Computing,Program dari gabungan Google, Tokopedia, Gojek, & Traveloka.
              </p>
              <a href="#contact" className="btn btn-primary">
                Let's Talk
              </a>
            </Fade>
          </div>
        </div>
      </section>

    </>
  );
};

export default About;
