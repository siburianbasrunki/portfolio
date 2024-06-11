import React from "react";
import "./about.css";
import Babout from "../../assets/aboutimage.jpg";
import { FaAward } from "react-icons/fa";
import { TbFileCertificate } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import { RiEmotionLine } from "react-icons/ri";
import Nav from "../nav/Nav";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <Nav />
      <section id="about">
        <motion.h5
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get To Know
        </motion.h5>
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          About Me
        </motion.h2>
        <div className="container about__container">
          <motion.div
            className="about__me"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="about__me-image">
              <img src={Babout} alt="photoabout_me" />
            </div>
          </motion.div>
          <motion.div
            className="about__content"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="about__cards">
              <motion.article
                className="about__card"
                whileHover={{ scale: 1.1 }}
              >
                <FaAward className="about__icon" />
                <h5>Pengalaman</h5>
                <small>1 Tahun</small>
              </motion.article>
              <motion.article
                className="about__card"
                whileHover={{ scale: 1.1 }}
              >
                <TbFileCertificate className="about__icon" />
                <h5>Sertifikat</h5>
                <small>Junior Web Developer</small>
              </motion.article>
              <motion.article
                className="about__card"
                whileHover={{ scale: 1.1 }}
              >
                <CgWebsite className="about__icon" />
                <h5>Proyek Website</h5>
                <small>5 Website</small>
              </motion.article>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              Haii <RiEmotionLine /> saya Basrunki Siburian, saya alumni
              mahasiswa di sebuah Institut negeri di Indonesia jurusan Teknik
              Informatika. Saya adalah Front Ende Engineer di salah satu Start Up. Saya juga alumni dari Bangkit Academy Batch 1
              2023 Dengan Learning Path Cloud Computing, Program dari gabungan
              Google, Tokopedia, Gojek, & Traveloka.
            </motion.p>
            {/* <motion.a
              href="#contact"
              className="btn btn-primary"
              whileHover={{ scale: 1.1 }}
            >
              Let's Talk
            </motion.a> */}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
