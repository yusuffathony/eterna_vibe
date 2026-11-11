// ETERNA — CMS data layer + local demo seed
// The frontend is a fixed-template site: CMS feeds content only.
// Content-model mapping (design spec §5):
//   Settings  -> site title, logo, favicon, footer text, social links
//   Categories-> name, slug, image, description  (feeds gallery filters)
//   Projects  -> image, caption, alt, category (relation) -> gallery
//   Services  -> title, description, image, slug       -> services page
//   Testimonials -> name, text, photo, role            -> about / home quote
//   About     -> short bio, image, quote               -> about page
//   Contact   -> phone, email, address, whatsapp-link   -> contact page

const CMS_ROUTES = {
  settings: 'api/settings',
  categories: 'api/categories',
  projects: 'api/projects',
  services: 'api/services',
  testimonials: 'api/testimonials',
  about: 'api/about',
  contact: 'api/contact',
};

// When NEXT_PUBLIC_STRAPI_URL is not set, render with local demo data so
// the templates work out of the box. Set it to the CMS host (e.g.
// http://localhost:1337) to use the real CMS.
const USE_CMS = !!process.env.NEXT_PUBLIC_STRAPI_URL;

// ---------- Local seed (mirrors what CMS will return) ----------
const SEED = {
  settings: {
    siteTitle: 'ETERNA',
    heroImage: '/images/hero.jpg',
    tagline: 'Wedding · Event · Product photography',
    footerText: 'ETERNA Photography is operated by Yusuf, a JINNO member.',
    logoAlt: 'ETERNA Photography logo',
    social: [
      { label: 'WhatsApp', url: 'https://wa.me/6281298970396' },
      { label: 'Instagram', url: 'https://instagram.com/eterna.jinno' },
    ],
  },
  categories: [
    { id: 'cat-wed', name: 'Weddings', slug: 'weddings', image: '/images/cat-wed.jpg', description: 'Spotlight moments' },
    { id: 'cat-evt', name: 'Events', slug: 'events', image: '/images/cat-evt.jpg', description: 'Big days, close up' },
    { id: 'cat-pro', name: 'Products', slug: 'products', image: '/images/cat-pro.jpg', description: 'Brand & e-commerce' },
    { id: 'cat-arc', name: 'Architecture', slug: 'architecture', image: '/images/cat-arc.jpg', description: 'Spaces & light' },
  ],
  projects: [
    { id: 'p1', image: '/images/g1.jpg', caption: 'Wedding Ceremony', alt: 'Bride and groom laughing at the altar', category: 'Weddings' },
    { id: 'p2', image: '/images/g2.jpg', caption: 'Fragrance Campaign', alt: 'Product flat-lay in warm tones', category: 'Products' },
    { id: 'p3', image: '/images/g3.jpg', caption: 'Bali Heritage Pavilion', alt: 'Pavilion interior at golden hour', category: 'Architecture' },
    { id: 'p4', image: '/images/g4.jpg', caption: 'Corporate Launch Evening', alt: 'Dinner party with stage', category: 'Events' },
    { id: 'p5', image: '/images/g5.jpg', caption: 'Winter Apparel Lookbook', alt: 'Fashion editorial in studio', category: 'Products' },
    { id: 'p6', image: '/images/g6.jpg', caption: 'Engagement Session', alt: 'Couple holding hands on a bench', category: 'Weddings' },
    { id: 'p7', image: '/images/g7.jpg', caption: 'Product Launch Party', alt: 'Lighting setup and guests', category: 'Events' },
    { id: 'p8', image: '/images/g8.jpg', caption: 'Minimalist Residence', alt: 'Living room with large window', category: 'Architecture' },
    { id: 'p9', image: '/images/g9.jpg', caption: 'Bridal Portrait Series', alt: 'Groom holding bride in a field', category: 'Weddings' },
  ],
  services: [
    { id: 's-wed', title: 'Wedding', slug: 'wedding', image: '/images/g1.jpg', description: 'From engagement sessions to the final dances — a complete wedding story told with warmth and calm.' },
    { id: 's-evt', title: 'Event', slug: 'event', image: '/images/g4.jpg', description: 'Corporate and private events photographed with a documentary eye and clean, editorial lighting.' },
    { id: 's-pro', title: 'Product', slug: 'product', image: '/images/g2.jpg', description: 'Shooting for brands and e-commerce — packaging, lookbooks, and campaign stills that convert.' },
    { id: 's-arc', title: 'Architecture', slug: 'architecture', image: '/images/g3.jpg', description: 'Building interiors and exteriors where light, line, and space take centre stage.' },
  ],
  testimonials: [
    { id: 't1', name: 'Lara & Denis', text: 'ETERNA captured our day exactly as we remembered it — calm, beautiful, and completely true to us.', photo: '/images/cat-wed.jpg', role: 'Wedding clients, 2025' },
    { id: 't2', name: 'Nadia Mirza', text: 'Professional, discreet, and endlessly creative. Our product campaign was worth every penny.', photo: '/images/cat-pro.jpg', role: 'Brand client, 2025' },
  ],
  about: {
    bio: 'Yusuf is a photographer based in [city] specializing in weddings, events, and product work. He worked in commercial studios for eight years before going independent, and has been a member of JINNO since 2021. His practice is built on quiet preparation, natural light, and the belief that a photograph should feel like a memory.',
    image: '/images/about.jpg',
    quote: '“A photographer doesn’t make pictures — he preserves the moment you forgot to hold onto.”',
  },
  contact: {
    phone: '+62 812 9897 0396',
    whatsapp: '6281298970396',
    email: 'yusuf@jinno.id',
    address: '[City, Country]',
  },
};

