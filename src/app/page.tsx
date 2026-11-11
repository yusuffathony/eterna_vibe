import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { loadAllData, getCategories, getProjects, getTestimonials, getAbout, getSettings } from '../lib/data.js';
import Hero from '../components/Hero.jsx';
import Categories from '../components/Categories.jsx';
import GalleryStrip from '../components/GalleryStrip.jsx';
import TestimonialBlock from '../components/TestimonialBlock.jsx';

export const metadata: Metadata = {
  title: 'ETERNA — Wedding, Event & Product Photography',
  description: 'Professional wedding, event & product photography. Elegantly captured, calmly told.',
};

export default async function Home() {
  const { data } = await loadAllData();
  const settings = getSettings(data);
  const categories = getCategories(data);
  const projects = getProjects(data);
  const testimonials = getTestimonials(data);
  const about = getAbout(data);

  const facebookHref = 'https://facebook.com/eterna.jinno';
  const instagramHref = 'https://instagram.com/eterna.jinno';

  return (
    <>
      <Hero
        kicker={settings.tagline || 'WEDDING · EVENT · PRODUCT'}
        title="Perfect your perfect moment."
        intro="Wedding, event & product photography — calmly told, elegantly composed."
        image={settings.heroImage || '/images/hero.jpg'}
        alt="Photographer at work"
        ctaHref="/contact"
        ctaLabel="Book your session"
        ghostHref="/gallery"
        ghostLabel="More"
      />

      <section className="reveal">
        <div className="wrap">
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
          </div>

          <div className="testimonial">
            <blockquote>{about.quote || '“A good photograph is one that leaves the mind a little more uncertain than it was.”'}</blockquote>
            <cite>
              <span><strong>Yusuf</strong><small>Photographer · ETERNA</small></span>
            </cite>
          </div>
        </div>
      </section>

      <Categories categories={categories} />

      <section className="reveal">
        <div className="wrap">
          <div className="gallery-header">
            <div>
              <p className="section-eyebrow">Gallery</p>
              <h2 className="section-title">Selected work</h2>
            </div>
            <Link href="/gallery" className="btn btn-ghost">View all</Link>
          </div>
          <GalleryStrip photos={projects} />
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap cta-inner">
          <p className="cta-eyebrow">Book</p>
          <h2 className="cta-title">Ready for your session?</h2>
          <p className="cta-copy">Let&rsquo;s find a time that works. A quick WhatsApp makes it all official — I&rsquo;ll send a confirmation shortly.</p>
          <a href="https://wa.me/6281298970396" className="btn btn-primary cta-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>
            Message on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
