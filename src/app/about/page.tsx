import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { loadAllData, getAbout, getContact, getProjects } from '../../lib/data.js';

export const metadata: Metadata = {
  title: 'About — ETERNA Photography',
  description: 'A short story of the photographer behind ETERNA.',
};

export default async function AboutPage() {
  const { data } = await loadAllData();
  const about = getAbout(data);
  const contact = getContact(data);
  const projects = getProjects(data);
  const favImages = projects.slice(0, 4);

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
              <p className="hero-kicker">About</p>
              <h1 className="section-title">The photographer</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-intro">{about.bio || 'Photographer based in Yogyakarta. Specialising in weddings, events and products — at this moment, a gentle and human story.'}</div>
            <div className="about-meta">
              <div className="meta-item">
                <span className="label">Specialty</span>
                <span className="value">Weddings &amp; events</span>
              </div>
              <div className="meta-item">
                <span className="label">Style</span>
                <span className="value">Natural light, documentary</span>
              </div>
              <div className="meta-item">
                <span className="label">Member</span>
                <span className="value">JINNO</span>
              </div>
              <div className="meta-item">
                <span className="label">Since</span>
                <span className="value">2015</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="wrap">
          <div className="gallery-header">
            <div>
              <p className="section-eyebrow">Work I love</p>
              <h2 className="section-title">A few favourites</h2>
            </div>
            <Link href="/gallery" className="btn btn-ghost">See all</Link>
          </div>
          <div className="gallery-grid">
            {favImages.map((p, i) => (
              <div key={p.id || i} className="gallery-cell">
                <div className="gallery-cell-wrap">
                  <Image src={p.image} alt={p.caption || ''} fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="caption">{p.caption || ''}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="wrap">
          <blockquote className="testimonial reveal">
            {about.quote || '“A good photograph is one that leaves the mind a little more uncertain than it was.”'}
            <cite>
              <span><strong>Yusuf</strong><small>Photographer · ETERNA</small></span>
            </cite>
          </blockquote>
        </div>
      </section>

      <section className="reveal">
        <div className="wrap cta-band">
          <div className="cta-inner">
            <p className="cta-eyebrow">Book</p>
            <h2 className="cta-title">Let&rsquo;s make your story</h2>
            <p className="cta-copy">A quiet, human session — we&rsquo;ll talk about what you need and I&rsquo;ll bring home the images.</p>
            <a href={`https://wa.me/${contact.whatsapp}`} className="btn btn-primary cta-btn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
