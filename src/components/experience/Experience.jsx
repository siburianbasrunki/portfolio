import React from "react";
import "./experience.css";
import { TbBrandCss3, TbBrandJavascript } from "react-icons/tb";
import { AiFillHtml5, AiFillCloud } from "react-icons/ai";
import { SiBootstrap } from "react-icons/si";
import { DiReact, DiPhp } from "react-icons/di";
import { FaLaravel } from "react-icons/fa";
import Nav from "../nav/Nav";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <>
      <Nav />
      <section id="experience">
        <motion.h5
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Skills I have
        </motion.h5>
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          My Experience
        </motion.h2>
        <div className="container experience__container">
          <motion.div
            className="experience__frontend"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3>Web Development</h3>
            <div className="experience__content">
              <motion.article
                className="experience__details"
                whileHover={{ scale: 1.1 }}
              >
                <AiFillHtml5 className="experience__details-icons" />
                <div>
                  <h4>HTML </h4>
                  <small className="text-light">Experienced</small>
                </div>
              </motion.article>
              <motion.article
                className="experience__details"
                whileHover={{ scale: 1.1 }}
              >
                <TbBrandCss3 className="experience__details-icons" />
                <div>
                  <h4>CSS </h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </motion.article>
              <motion.article
                className="experience__details"
                whileHover={{ scale: 1.1 }}
              >
                <TbBrandJavascript className="experience__details-icons" />
                <div>
                  <h4>JS </h4>
                  <small className="text-light">Beginner</small>
                </div>
              </motion.article>
              <motion.article
                className="experience__details"
                whileHover={{ scale: 1.1 }}
              >
                <SiBootstrap className="experience__details-icons" />
                <div>
                  <h4>Bootstraps </h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </motion.article>
              <motion.article
                className="experience__details"
                whileHover={{ scale: 1.1 }}
              >
                <DiReact className="experience__details-icons" />
                <div>
                  <h4>React / Next JS </h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </motion.article>
              <motion.article
                className="experience__details"
                whileHover={{ scale: 1.1 }}
              >
                <DiPhp className="experience__details-icons" />
                <div>
                  <h4>PHP </h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </motion.article>
              <motion.article
                className="experience__details"
                whileHover={{ scale: 1.1 }}
              >
                <AiFillCloud className="experience__details-icons" />
                <div>
                  <h4>Cloud Computing</h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </motion.article>
              <motion.article
                className="experience__details"
                whileHover={{ scale: 1.1 }}
              >
                <FaLaravel className="experience__details-icons" />
                <div>
                  <h4>Laravel </h4>
                  <small className="text-light">Beginner</small>
                </div>
              </motion.article>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Experience;
