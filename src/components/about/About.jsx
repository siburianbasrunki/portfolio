import "./about.css";
import Babout from "../../assets/saya.jpg";
import { FaAward } from "react-icons/fa";
import { TbFileCertificate } from "react-icons/tb";
import { CgWebsite } from "react-icons/cg";
import { RiEmotionLine } from "react-icons/ri";
import Nav from "../nav/Nav";
import { motion } from "framer-motion";

const About = () => {
  const stats = [
    { icon: <FaAward className="stat-icon" />, title: "Experience", value: "2+ Years", description: "Professional development" },
    { icon: <TbFileCertificate className="stat-icon" />, title: "Certificates", value: "10+ Earned", description: "Junior Web Developer, etc" },
    { icon: <CgWebsite className="stat-icon" />, title: "Projects", value: "5+ Completed", description: "Web applications" },
  ];

  return (
    <>
      <Nav />
      <section id="about" className="about-section">
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
            Get To Know
          </motion.h5>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            About Me
          </motion.h2>
        </motion.div>

        <div className="about-container">
          <motion.div
            className="about-image-container"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="image-wrapper">
              <img 
                src={Babout} 
                alt="Basrunki Siburian" 
                className="profile-image"
              />
              <div className="image-border" />
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.article
                  key={index}
                  className="stat-card"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="stat-icon-container">
                    {stat.icon}
                  </div>
                  <h3 className="stat-value">{stat.value}</h3>
                  <h5 className="stat-title">{stat.title}</h5>
                  <small className="stat-description">{stat.description}</small>
                </motion.article>
              ))}
            </div>

            <motion.p
              className="about-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              <span className="greeting">Haii <RiEmotionLine className="emoji" /> I'm Basrunki Siburian</span>, 
              a Computer Science graduate from a national institute in Indonesia. 
              I currently work as a Front End Engineer at a private company in Indonesia. 
              I'm also an alumnus of Bangkit Academy Batch 1 2023 with a Cloud Computing 
              learning path, a program supported by Google, Tokopedia, Gojek, and Traveloka.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;