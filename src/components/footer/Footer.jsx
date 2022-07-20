import React from 'react'
import "./footer.css"
import {BsFacebook,BsInstagram,BsTwitter} from 'react-icons/bs'
import {BiCopyright} from 'react-icons/bi'
const Footer = () => {
  return (
    <footer>
      <a href="#" className='footer_logo'>SBRCODE</a>
      <ul className="permalink">
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Skill</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#testimonial">Certificate</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="footer__socials">
        <a href="https://facebook.com"><BsFacebook/></a>
        <a href="https://instagaram.com"><BsInstagram/></a>
        <a href="https://twitter.com"><BsTwitter/></a>
      </div>

      <div className="footer__copyright">
        <small><BiCopyright/> Basrunki siburian.</small>
      </div>
    </footer>
  )
}

export default Footer