const DEMO_NOTE =
  'Local demo data — no CMS connection configured. Set NEXT_PUBLIC_STRAPI_URL to use the live CMS.';

// ---------- Helpers ----------
const toSlug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function withQs(url, params = {}) {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (Array.isArray(v)) v.forEach((x) => usp.append(k, x));
    else if (v !== undefined && v !== null) usp.append(k, v);
  }
  const q = usp.toString();
  return q ? `${url}${q ? '?' : ''}${q}` : url;
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.json();
}

// Overlay CMS results on the seed; missing collections keep their seed values.
// Tolerates both raw payloads and CMS's `{ projects: [...], total: 123 }` shape.
function unwrap(payload) {
  if (!payload) return {};
  // CMS returns { projects: [...], total: N } for paginated endpoints
  // and raw arrays/objects for others
  if (payload.projects !== undefined) return payload.projects;
  if (payload.data !== undefined) return payload.data;
  return payload;
}

async function fetchCMSAll() {
  const base = USE_CMS ? new URL(process.env.NEXT_PUBLIC_STRAPI_URL) : null;
  const host = base ? `${base.origin}` : '';

  const [settings, categories, projects, services, testimonials, about, contact] = await Promise.all([
    fetchJson(host ? withQs(`${host}/${CMS_ROUTES.settings}`) : 'data:none').catch(() => null),
    fetchJson(host ? withQs(`${host}/${CMS_ROUTES.categories}`) : 'data:none').catch(() => null),
    fetchJson(host ? withQs(`${host}/${CMS_ROUTES.projects}`) : 'data:none').catch(() => null),
    fetchJson(host ? withQs(`${host}/${CMS_ROUTES.services}`) : 'data:none').catch(() => null),
    fetchJson(host ? withQs(`${host}/${CMS_ROUTES.testimonials}`) : 'data:none').catch(() => null),
    fetchJson(host ? withQs(`${host}/${CMS_ROUTES.about}`) : 'data:none').catch(() => null),
    fetchJson(host ? withQs(`${host}/${CMS_ROUTES.contact}`) : 'data:none').catch(() => null),
  ]);

  const seed = JSON.parse(JSON.stringify(SEED));
  Object.assign(seed.settings, unwrap(settings));
  Object.assign(seed.categories, unwrap(categories));
  Object.assign(seed.projects, unwrap(projects));
  Object.assign(seed.services, unwrap(services));
  Object.assign(seed.testimonials, unwrap(testimonials));
  Object.assign(seed.about, unwrap(about));
  Object.assign(seed.contact, unwrap(contact));
  return seed;
}

// ---------- Public API ----------
export function isStrapiConfigured() {
  return USE_CMS;
}

export async function loadAllData() {
  if (!USE_CMS) {
    return { source: 'local', note: DEMO_NOTE, data: SEED };
  }
  try {
    const data = await fetchCMSAll();
    return { source: 'cms', note: null, data };
  } catch (err) {
    console.warn('ETERNA: fell back to local demo data — set NEXT_PUBLIC_STRAPI_URL to use CMS', err);
    const data = await fetchCMSAll();
    return { source: 'local', note: DEMO_NOTE, data };
  }
}

// ---------- Payload helpers (for rendering) ----------
export function getCategories(data) {
  return (data.categories || SEED.categories).map((c) => ({
    id: c.id || c.slug,
    name: c.name,
    slug: c.slug || toSlug(c.name),
    image: c.image || '/images/cat-wed.jpg',
    description: c.description,
  }));
}

export function getProjects(data, categorySlug) {
  let list = data.projects || SEED.projects;
  if (categorySlug && categorySlug !== 'all') {
    list = list.filter((p) => (p.category || '').toLowerCase() === categorySlug);
  }
  return list;
}

export function getServices(data) {
  return (data.services || SEED.services).map((s) => ({
    id: s.id || s.slug,
    title: s.title,
    slug: s.slug || toSlug(s.title),
    image: s.image || '/images/g1.jpg',
    description: s.description,
  }));
}

export function getTestimonials(data) {
  return (data.testimonials || SEED.testimonials).map((t) => ({
    id: t.id,
    name: t.name,
    text: t.text,
    photo: t.photo || '/images/cat-wed.jpg',
    role: t.role,
  }));
}

export function getAbout(data) {
  return { ...SEED.about, ...((data.about || {}) || {}) };
}

export function getContact(data) {
  const seed = SEED.contact;
  const c = data.contact || {};
  return {
    phone: c.phone || seed.phone,
    whatsapp: c.whatsapp || seed.whatsapp,
    email: c.email || seed.email,
    address: c.address || seed.address,
  };
}

export function getSettings(data) {
  return { ...SEED.settings, ...((data.settings || {}) || {}) };
}

export function buildWhatsAppLink(phone) {
  const cleaned = (phone || '').replace(/[+\s-]/g, '');
  return cleaned ? `https://wa.me/${cleaned}` : '#';
}

export function formatPhone(phone, country) {
  // Friendly display for the site footer: '+62 812 9897 0396' -> '+62 812 9897 0396'
  return (phone || '').replace(/[+\s-]/g, ' ').trim() || '+62 812 9897 0396';
}