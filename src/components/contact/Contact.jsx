import { useState } from "react";
import { motion } from "framer-motion";
import "./contact.css";
import Nav from "../nav/Nav";
import SectionHeader from "../common/SectionHeader";
import { ContentGate } from "../common/PageState";
import { useContent } from "../../context/ContentContext";
import { Icon } from "../../lib/icons";
import { publicApi } from "../../lib/api";

const EMPTY_FORM = { name: "", email: "", message: "", website: "" };

const Contact = () => {
  const { content, status, error, reload } = useContent();
  const methods = content?.contactMethods ?? [];

  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message }
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setFeedback(null);
    setFieldErrors({});

    try {
      await publicApi.sendMessage(form);
      setForm(EMPTY_FORM);
      setFeedback({ type: "success", message: "Pesan terkirim. Terima kasih!" });
    } catch (err) {
      setFieldErrors(err.fieldErrors ?? {});
      setFeedback({
        type: "error",
        message: err.message || "Pesan gagal dikirim. Coba lagi sebentar lagi.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Nav />
      <ContentGate status={status} error={error} onRetry={reload}>
        <section id="contact" className="container contact-section">
          <SectionHeader
            section={content?.sections?.contact}
            fallbackEyebrow="Get in Touch"
            fallbackTitle="Contact Me"
          />

          <div className="contact-container">
            <motion.div
              className="contact-methods"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {methods.map((method) => (
                <motion.div
                  key={method.id}
                  className="contact-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="contact-icon-container"
                    style={{ backgroundColor: method.color || "var(--nb-yellow)" }}
                  >
                    <Icon name={method.iconKey} className="contact-icon" />
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
              onSubmit={handleSubmit}
              className="contact-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              noValidate
            >
              <div className="input-group">
                <Icon name="FiUser" className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {fieldErrors.name && <small className="field-error">{fieldErrors.name}</small>}

              <div className="input-group">
                <Icon name="HiOutlineMail" className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {fieldErrors.email && <small className="field-error">{fieldErrors.email}</small>}

              <div className="input-group">
                <Icon name="FiMessageSquare" className="input-icon" />
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              {fieldErrors.message && <small className="field-error">{fieldErrors.message}</small>}

              {/* Perangkap bot: tersembunyi dari manusia, biasanya diisi skrip otomatis. */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="honeypot"
              />

              {feedback && (
                <p className={`form-feedback form-feedback--${feedback.type}`} role="status">
                  {feedback.message}
                </p>
              )}

              <button type="submit" className="submit-btn" disabled={sending}>
                <Icon name="HiOutlinePaperAirplane" className="btn-icon" />
                {sending ? "Mengirim..." : "Send Message"}
              </button>
            </motion.form>
          </div>
        </section>
      </ContentGate>
    </>
  );
};

export default Contact;
