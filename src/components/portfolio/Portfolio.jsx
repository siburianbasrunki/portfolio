
import "./portfolio.css";
import Nav from "../nav/Nav";
import Img1 from "../../assets/portfolio/2.png";
import Img4 from "../../assets/portfolio/1.png";
import Img5 from "../../assets/portfolio/5.png";
import Img6 from "../../assets/portfolio/6.png";
import Img7 from "../../assets/portfolio/7.png";
import Img8 from "../../assets/portfolio/8.png";
import { motion } from "framer-motion";

const data = [
  {
    id: 0,
    image: Img8,
    title: "Sistem Akomodasi dan Donasi Terumbu Karang Pulau Pawang",
    github: "https://github.com/siburianbasrunki/SistemInformasiGeografis",
    demo: "https://github.com/siburianbasrunki/SistemInformasiGeografis",
  },
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
  }
];

const Portfolio = () => {
  return (
    <>
      <Nav />
      <section id="portfolio">
        <motion.h5
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Recent Work
        </motion.h5>
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Portfolio
        </motion.h2>
        <div className="container portfolio__container">
          {data.map(({ id, image, title, github, demo }) => {
            return (
              <motion.article
                key={id}
                className="portfolio__item"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: id * 0.2 }}
              >
                <div className="portfolio__item-image">
                  <img src={image} alt={title} />
                </div>
                <h3>{title}</h3>
                <div className="portfolio__item-cta">
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
              </motion.article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Portfolio;
