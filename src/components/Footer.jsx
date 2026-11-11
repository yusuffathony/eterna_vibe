// ETERNA — shared footer
import { buildWhatsAppLink } from '../lib/data.js';

const DEFAULT_SETTINGS = {
  siteTitle: 'ETERNA',
  footerText: 'ETERNA Photography is run by Yusuf, a JINNO member.',
  logoAlt: 'ETERNA Photography',
  social: [
    { label: 'WhatsApp', url: 'https://wa.me/6281298970396' },
    { label: 'Instagram', url: 'https://instagram.com/eterna.jinno' },
  ],
};

export default function Footer({ settings }) {
  const s = { ...DEFAULT_SETTINGS, ...settings };
  const phone = s.contact?.phone || '+62 812 9897 0396';
  const whatsappHref = buildWhatsAppLink(phone);

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-about">
            <a href="/">
              <span className="brand">{s.siteTitle}</span>
            </a>
            <p>{s.footerText || 'Photography for weddings, events & products — elegant, calm, and made to last.'}</p>
            <a href={whatsappHref} className="footer-cta">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
              {phone}
            </a>
          </div>

          <div className="footer-meta">
            <div>
              <h4>Contact</h4>
              <div className="row">
                <p className="phone">
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                </p>
                {s.contact?.email && (
                  <p className="email">
                    <a href={`mailto:${s.contact.email}`}>{s.contact.email}</a>
                  </p>
                )}
              </div>
            </div>
            <div>
              <h4>Branding</h4>
              <div className="row">
                {s.social?.map((sc) => (
                  <a key={sc.label} href={sc.url} target="_blank" rel="noopener noreferrer">
                    {sc.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4>JI N N O</h4>
              <div className="row">
                <p>Member · Yogyakarta</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {s.siteTitle}. All rights reserved.</p>
          <p className="jinno">Designed &amp; built by <strong>Yusuf</strong> · JINNO member</p>
        </div>
      </div>
    </footer>
  );
}
