'use client';

// ETERNA — contact form → WhatsApp click-to-chat (no backend)
import { useState } from 'react';
import { buildWhatsAppLink } from '../lib/data.js';

export default function ContactForm({ phone = '+62 812 9897 0396', email = 'yusuf@jinno.id' }) {
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({ name: '', whatsapp: '', message: '' });
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const msg = values.message.trim();
    const name = values.name.trim();
    const whatsapp = values.whatsapp.trim();
    if (!name) return setError('Your name is required.');
    if (!whatsapp) return setError('A WhatsApp number is required.');
    if (!msg) return setError('A short message is required.');

    const chat = buildWhatsAppLink(whatsapp) + '?text=' + encodeURIComponent(
      `Halo Yusuf, nama saya ${name}. ${msg}`
    );
    window.open(chat, '_blank', 'noopener,noreferrer');
    setSent(true);
    setValues({ name: '', whatsapp: '', message: '' });
  };

  if (sent) {
    return (
      <div className="contact-form success" role="status">
        <div className="spinner" style={{ width: '32px', height: '32px' }} />
        <p>Your message is on its way — we&rsquo;ll reply on WhatsApp.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" type="text" value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} placeholder="Your name" autoComplete="name" />
      </div>
      <div className="form-row">
        <label htmlFor="cf-whatsapp">WhatsApp number</label>
        <input id="cf-whatsapp" type="tel" value={values.whatsapp} onChange={(e) => setValues((v) => ({ ...v, whatsapp: e.target.value }))} placeholder="62812 9897 0396" autoComplete="tel" />
      </div>
      <div className="form-row">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" value={values.message} onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))} placeholder="Tell us about your session…" />
      </div>
      <p className="form-note">Submitting opens a WhatsApp chat — no backend, no spam.</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
        Message via WhatsApp
      </button>
    </form>
  );
}
