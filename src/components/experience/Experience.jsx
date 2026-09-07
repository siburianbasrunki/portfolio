import { motion } from "framer-motion";
import "./experience.css";
import Nav from "../nav/Nav";
import SectionHeader from "../common/SectionHeader";
import { ContentGate } from "../common/PageState";
import { useContent } from "../../context/ContentContext";
import { Icon } from "../../lib/icons";

const Experience = () => {
  const { content, status, error, reload } = useContent();
  const skills = content?.skills ?? [];

  return (
    <>
      <Nav />
      <ContentGate status={status} error={error} onRetry={reload}>
        <section id="experience" className="container experience-section">
          <SectionHeader
            section={content?.sections?.experience}
            fallbackEyebrow="My Technical Skills"
            fallbackTitle="Technologies I Use"
          />

          <div className="skills-container">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className="skill-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="skill-icon">
                  <Icon name={skill.iconKey} size="2rem" />
                </div>
                <h3 className="skill-name">{skill.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>
      </ContentGate>
    </>
  );
};

export default Experience;
