import React from 'react'
import "./about.css"
import Babout from "../../assets/profilee.jpeg"
import {FaAward} from 'react-icons/fa'
import {TbFileCertificate} from 'react-icons/tb'
import {CgWebsite} from 'react-icons/cg'
import {RiEmotionLine} from 'react-icons/ri'
const About = () => {
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className='container about__container'>
        <div className='about__me'>
          <div className='about__me-image'>
            <img src={Babout} alt="photoabout_me" />
          </div>
        </div>
        <div className='about__content'>
          <div className='about__cards'>
            <article className='about__card'>
              <FaAward className='about__icon'/>
              <h5>Pengalaman</h5>
              <small>1 Tahun</small>
            </article>
            <article className='about__card'>
              <TbFileCertificate className='about__icon'/>
              <h5>Sertifikat</h5>
              <small>Junior Web Developer</small>
            </article>
            <article className='about__card'>
              <CgWebsite className='about__icon'/>
              <h5>Proyek Website</h5>
              <small>5 Website</small>
            </article>
          </div>
          <p>
            Haii <RiEmotionLine /> saya Basrunki Siburian,saya sekarang mahasiswa di sebuah Institut negeri di Indonesia jurusan Teknik Informatika.Saya sekarang mempelajari Website terkhusus bagian Front End Developer.  
          </p>
          <a href="#contact" className='btn btn-primary'>Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About