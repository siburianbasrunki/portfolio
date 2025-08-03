import "./portfolio.css";
import Nav from "../nav/Nav";
import Img1 from "../../assets/portfolio/2.png";
import Img4 from "../../assets/portfolio/1.png";
import Img5 from "../../assets/portfolio/5.png";
import Img6 from "../../assets/portfolio/6.png";
import Img7 from "../../assets/portfolio/7.png";
import Img8 from "../../assets/portfolio/8.png";
import imgAdmin from "../../assets/portfolio/admin.png";
import customrt from "../../assets/portfolio/cust.png";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const projects = [
  {
    id: 0,
    image: imgAdmin,
    title: "Rental Camera Admin Dashboard",
    github: "https://github.com/siburianbasrunki/rent-camera-admin",
    demo: "https://rent-camera-admin.vercel.app/",
    description: "Admin dashboard for camera rental management system"
  },
  {
    id: 1,
    image: customrt,
    title: "Rental Camera Customer",
    github: "https://github.com/siburianbasrunki/camera-rent-fe",
    demo: "https://camera-rent-fe.vercel.app/",
    description: "Customer-facing interface for camera rental service"
  },
  {
    id: 2,
    image: Img8,
    title: "Sistem Akomodasi dan Donasi Terumbu Karang Pulau Pawang",
    github: "https://github.com/siburianbasrunki/TApahawang",
    demo: "https://pulaupahawang.id",
    description: "Coral reef accommodation and donation system for Pawang Island"
  },
  {
    id: 3,
    image: Img7,
    title: "Sistem Pembagian Anggaran Jalan",
    github: "https://github.com/siburianbasrunki/SistemAnggaran",
    demo: "https://github.com/siburianbasrunki/SistemAnggaran",
    description: "Road budget allocation system for local government"
  },
  {
    id: 4,
    image: Img6,
    title: "Serfee (Bangkit Capstone)",
    github: "https://github.com/Serfee/Cloud-Computing",
    demo: "https://github.com/Serfee/Cloud-Computing",
    description: "Capstone project for Bangkit Academy cloud computing track"
  },
  {
    id: 5,
    image: Img4,
    title: "Portfolio With React JS",
    github: "https://github.com/siburianbasrunki/portfolio",
    demo: "basrunkiportfolio.vercel.app",
    description: "Personal portfolio website built with React"
  },
  {
    id: 6,
    image: Img1,
    title: "Website Organisasi PMK ITERA",
    github: "https://github.com/siburianbasrunki/PMKWEB",
    demo: "",
    description: "Official website for PMK organization at ITERA"
  },
  {
    id: 7,
    image: Img5,
    title: "Website Desa Sukamaju",
    github: "https://github.com/siburianbasrunki/DesaSukamaju",
    demo: "https://sukamajuwaysulan.vercel.app/",
    description: "Village information system for Sukamaju"
  },
];

const Portfolio = () => {
  return (
    <>
      <Nav />
      <section id="portfolio" className="portfolio-section">
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
            My Recent Work
          </motion.h5>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Portfolio
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Here are some of my featured projects
          </motion.p>
        </motion.div>

        <div className="portfolio-container">
          {projects.map(({ id, image, title, github, demo, description }) => (
            <motion.div
              key={id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: id * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image-container">
                <img src={image} alt={title} className="project-image" />
                <div className="project-overlay" />
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{title}</h3>
                <p className="project-description">{description}</p>
                
                <div className="project-links">
                  <a
                    href={github}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub repository"
                  >
                    <FiGithub className="link-icon" />
                    <span>Code</span>
                  </a>
                  
                  {demo && (
                    <a
                      href={demo.startsWith('http') ? demo : `https://${demo}`}
                      className="project-link primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live demo"
                    >
                      <FiExternalLink className="link-icon" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Portfolio;