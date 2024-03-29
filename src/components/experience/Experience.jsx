import React from "react";
import "./experience.css";
import { TbBrandCss3, TbBrandJavascript } from "react-icons/tb";
import { AiFillHtml5, AiFillCloud } from "react-icons/ai";
import { SiBootstrap } from "react-icons/si";
import { DiReact,DiPhp } from "react-icons/di";
import {FaLaravel} from "react-icons/fa"
import { Zoom, Fade } from "react-reveal";
import Nav from "../nav/Nav";
const Experience = () => {
  return (
    <>
      <Nav />
      <section id="experience">
        <Fade bottom>
          <h5>What Skills I have</h5>
          <h2>My Experience</h2>
        </Fade>
        <div className="container experience__container">
          <div className="experience__frontend">
            <h3>Web Development</h3>
            <Zoom left cascade>
              <div className="experience__content">
                <article className="experience__details">
                  <AiFillHtml5 className="experience__details-icons" />
                  <div>
                    <h4>HTML </h4>
                    <small className="text-light">Experienced</small>
                  </div>
                </article>
                <article className="experience__details">
                  <TbBrandCss3 className="experience__details-icons" />
                  <div>
                    <h4>CSS </h4>
                    <small className="text-light">Intermidiated</small>
                  </div>
                </article>
                <article className="experience__details">
                  <TbBrandJavascript className="experience__details-icons" />
                  <div>
                    <h4>JS </h4>
                    <small className="text-light">Beginner</small>
                  </div>
                </article>
                <article className="experience__details">
                  <SiBootstrap className="experience__details-icons" />
                  <div>
                    <h4>Bootstraps </h4>
                    <small className="text-light">Intermidiated</small>
                  </div>
                </article>
                <article className="experience__details">
                  <DiReact className="experience__details-icons" />
                  <div>
                    <h4>React / Next JS </h4>
                    <small className="text-light">Intermidiated</small>
                  </div>
                </article>
                <article className="experience__details">
                  <DiPhp className="experience__details-icons" />
                  <div>
                    <h4>PHP </h4>
                    <small className="text-light">Intermidiated</small>
                  </div>
                </article>
                <article className="experience__details">
                  <AiFillCloud className="experience__details-icons" />
                  <div>
                    <h4>Cloud Computing</h4>
                    <small className="text-light">Intermidiated</small>
                  </div>
                </article>
                <article className="experience__details">
                  <FaLaravel className="experience__details-icons" />
                  <div>
                    <h4>Laravel </h4>
                    <small className="text-light">Beginner</small>
                  </div>
                </article>
              </div>
            </Zoom>
          </div>
          {/* <div className="experience__backend">
        <div className="experience__frontend">
          <h3>Backend Development</h3>
          <div className="experience__content">
            <article className='experience__details'>
              <FaPhp className='experience__details-icons'/>
              <div>
                <h4>PHP </h4>
                <small className='text-light'>Experienced</small>
              </div>
            </article>
          </div>
        </div> 
        </div> */}
        </div>
      </section>
    </>
  );
};

export default Experience;
