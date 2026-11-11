// ETERNA — Next.js configuration
// Image optimization: AVIF/WebP for Strapi (remote) images via the
// Image Optimization API; local demo images in `public/` are served
// through `<Image>` with proper width/height + lazy loading.
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Resolve the Strapi host from the env at build time so the
    // Image Optimization API can process uploaded photos.
    remotePatterns: (process.env.NEXT_PUBLIC_STRAPI_URL
      ? [{
          protocol: 'https',
          hostname: new URL(process.env.NEXT_PUBLIC_STRAPI_URL).hostname,
        }]
      : []),
    // Serve AVIF + WebP where the optimizer handles the asset.
    formats: ['image/avif', 'image/webp'],
    // Mobile-first, plus a desktop tier for full-width hero/work.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 384],
    // Keep optimized copies warm so FCP stays light.
    minimumCacheTTL: 60 * 60 * 24,
    // Respect the fixed templates: never transform the layout.
    unoptimized: false,
  },
};

module.exports = nextConfig;
