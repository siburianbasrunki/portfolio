import React from "react";
import { AiOutlineHome, AiOutlineUser, AiOutlineProject } from "react-icons/ai";
import { BiBook, BiMessageRoundedDetail } from "react-icons/bi";
import { TbFileCertificate } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import Rotate from "react-reveal";
import "./nav.css";

const Nav = () => {
  const location = useLocation();

  return (
    <Rotate bottom left cascade>
      <nav>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          <AiOutlineHome />
        </Link>
        <Link
          to="/about"
          className={location.pathname === "/about" ? "active" : ""}
        >
          <AiOutlineUser />
        </Link>

        <Link
          to="/experience"
          className={location.pathname === "/experience" ? "active" : ""}
        >
          <BiBook />
        </Link>

        <Link
          to="/certificate"
          className={location.pathname === "/certificate" ? "active" : ""}
        >
          <TbFileCertificate />
        </Link>

        <Link
          to="/portfolio"
          className={location.pathname === "/portfolio" ? "active" : ""}
        >
          <AiOutlineProject />
        </Link>

        <Link
          to="/contact"
          className={location.pathname === "/contact" ? "active" : ""}
        >
          <BiMessageRoundedDetail />
        </Link>
      </nav>
    </Rotate>
  );
};

export default Nav;
