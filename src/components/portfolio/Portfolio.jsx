import { motion } from "framer-motion";
import "./portfolio.css";
import Nav from "../nav/Nav";
import SectionHeader from "../common/SectionHeader";
import { ContentGate } from "../common/PageState";
import { useContent } from "../../context/ContentContext";
import { Icon } from "../../lib/icons";

const Portfolio = () => {
  const { content, status, error, reload } = useContent();
  const projects = content?.projects ?? [];

  return (
    <>
      <Nav />
      <ContentGate status={status} error={error} onRetry={reload}>
        <section id="portfolio" className="container portfolio-section">
          <SectionHeader
            section={content?.sections?.portfolio}
            fallbackEyebrow="My Recent Work"
            fallbackTitle="Portfolio"
          />

          <div className="portfolio-container">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="project-image-container">
                  {project.image && (
                    <img
                      src={project.image.url}
                      alt={project.image.alt || project.title}
                      className="project-image"
                    />
                  )}
                  <div className="project-overlay" />
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}

                  {project.techStack?.length > 0 && (
                    <div className="tech-stack">
                      <h4 className="tech-stack-title">Tech Stack:</h4>
                      <div className="tech-stack-list">
                        {project.techStack.map((tech) => (
                          <div key={tech.slug} className="tech-item">
                            <span className="tech-icon">
                              <Icon name={tech.iconKey} />
                            </span>
                            <span className="tech-name">{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="project-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository"
                      >
                        <Icon name="FiGithub" className="link-icon" />
                        <span>Code</span>
                      </a>
                    )}

                    {project.demoUrl && (
                      <a
                        href={
                          project.demoUrl.startsWith("http")
                            ? project.demoUrl
                            : `https://${project.demoUrl}`
                        }
                        className="project-link primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live demo"
                      >
                        <Icon name="FiExternalLink" className="link-icon" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </ContentGate>
    </>
  );
};

export default Portfolio;
