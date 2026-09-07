import { motion } from "framer-motion";
import "./about.css";
import Nav from "../nav/Nav";
import SectionHeader from "../common/SectionHeader";
import { ContentGate } from "../common/PageState";
import { useContent } from "../../context/ContentContext";
import { Icon } from "../../lib/icons";

const About = () => {
  const { content, status, error, reload } = useContent();
  const about = content?.about;
  const stats = about?.stats ?? [];

  return (
    <>
      <Nav />
      <ContentGate status={status} error={error} onRetry={reload}>
        <section id="about" className="container about-section">
          <SectionHeader
            section={content?.sections?.about}
            fallbackEyebrow="Get To Know"
            fallbackTitle="About Me"
          />

          <div className="about-container">
            {about?.avatar && (
              <motion.div
                className="about-image-container"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="image-wrapper">
                  <img
                    src={about.avatar.url}
                    alt={about.avatar.alt || about.fullName}
                    className="profile-image"
                  />
                  <div className="image-border" />
                </div>
              </motion.div>
            )}

            <motion.div
              className="about-content"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="stats-grid">
                {stats.map((stat) => (
                  <motion.article
                    key={stat.id}
                    className="stat-card"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="stat-icon-container">
                      <Icon name={stat.iconKey} className="stat-icon" />
                    </div>
                    <h3 className="stat-value">{stat.value}</h3>
                    <h5 className="stat-title">{stat.title}</h5>
                    {stat.description && (
                      <small className="stat-description">{stat.description}</small>
                    )}
                  </motion.article>
                ))}
              </div>

              {about?.bio && (
                <motion.p
                  className="about-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                >
                  {about.bio}
                </motion.p>
              )}
            </motion.div>
          </div>
        </section>
      </ContentGate>
    </>
  );
};

export default About;
