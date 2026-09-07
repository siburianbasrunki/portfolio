import { motion } from "framer-motion";
import CTA from "./CTA";
import Sosmed from "./Sosmed";
import "./header.css";
import { useContent } from "../../context/ContentContext";
import { ContentGate } from "../common/PageState";
import { revealAt } from "../../lib/motion";

const Header = () => {
  const { content, status, error, reload } = useContent();
  const home = content?.home;

  return (
    <ContentGate status={status} error={error} onRetry={reload}>
      <header className="hero">
        <div className="container hero__grid">
          <div className="hero__text">
            <motion.p className="nb-label hero__greeting" {...revealAt(0)}>
              {home?.greeting}
            </motion.p>

            <motion.h1 className="hero__name" {...revealAt(1)}>
              {home?.fullName}
            </motion.h1>

            <motion.p className="hero__role nb-mono" {...revealAt(2)}>
              {home?.headline}
            </motion.p>

            {home?.availableForWork && (
              <motion.p className="hero__status" {...revealAt(3)}>
                <span className="hero__dot" aria-hidden="true" />
                Terbuka untuk pekerjaan
              </motion.p>
            )}

            <motion.div {...revealAt(4)}>
              <CTA cta={home?.cta} />
            </motion.div>

            <motion.div {...revealAt(5)}>
              <Sosmed links={home?.socials} />
            </motion.div>
          </div>

          {home?.heroImage && (
            <motion.div className="hero__portrait" {...revealAt(2)}>
              <img src={home.heroImage.url} alt={home.heroImage.alt || home.fullName} />
            </motion.div>
          )}
        </div>
      </header>
    </ContentGate>
  );
};

export default Header;
