export interface LearnArticle {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  description: string;
  publishDate: string;
  keywords: string[];
}

export const ARTICLES: LearnArticle[] = [
  {
    slug: 'latin-dance-styles-guide',
    title: 'The Complete Guide to Latin Dance: Salsa, Bachata, Zouk & Kizomba Compared',
    category: 'Style Overview',
    readingTime: '7 min read',
    description: 'Not sure which Latin dance style to start with? Compare rhythm, origins, posture, partner dynamics, and musicality across Salsa, Bachata, Brazilian Zouk, Kizomba, and Merengue.',
    publishDate: '2026-03-15',
    keywords: ['latin dance styles', 'salsa vs bachata', 'what is brazilian zouk', 'kizomba guide', 'beginner dance classes'],
  },
  {
    slug: 'what-is-brazilian-zouk',
    title: 'What is Brazilian Zouk? Roots, Music, Circular Flow & Head Movement Dynamics',
    category: 'Dance Spotlight',
    readingTime: '6 min read',
    description: 'Originating from Brazilian Lambada, Zouk has evolved into one of the most expressive partner dances in the world with counterbalances, hair whips, and deep body isolations.',
    publishDate: '2026-03-20',
    keywords: ['what is brazilian zouk', 'brazilian zouk history', 'lambada to zouk', 'zouk head movements', 'zouk music'],
  },
  {
    slug: 'what-is-kizomba',
    title: 'What is Kizomba? Angolan Origins, Semba Connection & Urban Kiz Evolution',
    category: 'Dance Spotlight',
    readingTime: '6 min read',
    description: 'Discover the intimate rhythm of Kizomba born in Angola in the late 1970s. Learn the difference between traditional Angolan Kizomba, Semba, and modern European Urban Kiz.',
    publishDate: '2026-03-25',
    keywords: ['what is kizomba', 'kizomba angola', 'urban kiz vs traditional kizomba', 'semba dance', 'kizomba music'],
  },
  {
    slug: 'what-to-wear-latin-dance-social',
    title: 'What to Wear to a Latin Dance Social: Shoes, Soles & Outfit Essentials',
    category: 'Social Guide',
    readingTime: '5 min read',
    description: 'The definitive dress code guide for weekly Latin socials and weekend multi-room congresses: suede-soled dance shoes, breathable fabrics, and floor bag essentials.',
    publishDate: '2026-04-01',
    keywords: ['what to wear latin dancing', 'salsa social outfit', 'bachata dance shoes', 'suede sole shoes', 'social dance attire'],
  },
  {
    slug: 'latin-social-dance-etiquette',
    title: 'The Unwritten Rules of Latin Social Dancing: Floor Craft, Asking & Respect',
    category: 'Community Etiquette',
    readingTime: '6 min read',
    description: 'Master the community norms that keep socials fun, safe, and welcoming: how to invite someone to dance, handling refusals, navigation in crowded rooms, and hygiene.',
    publishDate: '2026-04-05',
    keywords: ['latin dance etiquette', 'social dance etiquette', 'how to ask someone to dance', 'dance floor safety', 'salsa bachata manners'],
  },
];
