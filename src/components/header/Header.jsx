import React from "react";
import CTA from "./CTA";
import Sosmed from "./Sosmed";
import "./header.css";
import ME from "../../assets/basrunki.png";
import { Fade, Zoom } from "react-reveal";
const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <Fade top>
          <h5>Hello I'm</h5>
          <h1>Basrunki Siburian</h1>
          <h5 className="text-light">
            Web Developer
          </h5>
        </Fade>
        <Fade>
          <CTA />
        </Fade>
        <Sosmed />
        <Zoom>
          <div className="me">
            <img src={ME} alt="me" />
          </div>
        </Zoom>
      </div>
    </header>
  );
};

export default Header;
