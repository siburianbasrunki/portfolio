// import React from 'react'
import React, { useRef } from 'react';
import emailjs from 'emailjs-com'
import "./contact.css"
import {HiOutlineMail} from 'react-icons/hi'
import {SiMessenger,SiWhatsapp} from 'react-icons/si'

const Contact = () => {

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_yca4hcv', 'template_fx64j9l', form.current, 'CVjL0p_sWSW912KUB')
     
    e.target.reset();
  };


  return (
    <section id='contact'>
      <h5>Get in touch</h5>
      <h2>Contact</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className='contact__option'>
            <HiOutlineMail className='contact__option-icon'/>
            <h4>Email</h4>
            <h5>basrunisiburian@gmail.com</h5>
            <a href="mailto:barunkisiburian@gmail.com" target='_blank'>Send a message</a>
          </article>
          <article className='contact__option'>
            <SiMessenger className='contact__option-icon'/>
            <h4>Messenger</h4>
            <h5>Basrunki siburian</h5>
            <a href="https://m.me/basrunki.siburian" target='_blank'>Send a message</a>
          </article>
          <article className='contact__option'>
            <SiWhatsapp className='contact__option-icon'/>
            <h4>WhatsApp</h4>
            <h5>+6282277611415</h5>
            <a href="https://wa.me/6282277611415" target='_blank'>Send a message</a>
          </article>
          </div>
        {/*  */}
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name='name' placeholder='nama lengkap' required />
          <input type="email" name='email' placeholder='email' required />
          <textarea name="message" rows="7" placeholder='pesan mu' required></textarea>
          <button type='submit' className='btn btn-primary'>Send</button>
        </form>
      </div>
    </section>
  )
}

export default Contact