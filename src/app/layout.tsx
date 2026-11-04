import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomTabBar } from '@/components/layout/BottomTabBar';

export const metadata: Metadata = {
  title: 'FindLatinDance — Multi-Room Congresses, Festivals & Latin Nights Worldwide',
  description: 'The premier worldwide directory for Latin social dance events: Salsa, Bachata, Brazilian Zouk, Kizomba, and Merengue socials, masterclasses, and multi-room congresses.',
  metadataBase: new URL('https://findlatindance.com'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'FindLatinDance — Worldwide Latin Dance Congresses & Socials',
    description: 'Find verified Latin dance events worldwide: Multi-room congresses, weekend festivals, and authentic Latin club nights.',
    url: 'https://findlatindance.com',
    siteName: 'FindLatinDance',
    type: 'website',
  },
  verification: {
    google: 'Kgudpzi7cfTtEZG_VFsf_SrK6s4u-6eMnvuP-gFA0u4',
  },
};

const GA_MEASUREMENT_ID = 'G-PS2X2TLNKJ';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { client_storage: 'none', anonymize_ip: true });
              (function () {
                var done = false;
                function inject() {
                  if (done) return;
                  done = true;
                  var s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
                  document.head.appendChild(s);
                }
                function onIdle() {
                  if (window.requestIdleCallback) window.requestIdleCallback(inject, { timeout: 1000 });
                  else setTimeout(inject, 1);
                }
                if (document.readyState === 'complete') onIdle();
                else window.addEventListener('load', onIdle, { once: true });
                setTimeout(inject, 4000);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#070709] text-[#f8fafc] antialiased selection:bg-amber-500/30 selection:text-amber-200">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomTabBar />
      </body>
    </html>
  );
}
