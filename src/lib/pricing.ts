export type PricingCard = {
  title: string;
  price: string;
  desc: string;
  bullets: string[];
  highlight?: boolean;
};

export type PricingTab = 'web' | 'mobile';

export const pricingData: Record<PricingTab, PricingCard[]> = {
  web: [
    {
      title: 'Landing Page',
      price: '500K-1M',
      desc: 'Perfect for marketing campaigns or personal portfolios.',
      bullets: [
        'Single page design',
        'Responsive + SEO basics',
        'Contact form integration',
        'Fast loading speed',
        'Social media links',
        '1 week delivery',
      ],
    },
    {
      title: 'Custom Website',
      price: '1.5M-2.5M',
      highlight: true,
      desc: 'A complete professional presence for your company.',
      bullets: [
        'Up to 7 custom pages',
        'CMS (Content Management)',
        'Advanced SEO setup',
        'Blog / News section',
        'Google Analytics setup',
        '2-3 weeks delivery',
      ],
    },
    {
      title: 'Web Application',
      price: '3M++',
      desc: 'Complex functionality like e-commerce, dashboards, or SaaS.',
      bullets: [
        'User Authentication',
        'Database design & setup',
        'Payment gateway integration',
        'Admin dashboard panel',
        'API development',
        '4-8 weeks delivery',
      ],
    },
  ],
  mobile: [
    {
      title: 'App MVP / Prototype',
      price: '750K-1M',
      desc: 'Validate your idea quickly with a functional prototype.',
      bullets: [
        'Core feature implementation',
        'Up to 5 main screens',
        'Basic API integration',
        'Local data storage',
        'iOS & Android builds',
        '2-3 weeks delivery',
      ],
    },
    {
      title: 'Interactive App',
      price: '2M-3M',
      highlight: true,
      desc: 'Engage customers with a dedicated mobile experience.',
      bullets: [
        'User profiles & Auth',
        'Real-time content feed',
        'Push notifications',
        'In-app search & filter',
        'App Store submission',
        '4-6 weeks delivery',
      ],
    },
    {
      title: 'Full-Scale Product',
      price: '4M++',
      desc: 'Complex applications with advanced features.',
      bullets: [
        'Complex state management',
        'Payment gateway integration',
        'Real-time chat/messaging',
        'Location/Maps services',
        'Advanced animations',
        'App Store & Play Store',
      ],
    },
  ],
};

export function parsePriceDisplay(price: string) {
  if (price.includes('++')) {
    return price.replace('++', '+');
  }
  return price;
}
