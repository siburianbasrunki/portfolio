import React from 'react'
import Fade from "react-reveal"
import CV from "../../assets/CV_BasrunkiSiburian.pdf"
const CTA = () => {
  return (
    <div className='cta'>
      <Fade left delay={5000}>
        <a href={CV} download className='btn'>Download CV</a>
      </Fade>
      <Fade right delay={5000}>
        <a href='#contact' className='btn btn-primary'>Les's Talk</a>
      </Fade>
    </div>
  )
}

export default CTA