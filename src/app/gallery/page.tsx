import type { Metadata } from 'next';
import { loadAllData, getCategories, getProjects } from '../../lib/data.js';
import GalleryShell from '../../components/GalleryShell.jsx';

export const metadata: Metadata = {
  title: 'Gallery — ETERNA Photography',
  description: 'A selection of weddings, events and product stories photographed by ETERNA.',
};

export default async function Gallery() {
  const { data } = await loadAllData();
  const categories = getCategories(data);
  const allProjects = getProjects(data);

  return (
    <>
      <section className="reveal">
        <div className="wrap">
          <div className="gallery-header">
            <div>
              <p className="section-eyebrow">Gallery</p>
              <h1 className="section-title">The Gallery</h1>
              <p className="intro">Every frame is a moment, kept with care. Filter by category below, or open any image to see it larger.</p>
            </div>
          </div>
        </div>
      </section>

      <GalleryShell projects={allProjects} categories={categories} />
    </>
  );
}
