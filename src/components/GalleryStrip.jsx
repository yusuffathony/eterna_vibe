'use client';

// ETERNA — homepage gallery strip (4 large images, double-tap to view)
import Image from 'next/image';

export default function GalleryStrip({ photos = [], onOpen = () => {} }) {
  if (!photos || photos.length === 0) {
    return <div className="gallery-strip empty">No images yet — upload photos in Strapi.</div>;
  }
  const shown = photos.slice(0, 4);
  return (
    <div className="gallery-strip">
      {shown.map((p, i) => (
        <div
          key={p.id || i}
          className="gallery-strip-cell"
          onClick={() => onOpen && onOpen([p], i)}
          onDoubleClick={() => onOpen && onOpen([p], i)}
          tabIndex={0}
          role="button"
          aria-label={`View ${p.caption || 'image'}`}
        >
          <div className="gallery-strip-cell-wrap">
            <Image src={p.image} alt={p.alt || p.caption || ''} fill sizes="(max-width: 600px) 50vw, 25vw" />
            <div className="gallery-strip-cell-cap">{p.caption || 'Untitled'}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
