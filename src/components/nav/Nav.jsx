import React from 'react'
import {AiOutlineHome,AiOutlineUser} from 'react-icons/ai'
import {BiBook,BiMessageRoundedDetail} from 'react-icons/bi'
import {TbFileCertificate} from 'react-icons/tb'
import Rotate from "react-reveal"
import "./nav.css"
import { useState } from 'react'
const Nav = () => {
  const [activeNav,setActiveNav] = useState('#')
  return (
    <Rotate bottom left cascade>
    <nav>
      <a href='#' onClick={() => setActiveNav('#')}className={activeNav === '#' ? 'active' : ''}><AiOutlineHome/></a>
      <a href='#about' onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}><AiOutlineUser/></a>
      <a href='#experience' onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}><BiBook/></a>
      <a href='#sertifikat' onClick={() => setActiveNav('#sertifikat')} className={activeNav === '#sertifikat' ? 'active' : ''}><TbFileCertificate/></a>
      <a href='#contact' onClick={() => setActiveNav('#contact')} className={activeNav === '#contact' ? 'active' : ''}><BiMessageRoundedDetail/></a>
    </nav>
    </Rotate>
  )
}

export default Nav