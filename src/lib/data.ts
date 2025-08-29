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
    github: 'https://github.com/yourusername', // Add your GitHub
  },
  summary:
    'Junior Software Engineer experienced in React Native, MERN, and backend (Node.js, Express). Passionate about building real products that solve problems, clean architecture, and AI.',
  // Add more detailed personal info
  about: {
    tagline:
      'Building mobile-first experiences with strong API and data modeling foundations',
    availability: 'Available for freelance opportunities',
    yearsOfExperience: 2,
    totalProjects: 5,
    technologiesMastered: 12,
    typewriterStrings: [
      'Full‑Stack / React Native Developer',
      'Graduate from Edinburgh Napier University',
      'Building real products with clean code',
    ],
  },
  experience: [
    {
      company: 'HighGround',
      role: 'Junior Developer (Remote)',
      period: 'July 2025 – Present',
      location: 'Remote',
      type: 'Full-time',
      bullets: [
        'Developing cross‑platform mobile apps with React Native in an Agile environment.',
        'Writing requirements from customer input to clarify scope and support the team.',
        'Established consistency guidelines for navigation, API integration, theming, and UI/UX.',
        'Work on overseas projects with international clients.',
      ],
      technologies: ['React Native', 'TypeScript', 'Agile', 'Documentation'],
    },
    {
      company: 'NTT Data Myanmar',
      role: 'Junior System Engineer (Application Dev)',
      period: 'April 2025 – June 2025',
      location: 'Yangon, Myanmar',
      type: 'Full-time',
      bullets: [
        'Contributed to a FinTech project, focused on backend.',
        'Hands‑on requirement gathering and documentation within a large organization.',
      ],
      technologies: [
        'Backend Development',
        'Requirements Gathering',
        'Documentation',
      ],
    },
  ],
  projects: [
    {
      name: 'PropertyApp – Advanced Trading & Investment Dashboard',
      stack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'AsyncStorage'],
      blurb:
        'Sophisticated property investment platform with real-time trading, live P&L tracking, 7-day performance charts, buy/sell functionality, and advanced portfolio analytics. Features market simulation, transaction history, and professional-grade trading interfaces.',
      href: '#',
      highlight: true,
      category: 'Mobile Development',
      year: 2025,
      status: 'Completed',
      features: [
        'Real-time Trading',
        'P&L Tracking',
        'Portfolio Analytics',
        'Market Simulation',
        '7-Day Performance Chart',
        'Virtual Trading',
      ],
      // PropertyApp-specific data for preview
      preview: {
        platform: 'iOS & Android',
        buysell: 'Buy/Sell',
        featurePills: ['Real-time Trading', 'Portfolio Analytics'],
        screenshot: '/property-project/home1.png',
        screenshots: [
          {
            id: 1,
            src: '/property-project/home1.png',
            title: 'Dashboard Overview',
            description:
              'Main trading dashboard with portfolio summary and key metrics',
          },
          {
            id: 2,
            src: '/property-project/home2.png',
            title: 'Top P&L Properties',
            description: 'Detailed portfolio performance and analytics view',
          },
          {
            id: 3,
            src: '/property-project/home3.png',
            title: 'P&L Tracking',
            description: 'Live trading interface with buy/sell functionality',
          },
          {
            id: 4,
            src: '/property-project/home4.png',
            title: 'Recent Trades',
            description: 'Profit and loss tracking with detailed analytics',
          },
          {
            id: 5,
            src: '/property-project/home5.png',
            title: 'Buy',
            description: 'Real-time market data and price charts',
          },
          {
            id: 6,
            src: '/property-project/home6.png',
            title: 'Sell',
            description: 'Complete transaction log and history view',
          },
          {
            id: 7,
            src: '/property-project/home7.png',
            title: 'Transaction Success',
            description: 'Advanced portfolio analytics and insights',
          },
          {
            id: 8,
            src: '/property-project/property1.png',
            title: 'Property Management',
            description: 'Property listing and management interface',
          },
          {
            id: 9,
            src: '/property-project/property2.png',
            title: 'Property Details',
            description: 'Detailed property information and metrics',
          },
          {
            id: 10,
            src: '/property-project/profile1.png',
            title: 'User Profile',
            description: 'User profile and account management',
          },
          {
            id: 11,
            src: '/property-project/profile2.png',
            title: 'Account Settings',
            description: 'Account settings and preferences',
          },
          {
            id: 12,
            src: '/property-project/manage1.PNG',
            title: 'Management Dashboard',
            description: 'Administrative dashboard and controls',
          },
        ],
      },
    },
    {
      name: 'Intelligent Home Surveillance System',
      stack: ['Next.js', 'TensorFlow.js', 'FaceAPI.js', 'ml5.js'],
      blurb:
        'Web‑based AI security with object detection & face recognition; switches modes based on detected classes and emails alerts for strangers.',
      href: '#',
      category: 'AI & Computer Vision',
      year: 2024,
      status: 'Completed',
      features: [
        'Object Detection',
        'Face Recognition',
        'Email Alerts',
        'Mode Switching',
      ],
    },
    {
      name: 'Pharmacy Management System',
      stack: ['MERN', 'Agile', 'Team Lead'],
      blurb:
        'Inventory management web app for real‑time stock & sales; weekly client reviews; Gantt/Trello/GitHub for delivery.',
      href: '#',
      category: 'Full-Stack Development',
      year: 2024,
      status: 'Completed',
      features: [
        'Inventory Management',
        'Real-time Stock',
        'Client Reviews',
        'Team Collaboration',
      ],
    },
    {
      name: 'Hotel Booking Web Application',
      stack: ['Flask', 'React.js', 'Admin Dashboard'],
      blurb:
        'Responsive booking platform with room/hotel management and a simple admin portal.',
      href: '#',
      category: 'Full-Stack Development',
      year: 2023,
      status: 'Completed',
      features: [
        'Room Booking',
        'Hotel Management',
        'Admin Portal',
        'Responsive Design',
      ],
    },
    {
      name: 'Peer‑to‑peer Rental Platform',
      stack: ['Next.js', 'Cloudinary', 'Search & Filters'],
      blurb:
        'Scalable listings site with advanced filtering and media storage via Cloudinary.',
      href: '#',
      category: 'Web Development',
      year: 2023,
      status: 'Completed',
      features: [
        'Advanced Filtering',
        'Media Storage',
        'Scalable Architecture',
        'Cloud Integration',
      ],
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
    // Add skill proficiency levels
    proficiency: {
      expert: ['React Native', 'TypeScript', 'JavaScript'],
      advanced: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      intermediate: ['Next.js', 'Python', 'MySQL', 'TensorFlow.js'],
      beginner: ['Java', 'Docker', 'OpenCV'],
    },
  },
  education: [
    {
      school: 'Edinburgh Napier University',
      credential: 'BSc (Hons) in Computing – Distinction',
      period: 'Aug 2023 – Mar 2025',
      location: 'Edinburgh, UK',
      gpa: 'Distinction',
      relevantCourses: [
        'Software Engineering',
        'Database Systems',
        'Web Development',
        'AI & Machine Learning',
      ],
    },
    {
      school: 'Info Myanmar College',
      credential: 'Higher National Diploma in Software Engineering – Merits',
      period: 'Apr 2022 – Jun 2023',
      location: 'Yangon, Myanmar',
      gpa: 'Merits',
      relevantCourses: [
        'Programming Fundamentals',
        'Software Design',
        'Database Management',
        'System Analysis',
      ],
    },
  ],
  certs: [
    {
      name: 'IT Passport (ITPEC)',
      year: 2022,
      issuer: 'ITPEC',
      description: 'Information Technology Passport Examination',
    },
    {
      name: 'Basic Linux Skills',
      year: 2019,
      issuer: 'Linux Foundation',
      description: 'Fundamental Linux system administration',
    },
    {
      name: 'Network Engineering',
      year: 2018,
      issuer: 'Cisco',
      description: 'Network infrastructure and protocols',
    },
    {
      name: 'Intermediate English',
      year: 2018,
      issuer: 'Cambridge English',
      description: 'B2 level English proficiency',
    },
    {
      name: 'CompTIA A+',
      year: 2016,
      issuer: 'CompTIA',
      description: 'IT fundamentals and hardware support',
    },
  ],
  // Add achievements and milestones
  achievements: [
    {
      title: 'Distinction Graduate',
      description:
        'Achieved 1ˢᵗ Class Honours in BSc Computing from Edinburgh Napier University',
      year: 2025,
      category: 'Academic',
    },
    {
      title: 'Remote Developer Success',
      description:
        'Successfully working as a remote React Native developer at HighGround',
      year: 2025,
      category: 'Professional',
    },
    {
      title: 'FinTech Project Contribution',
      description: 'Contributed to a FinTech project at NTT Data Myanmar',
      year: 2025,
      category: 'Professional',
    },
  ],
  // Add services offered
  services: [
    {
      title: 'Mobile Development',
      description:
        'Cross-platform React Native apps with clean architecture and excellent UX',
      technologies: ['React Native', 'Expo'],
      icon: 'mobile',
    },
    {
      title: 'Full-Stack Solutions',
      description:
        'Complete MERN stack applications with robust backend APIs and databases',
      technologies: ['MERN', 'Node.js'],
      icon: 'fullstack',
    },
    {
      title: 'Clean Architecture',
      description:
        'Well-documented, maintainable code with strong development practices',
      technologies: ['TypeScript', 'Clean Code'],
      icon: 'architecture',
    },
  ],
};
