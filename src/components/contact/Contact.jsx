import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "./contact.css";
import { HiOutlineMail, HiOutlinePaperAirplane } from "react-icons/hi";
import { SiMessenger, SiWhatsapp } from "react-icons/si";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import Nav from "../nav/Nav";
import { motion } from "framer-motion";

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_yca4hcv",
      "template_fx64j9l",
      form.current,
      "CVjL0p_sWSW912KUB"
    );

    e.target.reset();
  };

  const contactMethods = [
    {
      icon: <HiOutlineMail className="contact-icon" />,
      platform: "Email",
      detail: "basrunisiburian@gmail.com",
      link: "mailto:basrunisiburian@gmail.com",
      color: "#EA4335"
    },
    {
      icon: <SiMessenger className="contact-icon" />,
      platform: "Messenger",
      detail: "Basrunki siburian",
      link: "https://m.me/basrunki.siburian",
      color: "#006AFF"
    },
    {
      icon: <SiWhatsapp className="contact-icon" />,
      platform: "WhatsApp",
      detail: "+6282277611415",
      link: "https://wa.me/6282277611415",
      color: "#25D366"
    }
  ];

  return (
    <>
      <Nav />
      <section id="contact" className="contact-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h5
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Get in Touch
          </motion.h5>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Contact Me
          </motion.h2>
        </motion.div>

        <div className="contact-container">
          <motion.div
            className="contact-methods"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                className="contact-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="contact-icon-container" style={{ backgroundColor: method.color }}>
                  {method.icon}
                </div>
                <div className="contact-info">
                  <h4>{method.platform}</h4>
                  <p>{method.detail}</p>
                </div>
                <a 
                  href={method.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Message
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            ref={form}
            onSubmit={sendEmail}
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="input-group">
              <FiUser className="input-icon" />
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                required 
              />
            </div>
            <div className="input-group">
              <HiOutlineMail className="input-icon" />
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                required 
              />
            </div>
            <div className="input-group">
              <FiMessageSquare className="input-icon" />
              <textarea 
                name="message" 
                rows="5" 
                placeholder="Your Message" 
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              <HiOutlinePaperAirplane className="btn-icon" />
              Send Message
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
};

export default Contact;