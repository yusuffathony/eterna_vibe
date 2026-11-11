import './globals.css';
import type { ReactNode } from 'react';
import Layout from '../components/Layout.jsx';
import { loadAllData } from '../lib/data.js';

export const metadata = {
  title: 'ETERNA — Wedding, Event & Product Photography',
  description: 'Professional wedding, event & product photography. Elegantly captured, calmly told.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { data, note } = await loadAllData();
  const settings = data.settings || {};

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111111" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {note && <meta name="robots" content="noindex" />}
      </head>
      <body>
        <Layout settings={settings} siteTitle={settings.siteTitle || 'ETERNA'}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
