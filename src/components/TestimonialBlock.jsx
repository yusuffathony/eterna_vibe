// ETERNA — testimonial / client story
import Image from 'next/image';

export default function TestimonialBlock({ testimonials = [] }) {
  const t = testimonials && testimonials.length ? testimonials[0] : null;
  if (!t) return null;
  return (
    <div className="testimonial reveal">
      <blockquote>{t.text}</blockquote>
      <cite>
        <Image src={t.photo} alt={t.name} width={40} height={40} className="rounded" />
        <span>
          <strong>{t.name}</strong>
          <small>{t.role}</small>
        </span>
      </cite>
    </div>
  );
}
