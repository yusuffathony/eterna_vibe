import type { Metadata } from 'next';
import Image from 'next/image';
import { loadAllData, getAbout, getContact } from '../../lib/data.js';
import ContactForm from '../../components/ContactForm.jsx';

export const metadata: Metadata = {
  title: 'Contact — ETERNA Photography',
  description: 'Book a session, ask a question, or say hello. The fastest way is by WhatsApp.',
};

export default async function ContactPage() {
  const { data } = await loadAllData();
  const contact = getContact(data);
  const about = getAbout(data);

  return (
    <>
      <section className="reveal">
        <div className="wrap">
          <div className="hero">
            <div className="hero-img">
              <Image src={about.image || '/images/about.jpg'} alt="Photographer at work" fill sizes="100vw" />
            </div>
            <div className="hero-overlay" />
            <div className="hero-body">
              <p className="hero-kicker">Contact</p>
              <h1 className="section-title">Let&rsquo;s work together</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="wrap">
          <p className="section-eyebrow">Get in touch</p>
          <h2 className="section-title">We&rsquo;ll reply within one working day</h2>
          <p className="section-intro">Tell us about the project you have in mind — dates, a few references, and roughly how many images you&rsquo;d like. No strings attached.</p>
        </div>
      </section>

      <section className="reveal">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="big-item">
                <span className="icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>
                </span>
                <span className="txt">
                  {contact.phone}
                  <small>WhatsApp &amp; phone. We reply fastest here.</small>
                </span>
              </div>
              <div className="big-item">
                <span className="icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </span>
                <span className="txt">
                  {contact.email}
                  <small>General enquiries and email responses.</small>
                </span>
              </div>
              <div className="big-item">
                <span className="icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0z" /><path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>
                </span>
                <span className="txt">
                  {contact.address}
                  <small>Studio &amp; studio shoots.</small>
                </span>
              </div>
              <div className="form-note">
                <p>Prefer to chat? A quick message on WhatsApp is the easiest way to reach us.</p>
              </div>
            </div>

            <div className="contact-form-wrap">
              <ContactForm phone={contact.phone} email={contact.email} />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap cta-inner">
          <p className="cta-eyebrow">Book</p>
          <h2 className="cta-title">Ready for your session?</h2>
          <p className="cta-copy">A quick WhatsApp makes it official. I&rsquo;ll send a confirmation and a short list of what to prepare.</p>
          <a href="https://wa.me/6281298970396" className="btn btn-primary cta-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>
            Message on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
