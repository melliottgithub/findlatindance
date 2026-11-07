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
    description: 'Find Latin dance events worldwide: Multi-room congresses, weekend festivals, and authentic Latin club nights.',
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
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Anti-FOUC Theme Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (dark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200 antialiased selection:bg-amber-500/30 selection:text-amber-200">
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
