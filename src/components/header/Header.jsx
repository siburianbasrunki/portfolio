import React from 'react'
import CTA from "./CTA"
import Sosmed from './Sosmed'
import "./header.css"
import ME from "../../assets/basrunki-home2.png"
const Header = () => {
  return (
    <header>
      <div className='container header__container'>
        <h5>Hello I'm</h5>
        <h1>Basrunki Siburian</h1>
        <h5 className='text-light'>
          Front End Developer
        </h5>
        <CTA/>
        <Sosmed/>
        <div className='me'>
          <img src={ME} alt="me" />
        </div>
        <a href='#contact' className='scroll-down'>scroll down</a>
      </div>
    </header>
  )
}

export default Header