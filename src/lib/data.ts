// Portfolio data - centralized for easy updates
export const DATA = {
  name: 'Lin Phone Myint Zaw',
  title: 'Full‑Stack / React Native Developer',
  location: 'Yangon, Myanmar',
  phone: '+95 996 765 8131',
  email: 'linphonem@gmail.com',
  links: {
    portfolio: 'https://lpmz-portfolio.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/lin-phone-myint-zaw-025082176/',
  },
  summary:
    'Junior Software Engineer experienced in React Native, MERN, and backend (Node.js, Express). Passionate about clean architecture, strong documentation, and building real products.',
  experience: [
    {
      company: 'HighGround',
      role: 'Junior Developer (Remote)',
      period: 'July 2025 – Present',
      bullets: [
        'Developing cross‑platform mobile apps with React Native in an Agile environment.',
        'Writing requirements from customer input to clarify scope and support the team.',
        'Established consistency guidelines for navigation, API integration, theming, and UI/UX.',
        'Contributed structured documentation improving team alignment and maintainability.',
      ],
    },
    {
      company: 'NTT Data Myanmar',
      role: 'Junior System Engineer (Application Dev)',
      period: 'April 2025 – June 2025',
      bullets: [
        'Contributed to a FinTech system renewal project, focused on backend.',
        'Hands‑on requirement gathering and documentation within a large organization.',
      ],
    },
  ],
  projects: [
    {
      name: 'Minty – Personal Finance Management App',
      stack: ['React Native', 'Express.js', 'Zustand', 'JWT'],
      blurb:
        'Cross‑platform finance app with secure auth, offline support, patterns like pull‑to‑refresh, empty states, and skeleton loaders. Backend handles transactions, profiles, and sync.',
      href: '#',
      highlight: true,
    },
    {
      name: 'Intelligent Home Surveillance System',
      stack: ['Next.js', 'TensorFlow.js', 'FaceAPI.js', 'ml5.js'],
      blurb:
        'Web‑based AI security with object detection & face recognition; switches modes based on detected classes and emails alerts for strangers.',
      href: '#',
    },
    {
      name: 'Pharmacy Management System',
      stack: ['MERN', 'Agile', 'Team Lead'],
      blurb:
        'Inventory management web app for real‑time stock & sales; weekly client reviews; Gantt/Trello/GitHub for delivery.',
      href: '#',
    },
    {
      name: 'Hotel Booking Web Application',
      stack: ['Flask', 'React.js', 'Admin Dashboard'],
      blurb:
        'Responsive booking platform with room/hotel management and a simple admin portal.',
      href: '#',
    },
    {
      name: 'Peer‑to‑peer Rental Platform',
      stack: ['Next.js', 'Cloudinary', 'Search & Filters'],
      blurb:
        'Scalable listings site with advanced filtering and media storage via Cloudinary.',
      href: '#',
    },
  ],
  skills: {
    frontend: ['React Native', 'React.js', 'Next.js', 'WordPress'],
    backend: ['Node.js', 'Express.js', 'Flask'],
    databases: ['MongoDB', 'MySQL'],
    languages: ['TypeScript', 'JavaScript', 'Python', 'Java'],
    tools: [
      'Expo',
      'Git',
      'GitHub',
      'Bitbucket',
      'Postman',
      'Docker',
      'Trello',
      'Gantt Charts',
    ],
    aiml: ['TensorFlow.js', 'OpenCV', 'CNN Models', 'COCO‑SSD'],
    soft: ['Communication', 'Collaboration', 'Presentation', 'Adaptability'],
  },
  education: [
    {
      school: 'Edinburgh Napier University',
      credential: 'BSc (Hons) in Computing – Distinction',
      period: 'Aug 2023 – Mar 2025',
    },
    {
      school: 'Info Myanmar College',
      credential: 'Higher National Diploma in Software Engineering – Merits',
      period: 'Apr 2022 – Jun 2023',
    },
  ],
  certs: [
    'IT Passport (ITPEC) – 2022',
    'Basic Linux Skills – 2019',
    'Network Engineering – 2018',
    'Intermediate English – 2018',
    'CompTIA A+ – 2016',
  ],
};
