'use client';

// ETERNA — category chips + cards (homepage / nav)
import Link from 'next/link';
import { getCategories } from '../lib/data.js';
import { cn } from '../lib/utils.js';

export default function Categories({ categories, active = 'all', onChange = () => {} }) {
  const cats = getCategories(categories || []);
  return (
    <div className="reveal">
      <div className="chips">
        <button
          className={cn('chip', active === 'all' && 'active')}
          onClick={() => onChange && onChange('all')}
        >
          All
        </button>
        {cats.map((c) => (
          <button
            key={c.id}
            className={cn('chip', active === c.slug && 'active')}
            onClick={() => onChange && onChange(c.slug)}
          >
            <img src={c.image} alt="" />
            {c.name}
          </button>
        ))}
      </div>
      <div className="cat-grid">
        {cats.map((c) => (
          <Link key={c.id} href={`/gallery?category=${c.slug}`}>
            <article className="cat-card">
              <img src={c.image} alt={c.name} />
              <div className="cat-card-body">
                <span className="cat-tag">{c.slug}</span>
                <h3>{c.name}</h3>
                <p>{c.description || 'Stories from the field.'}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
