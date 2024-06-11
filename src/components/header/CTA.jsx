import React from "react";
import CV from "../../assets/CV-Basrunki Siburian.pdf";
const CTA = () => {
  return (
    <div className="cta">
      <a href={CV} download className="btn">
        Download CV
      </a>
      <a href="/contact" className="btn btn-primary">
        Les's Talk
      </a>
    </div>
  );
};

export default CTA;
