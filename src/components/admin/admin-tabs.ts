export type AdminTabId =
  | 'profile'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'certs'
  | 'services'
  | 'pricing'
  | 'estimate';

export type AdminTabMeta = {
  id: AdminTabId;
  label: string;
  /** Short hint for the sidebar / mobile picker */
  description: string;
};

export const ADMIN_TAB_ORDER: AdminTabMeta[] = [
  {
    id: 'profile',
    label: 'Profile & hero',
    description: 'Name, contact, hero copy, stats',
  },
  {
    id: 'experience',
    label: 'Experience',
    description: 'Roles, bullets, technologies',
  },
  {
    id: 'projects',
    label: 'Projects',
    description: 'Portfolio pieces & screenshots',
  },
  {
    id: 'skills',
    label: 'Skills',
    description: 'Stacks & proficiency tiers',
  },
  {
    id: 'education',
    label: 'Education',
    description: 'Degrees & courses',
  },
  {
    id: 'certs',
    label: 'Certs & wins',
    description: 'Certifications & achievements',
  },
  {
    id: 'services',
    label: 'Services copy',
    description: 'Services page hero & pillars',
  },
  {
    id: 'pricing',
    label: 'Pricing',
    description: 'Web & mobile price cards',
  },
  {
    id: 'estimate',
    label: 'Estimator',
    description: 'Feature catalog & base costs',
  },
];
