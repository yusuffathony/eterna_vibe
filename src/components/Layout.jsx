'use client';

// ETERNA — shared layout (client component)
// Wraps every page with the header, footer, and the reveal-on-scroll script.
import { useEffect, useRef } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout({ children, settings, siteTitle = 'ETERNA' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reveal = (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('inview');
          const fill = e.target.dataset.revealFill;
          if (fill) {
            // Border-radius reveal fill (optional) — skip for brevity.
          }
          setTimeout(() => e.target.classList.remove('reveal'), 1200);
        }
      }
    };

    const io = new IntersectionObserver(reveal, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    const reveals = el.querySelectorAll('.reveal');
    reveals.forEach((r) => io.observe(r));

    // Re-run when client-rendered content (e.g. gallery filters) is added.
    const mo = new MutationObserver(() => {
      setTimeout(() => {
        const again = el.querySelectorAll('.reveal').length;
        if (again) io.disconnect();
        Array.from(el.querySelectorAll('.reveal')).forEach((r) => io.observe(r));
      }, 120);
    });
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div className="site" ref={containerRef}>
      <Header siteTitle={siteTitle} />
      <main>{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
