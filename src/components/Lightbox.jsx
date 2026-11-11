// ETERNA — Lightbox / image viewer
// Full-screen near-black, fades in, caption fades up, keyboard (Esc/arrows)
// + touch swipe + click-outside to close. Single- or multi-image.
'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const PORTAL_ID = 'eterna-lightbox-portal';
const nextId = (i, n) => (i + 1) % n;
const prevId = (i, n) => ((i - 1) % n + n) % n;

let currentPhotos = null; // exact reference (array or single photo object)
let currentIndex = 0;
let root = null;

function getRoot() {
  if (!root) {
    root = document.createElement('div');
    root.id = PORTAL_ID;
    root.className = 'lightbox';
    document.body.appendChild(root);
  }
  return root;
}

// Open the lightbox. Accepts a single photo object OR an array of photos.
export function show(photos, index = 0) {
  currentPhotos = photos;
  currentIndex = index;
}

function toList(photos) {
  if (Array.isArray(photos)) return photos;
  if (photos != null && typeof photos === 'object') return [photos];
  return [];
}

export default function Lightbox({ photos }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [list, setList] = useState([]);
  const containerRef = useRef(null);

  // Open when this instance's `photos` reference matches the pending `show()`.
  useEffect(() => {
    if (photos !== currentPhotos) return;
    if (!open) {
      setOpen(true);
      setIdx(currentIndex);
      setList(toList(photos));
    }
  }, [photos, open, currentPhotos, currentIndex]);

  // Reflect the open state on the portal container.
  useEffect(() => {
    const r = getRoot();
    if (open) {
      r.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      r.classList.remove('open');
      document.body.style.overflow = '';
    }
  }, [open]);

  // Keyboard + swipe + click-outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    const onDocClick = (e) => {
      if (e.target === e.currentTarget) close();
    };
    const onPointerDown = (e) => {
      if (e.target === containerRef.current) close();
    };
    let touchX = 0;
    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      touchX = e.touches[0].clientX;
    };
    const onTouchEnd = (e) => {
      if (e.changedTouches.length !== 1) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 48) dx > 0 ? goNext() : goPrev();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onDocClick);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onDocClick);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [open, idx]);

  const goNext = () => {
    const n = list.length;
    if (!n) return;
    setIdx(nextId(idx, n));
  };
  const goPrev = () => {
    const n = list.length;
    if (!n) return;
    setIdx(prevId(idx, n));
  };
  const close = () => {
    setOpen(false);
    document.body.style.overflow = '';
  };

  if (!open) return null;

  const source = list[idx] || list[0];
  const n = list.length;

  return createPortal(
    <div
      ref={containerRef}
      className="lightbox-inner"
      onClick={onDocClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <img src={source.image} alt={source.alt || ''} draggable={false} />
      {n > 1 && (
        <>
          <button className="lightbox-nav prev" aria-label="Previous image" onClick={goPrev}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button className="lightbox-nav next" aria-label="Next image" onClick={goNext}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </>
      )}
      <div className="lightbox-caption">
        <p>{source.caption || ''}</p>
        {n > 1 && <span className="lightbox-count">{idx + 1} / {n}</span>}
      </div>
      <button className="lightbox-close" aria-label="Close viewer" onClick={close}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
      </button>
    </div>,
    getRoot()
  );
}
