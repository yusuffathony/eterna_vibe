// ETERNA — hero
import Image from 'next/image';
import { cn } from '../lib/utils.js';

export default function Hero({
  kicker,
  title,
  intro,
  image,
  alt,
  ctaHref,
  ctaLabel,
  ghostHref,
  ghostLabel,
}) {
  return (
    <section className="hero">
      <div className="hero-img">
        <Image src={image} alt={alt || ''} fill sizes="100vw" priority />
      </div>
      <div className="hero-overlay" />

      <div className="hero-body">
        <p className="hero-kicker">{kicker || 'WEDDING · EVENT · PRODUCT'}</p>
        <h1>{title || 'Perfect your perfect moment.'}</h1>
        <p className="intro">{intro || 'Wedding, event & product photography — calm, elegant, and made to last.'}</p>

        <div className="hero-cta">
          <a href={ctaHref} className="btn btn-primary">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
            {ctaLabel || 'Book your session'}
          </a>
          {ghostHref && (
            <a href={ghostHref} className="btn btn-ghost">
              {ghostLabel || 'More'}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
