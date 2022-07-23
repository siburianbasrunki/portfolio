import React from 'react'
import "./portfolio.css"
import Img1 from "../../assets/pmk.png"
import Img2 from "../../assets/todolist.png"
import Img3 from "../../assets/danautoba.png"
import Img4 from "../../assets/portofolio.png"
// https://github.com/siburianbasrunki/laketoba

const data = [

  {
    id : 1,
    image : Img4,
    title : "Portofolio With React JS",
    github : "https://github.com/siburianbasrunki/portfolio",
    demo : "basrunkiportfolio.vercel.app",
  },
  {
    id : 2,
    image : Img1,
    title : "Website Organisasi PMK ITERA",
    github : "https://github.com/siburianbasrunki/PMKWEB",
    demo : "",
  },
  {
    id : 3, 
    image : Img2,
    title : "To Do App JS",
    github : "https://github.com/siburianbasrunki/TodoApps",
    demo : "https://siburianbasrunki.github.io/TodoApps/",
  },
  {
    id : 4,
    image: Img3,
    title : "Danau Toba",
    github : "https://github.com/siburianbasrunki/laketoba",
    demo : "https://siburianbasrunki.github.io/laketoba/",
  }
]



const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio__container">
        {
          data.map(({id,image,title,github,demo}) => {
            return (
              <article key={id} className='portfolio__item'>
                <div className="porfolio__item-image">
                  <img src={image} alt={title} />
                </div>
                <h3>{title}</h3>
                <div className="porfolio__item-cta">
                  <a href={github} className='btn ' target='_blank'>Github</a>
                  <a href={demo} className='btn btn-primary' target='_blank'>Live Demo</a>
                </div>

             </article>
            )
          })
        }
      </div>
    </section>
  )
}

export default Portfolio