import React from "react";
import "./experience.css";
import { TbBrandCss3, TbBrandJavascript } from "react-icons/tb";
import { AiFillHtml5, AiFillCloud } from "react-icons/ai";
import { SiBootstrap } from "react-icons/si";
import { DiReact, DiPhp } from "react-icons/di";
import { FaLaravel } from "react-icons/fa";
import Nav from "../nav/Nav";
import { motion } from "framer-motion";

const skills = [
  { icon: <AiFillHtml5 size="2rem" />, name: "HTML" },
  { icon: <TbBrandCss3 size="2rem" />, name: "CSS" },
  { icon: <TbBrandJavascript size="2rem" />, name: "JavaScript" },
  { icon: <SiBootstrap size="2rem" />, name: "Bootstrap" },
  { icon: <DiReact size="2rem" />, name: "React/Next" },
  { icon: <DiPhp size="2rem" />, name: "PHP" },
  { icon: <AiFillCloud size="2rem" />, name: "Cloud" },
  { icon: <FaLaravel size="2rem" />, name: "Laravel" }
];

const Experience = () => {
  return (
    <>
      <Nav />
      <section id="experience" className="experience-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h5
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            My Technical Skills
          </motion.h5>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Technologies I Use
          </motion.h2>
        </motion.div>

        <div className="skills-container">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-name">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Experience;