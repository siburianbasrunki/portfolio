import React from 'react'
import "./certificate.css"
// import logo instansi 
import Dicoding from '../../assets/instansi/dicoding.png'
import Dts from '../../assets/instansi/dts.jpg'
import Progate from '../../assets/instansi/progate.jpg'
import BuildWithAngga from '../../assets/instansi/bwa.svg'
// import sertifikat 
import Jwd from '../../assets/sertifikat/JWD.png'
import FronnendD from '../../assets/sertifikat/FrontendD.png'
import DasarWebD from '../../assets/sertifikat/DasarWebD.png'
import Git from '../../assets/sertifikat/GIT.png'
import Htmlcss from '../../assets/sertifikat/HTMLCSS.png'
import Js from '../../assets/sertifikat/JavaScript.png'
import Reactjs from '../../assets/sertifikat/ReactJS.png'
import Nodejs from '../../assets/sertifikat/NodeJs.png'
import HtoR from '../../assets/sertifikat/HTML-ReactJs.png'
// import Swiper core and required modules  
import { Pagination} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import React-Reveal 
import Fade from 'react-reveal/Fade';


const Sertifikat = [
  {
    logo : Dts,
    jsertifikat : "Junior Web Developer (Digital Talent Scholarship)",
    sertifikat : Jwd,
  },
  {
    logo : Dicoding,
    jsertifikat : "Membuat Front-End Web (Dicoding)",
    sertifikat : FronnendD,
  },
  {
    logo : Progate,
    jsertifikat : "GIT (Progate)",
    sertifikat : Git,
  },
  {
    logo : Progate,
    jsertifikat : "JavaScripts (Progate)",
    sertifikat : Js,
  },
  {
    logo : Progate,
    jsertifikat : "React JS (Progate)",
    sertifikat : Reactjs,
  },
  {
    logo : Dicoding,
    jsertifikat : "Dasar Pemrograman Web (Dicoding)",
    sertifikat : DasarWebD,
  },
  {
    logo : Progate,
    jsertifikat : "HTML & CSS (Progate)",
    sertifikat : Htmlcss,
  },
  {
    logo : Progate,
    jsertifikat : "Pengembangan WEB dengan Node.Js (Progate)",
    sertifikat : Nodejs,
  },
  {
    logo: BuildWithAngga,
    jsertifikat : "Convert HTML to React JS FrameWork",
    sertifikat : HtoR,
  }
]

const Certificate = () => {
  return (
    <section id='sertifikat'>
      <Fade top >
      <h5>Review my Certificate</h5>
      <h2>Certificate</h2>
      </Fade>
      <Fade buttom>
      <Fade buttom delay={1000}>
      <Swiper className="container sertifikats__container" 
      modules={[ Pagination]}
      spaceBetween={40}
      slidesPerView={1}
      pagination={{ clickable: true }}>
        {
        Sertifikat.map(({logo,jsertifikat,sertifikat},index) => {
          return (
            <SwiperSlide key={index} className='sertifikat'>
              <div className="instansi__avatar">
                <img src={logo} />
              </div>
              <h5 className='nama__instansi'>{jsertifikat}</h5>
                <small className='gambar__sertifikat'>
                  <img src={sertifikat} alt="abc" />
                </small>
            </SwiperSlide>
          )
        })
        }
      </Swiper>
      </Fade>
      </Fade>
    </section>
  )
}

export default Certificate