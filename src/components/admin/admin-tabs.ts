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

export const ADMIN_TAB_ORDER: { id: AdminTabId; label: string }[] = [
  { id: 'profile', label: 'Profile & hero' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certs', label: 'Certs & wins' },
  { id: 'services', label: 'Services copy' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'estimate', label: 'Estimator' },
];
