'use client';

// ETERNA — shared header
import { useState } from 'react';
import { buildWhatsAppLink } from '../lib/data.js';

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header({ siteTitle = 'ETERNA', ctaHref, ctaLabel = 'WhatsApp' }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a href="/" aria-label={siteTitle}>
          <span className="brand">{siteTitle}</span>
        </a>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-primary"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="nav-primary" className="nav" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <a href={ctaHref} className="header-cta">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
          {ctaLabel}
        </a>
      </div>
    </header>
  );
}
