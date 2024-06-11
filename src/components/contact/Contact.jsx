import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "./contact.css";
import { HiOutlineMail } from "react-icons/hi";
import { SiMessenger, SiWhatsapp } from "react-icons/si";
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

  return (
    <>
      <Nav />
      <section id="contact">
        <motion.h5
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in touch
        </motion.h5>
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Contact
        </motion.h2>

        <div className="container contact__container">
          <motion.div
            className="contact__options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <article className="contact__option">
              <HiOutlineMail className="contact__option-icon" />
              <h4>Email</h4>
              <h5>basrunisiburian@gmail.com</h5>
              <a
                href="mailto:barunkisiburian@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Send a message
              </a>
            </article>
            <article className="contact__option">
              <SiMessenger className="contact__option-icon" />
              <h4>Messenger</h4>
              <h5>Basrunki siburian</h5>
              <a
                href="https://m.me/basrunki.siburian"
                target="_blank"
                rel="noopener noreferrer"
              >
                Send a message
              </a>
            </article>
            <article className="contact__option">
              <SiWhatsapp className="contact__option-icon" />
              <h4>WhatsApp</h4>
              <h5>+6282277611415</h5>
              <a
                href="https://wa.me/6282277611415"
                target="_blank"
                rel="noopener noreferrer"
              >
                Send a message
              </a>
            </article>
          </motion.div>

          <motion.form
            ref={form}
            onSubmit={sendEmail}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <input type="email" name="email" placeholder="email" required />
            <textarea name="name" rows="7" placeholder="pesan mu" required></textarea>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
};

export default Contact;
