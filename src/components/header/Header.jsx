import React from "react";
import CTA from "./CTA";
import Sosmed from "./Sosmed";
import "./header.css";
import ME from "../../assets/basrunki.png";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <motion.h5
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hello I'm
        </motion.h5>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Basrunki Siburian
        </motion.h1>
        <motion.h5
          className="text-light"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Front End Developer
        </motion.h5>
        <CTA />
        <Sosmed />
        <motion.div
          className="me"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={ME} alt="me" />
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
