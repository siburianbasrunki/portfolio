import React from 'react'
import CV from "../../assets/Basrunki Siburian CV.png"
const CTA = () => {
  return (
    <div className='cta'>
        <a href={CV} download className='btn'>Download CV</a>
        <a href='#contact' className='btn btn-primary'>Les's Talk</a>
    </div>
  )
}

export default CTA