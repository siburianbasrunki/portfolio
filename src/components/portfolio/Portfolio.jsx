import React from "react";
import "./portfolio.css";
import Nav from "../nav/Nav";
import Img1 from "../../assets/portfolio/2.png";
import Img2 from "../../assets/portfolio/3.png";
import Img3 from "../../assets/portfolio/4.png";
import Img4 from "../../assets/portfolio/1.png";
import Img5 from "../../assets/portfolio/5.png";
import Img6 from "../../assets/portfolio/6.png";
import Img7 from "../../assets/portfolio/7.png";
import { Fade, Bounce } from "react-reveal";
const data = [
  {
    id: 1,
    image: Img7,
    title: "Sistem Pembagian Anggaran Jalan ",
    github: "https://github.com/siburianbasrunki/SistemAnggaran",
    demo: "https://github.com/siburianbasrunki/SistemAnggaran",
  },
  {
    id: 2,
    image: Img6,
    title: "Serfee ( Bangkit Capstone )",
    github: "https://github.com/Serfee/Cloud-Computing",
    demo: "https://github.com/Serfee/Cloud-Computing",
  },
  {
    id: 3,
    image: Img4,
    title: "Portofolio With React JS",
    github: "https://github.com/siburianbasrunki/portfolio",
    demo: "basrunkiportfolio.vercel.app",
  },
  {
    id: 4,
    image: Img1,
    title: "Website Organisasi PMK ITERA",
    github: "https://github.com/siburianbasrunki/PMKWEB",
    demo: "",
  },
  {
    id: 5,
    image: Img5,
    title: "Website Desa Sukamaju",
    github: "https://github.com/siburianbasrunki/DesaSukamaju",
    demo: "https://sukamajuwaysulan.vercel.app/",
  },
  {
    id: 6,
    image: Img3,
    title: "Danau Toba",
    github: "https://github.com/siburianbasrunki/laketoba",
    demo: "https://laketoba.vercel.app/",
  },
  {
    id: 8,
    image: Img2,
    title: "To Do App JS",
    github: "https://github.com/siburianbasrunki/TodoApps",
    demo: "https://karejoapps.vercel.app/",
  },
];

const Portfolio = () => {
  return (
    <>
      <Nav />
      <section id="portfolio">
        <Fade>
          <h5>My Recent Work</h5>
          <h2>Portfolio</h2>
        </Fade>
        <Bounce top cascade>
          <div className="container portfolio__container">
            {data.map(({ id, image, title, github, demo }) => {
              return (
                <article key={id} className="portfolio__item">
                  <div className="porfolio__item-image">
                    <img src={image} alt={title} />
                  </div>
                  <h3>{title}</h3>
                  <div className="porfolio__item-cta">
                    <a
                      href={github}
                      className="btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </a>
                    <a
                      href={demo}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </Bounce>
      </section>
    </>
  );
};

export default Portfolio;
