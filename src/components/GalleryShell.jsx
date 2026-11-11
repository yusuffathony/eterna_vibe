// ETERNA — gallery shell (client component): filters + load-more + grid
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { show } from './Lightbox.jsx';

export default function GalleryShell({ projects = [], categories = [] }) {
  const [category, setCategory] = useState('all');
  const [view, setView] = useState(6);

  const list =
    category === 'all'
      ? projects
      : projects.filter((p) => (p.category || '').toLowerCase() === category);

  return (
    <>
      <section className="reveal">
        <div className="wrap">
          <div className="chips">
            <button
              className={category === 'all' ? 'chip active' : 'chip'}
              onClick={() => setCategory('all')}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                className={category === c.slug ? 'chip active' : 'chip'}
                onClick={() => setCategory(c.slug)}
              >
                <img src={c.image} alt="" />
                {c.name}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <div className="empty-state reveal">
              <svg
                viewBox="0 0 24 24"
                width="48"
                height="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 21" strokeWidth="2" />
              </svg>
              <h3>Nothing here yet</h3>
              <p>No photos for this category. Add more in Strapi — they&rsquo;ll show up automatically.</p>
            </div>
          ) : (
            <div className="gallery-grid reveal">
              {list.slice(0, view).map((p, i) => (
                <div key={p.id || i} className="gallery-cell">
                  <div className="gallery-cell-wrap">
                    <Image
                      src={p.image}
                      alt={p.alt || p.caption || 'Gallery image'}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      onClick={() => show(p, i)}
                      onDoubleClick={() => show(p, i)}
                      className="gallery-cell-img"
                    />
                  </div>
                  <div className="caption">{p.caption || 'Untitled'}</div>
                </div>
              ))}
            </div>
          )}

          {list.length > view && (
            <div className="pager reveal">
              <button onClick={() => setView((v) => v + 3)}>Show more</button>
            </div>
          )}
        </div>
      </section>

      <section className="reveal">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-inner">
              <p className="cta-eyebrow">Book</p>
              <h2 className="cta-title">Ready for your session?</h2>
              <p className="cta-copy">Let&rsquo;s find a time that works. A quick WhatsApp makes it all official.</p>
              <a href="https://wa.me/6281298970396" className="btn btn-primary cta-btn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
