import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { loadAllData, getServices, getSettings } from '../../lib/data.js';

export const metadata: Metadata = {
  title: 'Services — ETERNA Photography',
  description: 'Wedding, event, product & architecture photography — elegant, calm, and made to last.',
};

export default async function ServicesPage() {
  const { data } = await loadAllData();
  const services = getServices(data);
  const settings = getSettings(data);

  return (
    <>
      <section className="reveal">
        <div className="wrap">
          <div className="hero">
            <div className="hero-img">
              <Image src={settings.heroImage || '/images/about.jpg'} alt="" fill sizes="100vw" />
            </div>
            <div className="hero-overlay" />
            <div className="hero-body">
              <p className="hero-kicker">What I Do</p>
              <h1 className="section-title">Four ways we work together</h1>
              <p className="intro">From the first spark of an idea to the framed print, each project is photographed with the same quiet attention and a photographer who is there from first to last.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="wrap">
          <div className="service-grid">
            {services.map((s, i) => (
              <article key={s.id || i} className="service-card reveal" data-delay={i}>
                <div className="img-wrap">
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="service-card-body">
                  <span className="service-tag">{s.slug}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description || 'A clear, human description of what this service involves.'}</p>
                  <Link href="/gallery" className="service-cta">More stories</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="wrap cta-inner">
          <div className="cta-band">
            <p className="cta-eyebrow">Book</p>
            <h2 className="cta-title">Have a project in mind?</h2>
            <p className="cta-copy">Send a short message with your idea, dates and the kind of images you want. We&rsquo;ll reply within one working day.</p>
            <a href="https://wa.me/6281298970396" className="btn btn-primary cta-btn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
