import React from "react";
import { BsLinkedin, BsInstagram, BsGithub } from "react-icons/bs";
//
const Sosmed = () => {
  return (
    <div className="header-socials">
      <a
        href="https://www.linkedin.com/in/basrunki-siburian-ba6b03210/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsLinkedin />
      </a>
      <a
        href="https://www.instagram.com/basrunki_/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsInstagram />
      </a>
      <a
        href="https://github.com/siburianbasrunki"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsGithub />
      </a>
    </div>
  );
};

export default Sosmed;
