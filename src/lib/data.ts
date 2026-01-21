// Portfolio data - centralized for easy updates
export const DATA = {
  name: 'Lin Phone Myint Zaw',
  title: 'Full‑Stack / React Native Developer',
  location: 'Yangon, Myanmar',
  phone: '+95 996 765 8131',
  email: 'linphonem@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/lin-phone-myint-zaw-025082176/',
    github: 'https://github.com/linphone2000',
  },
  summary:
    'Software Engineer experienced in React Native, MERN, Next.js, and backend (Node.js, Express). Passionate about building real products that solve problems, clean architecture, and AI.',
  // Add more detailed personal info
  about: {
    valueProposition:
      'Helping businesses build scalable mobile and web applications that deliver real value to users. From concept to deployment, focusing on clean architecture, maintainable code, and solutions that grow with your business.',
    tagline:
      'Building mobile-first experiences with strong API and data modeling foundations',
    availability: 'Open to new projects',
    yearsOfExperience: 3, // Started learning JS frameworks in 2022
    yearsLabel: 'Years Coding',
    totalProjects: 6,
    technologiesMastered: 12,
    typewriterStrings: [
      'Full‑Stack Developer',
      'Mobile Developer',
      'React Native Developer',
      'Building real products with clean code',
    ],
  },
  experience: [
    {
      company: 'Freelance',
      role: 'Full-Stack Developer',
      period: 'April 2023 – Present',
      location: 'Yangon, Myanmar',
      type: 'Freelance',
      bullets: [
        'Ecommerce App (Client: Yoyic): Developing a cross-platform app with React Native Expo, integrating backendAPIs and automated testing workflows.',
        'EdTech Platform (Client: Technortal): Built core backend using Node.js and PostgreSQL, implementing automated testing and CI/CD pipelines for stable deployment.',
        'Info Smart Campus: Managed the complete Apple App Store release process, handling certification, provisioning, and successful submission for Info Myanmar College.',
      ],
      technologies: [
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'Jira',
        'CI/CD',
        'AWS S3',
        'Project Management',
      ],
    },
    {
      company: 'HighGround',
      role: 'Mobile Developer (Remote)',
      period: 'July 2025 – December 2025',
      location: 'Remote',
      type: 'Full-time',
      bullets: [
        'Developed cross-platform mobile applications using React Native Expo within an Agile/Scrum environment.',
        'Worked on mobile streaming platform with web sockets.',
        'Written requirement documents from customer input to clarify scope and support the team.',
      ],
      technologies: [
        'React Native',
        'TypeScript',
        'Agile',
        'Documentation',
        'Expo',
      ],
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
      name: 'Chat Chin POS – Mobile Inventory & Checkout System',
      stack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'AsyncStorage'],
      blurb:
        'Mobile-first inventory & checkout system with smart tracking. Features QR code-based stock management, dual-mode checkout (QR scan & manual search), real-time inventory tracking, and thermal receipt printing.',
      href: '#',
      highlight: true,
      category: 'Mobile Development',
      year: 2025,
      status: 'In Development',
      features: [
        'QR Code Stock Management',
        'Dual-Mode Checkout',
        'Real-time Inventory Tracking',
        'Receipt Printing',
        'Low Stock Alerts',
      ],
      preview: {
        platform: 'iOS & Android',
        featurePills: ['QR Integration', 'Mobile POS'],
        screenshot: '/chatchin-project/cc1.png',
        screenshots: [
          {
            id: 1,
            src: '/chatchin-project/cc1.png',
            title: 'Home (Dashboard) Screen',
            description:
              'Main dashboard showing revenue, active batches, stock alerts, and priority batches',
          },
          {
            id: 2,
            src: '/chatchin-project/cc2.png',
            title: 'Stock Screen',
            description:
              'Stock management interface with inventory tracking and QR code integration',
          },
          {
            id: 3,
            src: '/chatchin-project/cc3.png',
            title: 'Manual Checkout Screen',
            description:
              'Manual checkout interface for processing transactions without QR scanning',
          },
          {
            id: 4,
            src: '/chatchin-project/cc4.png',
            title: 'Stats Screen',
            description:
              'Analytics and statistics dashboard with performance metrics',
          },
          {
            id: 5,
            src: '/chatchin-project/cc5.png',
            title: 'QR Checkout Screen',
            description:
              'QR code-based checkout interface for quick product scanning',
          },
          {
            id: 6,
            src: '/chatchin-project/cc6.png',
            title: 'Cart Modal',
            description:
              'Shopping cart modal showing selected items before checkout',
          },
          {
            id: 7,
            src: '/chatchin-project/cc7.png',
            title: 'Confirm Checkout Modal',
            description:
              'Checkout confirmation modal with transaction details and summary',
          },
          {
            id: 8,
            src: '/chatchin-project/cc8.png',
            title: 'Checkout Success Modal',
            description:
              'Success confirmation modal after completing a transaction',
          },
          {
            id: 9,
            src: '/chatchin-project/cc9.png',
            title: 'Checkout History List Screen',
            description:
              'List view of all past transactions and checkout history',
          },
          {
            id: 10,
            src: '/chatchin-project/cc10.png',
            title: 'Checkout History Detail Modal',
            description:
              'Detailed view of a specific transaction with full information',
          },
          {
            id: 11,
            src: '/chatchin-project/cc11.png',
            title: 'Settings Screen',
            description: 'Application settings and configuration interface',
          },
          {
            id: 12,
            src: '/chatchin-project/cc12.png',
            title: 'Login Screen',
            description: 'User authentication and login interface',
          },
          {
            id: 13,
            src: '/chatchin-project/cc13.png',
            title: 'Register Screen',
            description: 'User registration screen for creating new accounts',
          },
        ],
      },
    },
    {
      name: 'PropertyApp – Advanced Trading & Investment Dashboard',
      stack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'AsyncStorage'],
      blurb:
        'Sophisticated property investment platform with real-time trading, live P&L tracking, 7-day performance charts, buy/sell functionality, and advanced portfolio analytics. Features market simulation, transaction history, and professional-grade trading interfaces.',
      href: '#',
      highlight: false,
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
      name: 'Minty – Personal Finance Management App',
      stack: [
        'React Native',
        'Expo',
        'Express.js',
        'JWT',
        'AsyncStorage',
        'Zustand',
      ],
      blurb:
        'Cross-platform mobile app for expense tracking, savings goals, and multi-account management (cash, bank, credit). Features scalable Express.js backend with JWT authentication, offline/online synchronization, and responsive UI/UX patterns.',
      href: '#',
      highlight: false,
      category: 'Mobile Development',
      year: 2025,
      status: 'Ongoing',
      features: [
        'Expense Tracking',
        'Savings Goals',
        'Multi-Account Management',
        'Offline Sync',
        'JWT Authentication',
      ],
      preview: {
        platform: 'iOS & Android',
        featurePills: ['Personal Finance', 'Offline Sync'],
        screenshot: '/minty-project/minty1.png',
        screenshots: [],
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
      liveUrl: 'https://home-security-rho.vercel.app/',
      demoAccount: {
        email: 'test@gmail.com',
        password: '123',
      },
      features: [
        'Object Detection',
        'Face Recognition',
        'Email Alerts',
        'Mode Switching',
      ],
      preview: {
        platform: 'Web Application',
        featurePills: ['AI-Powered Security', 'Real-time Detection'],
        screenshot: '/home-security-project/hs1.png',
        screenshots: [
          {
            id: 14,
            src: '/home-security-project/hs14.png',
            title: 'Live Object Detection',
            description: 'Live object detection and tracking',
          },
          {
            id: 15,
            src: '/home-security-project/hs15.png',
            title: 'Live Face Recognition',
            description: 'Live face recognition and tracking',
          },
          {
            id: 16,
            src: '/home-security-project/hs16.png',
            title: 'Live Face Recognition',
            description: 'Live face recognition and tracking',
          },
          {
            id: 1,
            src: '/home-security-project/hs1.png',
            title: 'Main Dashboard',
            description: 'Central control panel for home surveillance system',
          },
          {
            id: 2,
            src: '/home-security-project/hs2.png',
            title: 'Facial Data Creation',
            description:
              'Able to add new data for the system and edit existing data',
          },
          {
            id: 3,
            src: '/home-security-project/hs3.png',
            title: 'Facial Data Management',
            description:
              'Able to add new data for the system and edit existing data',
          },
          {
            id: 4,
            src: '/home-security-project/hs4.png',
            title: 'Test Facial Data Creation',
            description:
              'Page for capturing test data used to improve face recognition accuracy',
          },
          {
            id: 5,
            src: '/home-security-project/hs5.png',
            title: 'Test Facial Data Management',
            description:
              'Page for managing, and reviewing test data used to improve face recognition accuracy',
          },
          {
            id: 6,
            src: '/home-security-project/hs6.png',
            title: 'Test Object Detection Creation',
            description:
              'Page for capturing and creating test data to train and evaluate object detection model',
          },
          {
            id: 7,
            src: '/home-security-project/hs7.png',
            title: 'Test Object Detection Management',
            description:
              'Page for managing test data to train and evaluate object detection model',
          },
          {
            id: 8,
            src: '/home-security-project/hs8.png',
            title: 'Face Recognition Evaluation Results',
            description:
              'Page for viewing the detailed metrics of the face recognition test',
          },
          {
            id: 9,
            src: '/home-security-project/hs9.png',
            title: 'Face Recognition Evaluation Results',
            description:
              'Page for viewing the detailed metrics of the face recognition test',
          },
          {
            id: 10,
            src: '/home-security-project/hs10.png',
            title: 'Evaluation Loading',
            description: 'Evaluation loading screen',
          },
          {
            id: 11,
            src: '/home-security-project/hs11.png',
            title: 'Evaluation Loading',
            description: 'Evaluation loading screen',
          },
          {
            id: 12,
            src: '/home-security-project/hs12.png',
            title: 'Object Detection Evaluation Results',
            description:
              'Page for viewing the detailed metrics of the object detection test',
          },
          {
            id: 13,
            src: '/home-security-project/hs13.png',
            title: 'Object Detection Evaluation Results',
            description:
              'Page for viewing the detailed metrics of the object detection test',
          },
        ],
      },
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
      liveUrl: 'https://pms-frontend-virid.vercel.app/',
      demoAccount: {
        email: 'test@gmail.com',
        password: 'Test@123',
      },
      startupNote:
        'The backend is hosted on Render free tier and may take 10-30 seconds to start up on first request.',
      features: [
        'Inventory Management',
        'Real-time Stock',
        'Client Reviews',
        'Team Collaboration',
      ],
      preview: {
        platform: 'Web Application',
        featurePills: ['Inventory Management', 'Real-time Tracking'],
        screenshot: '/pharmacy-management-system-project/pms1.png',
        screenshots: [
          {
            id: 1,
            src: '/pharmacy-management-system-project/pms0.png',
            title: 'Welcome Page',
            description: 'Home page for logged in user',
          },
          {
            id: 2,
            src: '/pharmacy-management-system-project/pms1.png',
            title: 'Dashboard Overview',
            description: 'Main dashboard with key metrics and insights',
          },
          {
            id: 3,
            src: '/pharmacy-management-system-project/pms2.png',
            title: 'Orders Management',
            description: 'Complete order tracking and management',
          },
          {
            id: 4,
            src: '/pharmacy-management-system-project/pms3.png',
            title: 'Register Page',
            description: 'Register page for employee',
          },
          {
            id: 5,
            src: '/pharmacy-management-system-project/pms4.png',
            title: 'Sales Dashboard',
            description: 'Sales tracking and analytics',
          },
          {
            id: 6,
            src: '/pharmacy-management-system-project/pms5.png',
            title: 'Dashboard Overview',
            description:
              'Dashboard showing aggregated pharmacy statistics and inventory overview',
          },
          {
            id: 7,
            src: '/pharmacy-management-system-project/pms6.png',
            title: 'Inventory/Stock Management',
            description: 'Inventory/Stock management and tracking',
          },
          {
            id: 8,
            src: '/pharmacy-management-system-project/pms7.png',
            title: 'Supplier Management',
            description:
              'Manage supplier details, monitor orders, and maintain supplier relationships',
          },
          {
            id: 9,
            src: '/pharmacy-management-system-project/pms8.png',
            title: 'Invoice Receipt',
            description:
              'Invoice and receipt details for pharmacy transactions',
          },
          {
            id: 10,
            src: '/pharmacy-management-system-project/pms9.png',
            title: 'Creating Orders',
            description:
              'Page for creating orders with supplier details and order status tracking',
          },
          {
            id: 11,
            src: '/pharmacy-management-system-project/pms10.png',
            title: 'Showcasing Filters',
            description:
              'Demonstrates inventory filtering and advanced search functionalities',
          },
        ],
      },
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
      liveUrl: 'https://scape-booking.vercel.app/',
      demoAccount: {
        email: 'test@gmail.com',
        password: '123',
      },
      features: [
        'Room Booking',
        'Hotel Management',
        'Admin Portal',
        'Responsive Design',
      ],
      preview: {
        platform: 'Web Application',
        featurePills: ['Hotel Booking', 'Admin Management'],
        screenshot: '/scape-booking-project/sb1.png',
        screenshots: [
          {
            id: 1,
            src: '/scape-booking-project/sb0.png',
            title: 'Register',
            description: 'User registration page',
          },
          {
            id: 2,
            src: '/scape-booking-project/sb1.png',
            title: 'Landing Page',
            description: 'Welcome page with featured hotels',
          },
          {
            id: 3,
            src: '/scape-booking-project/sb2.png',
            title: 'Hotel List and Detail Page',
            description:
              'Browse available hotels and view detailed hotel information',
          },
          {
            id: 4,
            src: '/scape-booking-project/sb3.png',
            title: 'Landing Page 2',
            description: 'Alternative landing page view',
          },
          {
            id: 5,
            src: '/scape-booking-project/sb4.png',
            title: 'My Bookings Page',
            description: 'View and manage user bookings',
          },
          {
            id: 6,
            src: '/scape-booking-project/sb5.png',
            title: 'Favourite Hotels',
            description: 'Browse and manage favorite hotels',
          },
          {
            id: 7,
            src: '/scape-booking-project/sb6.png',
            title: 'My Profile',
            description: 'User profile and account management',
          },
          {
            id: 8,
            src: '/scape-booking-project/sb7.png',
            title: 'Admin Dashboard',
            description: 'Administrative control panel',
          },
          {
            id: 9,
            src: '/scape-booking-project/sb8.png',
            title: 'Admin Hotels Management',
            description: 'Manage hotels in the admin portal',
          },
          {
            id: 10,
            src: '/scape-booking-project/sb9.png',
            title: 'Admin Hotel Creation/Modification',
            description: 'Create and modify hotel details',
          },
          {
            id: 11,
            src: '/scape-booking-project/sb10.png',
            title: 'Admin Room Management',
            description: 'Manage hotel rooms in the admin portal',
          },
          {
            id: 12,
            src: '/scape-booking-project/sb11.png',
            title: 'Admin Room Creation/Modification',
            description: 'Create and modify room details',
          },
          {
            id: 13,
            src: '/scape-booking-project/sb12.png',
            title: 'User Management',
            description: 'Manage users in the admin portal',
          },
        ],
      },
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
      liveUrl: 'https://travelscape-next.vercel.app/',
      demoAccount: {
        email: 'test@gmail.com',
        password: '123',
      },
      features: [
        'Advanced Filtering',
        'Media Storage',
        'Scalable Architecture',
        'Cloud Integration',
      ],
      preview: {
        platform: 'Web Application',
        featurePills: ['P2P Rental', 'Cloud Storage'],
        screenshot: '/travel-scape-project/ts1.png',
        screenshots: [
          {
            id: 1,
            src: '/travel-scape-project/ts1.png',
            title: 'Home',
            description: 'Home page',
          },
          {
            id: 2,
            src: '/travel-scape-project/ts2.png',
            title: 'A Property Details Page',
            description: 'Property details page',
          },
          {
            id: 3,
            src: '/travel-scape-project/ts3.png',
            title: 'Search with Geolocation and Map',
            description: 'Search with geolocation and map',
          },
          {
            id: 4,
            src: '/travel-scape-project/ts4.png',
            title: 'Renting Date Selection Modal',
            description: 'Renting date selection modal',
          },
          {
            id: 5,
            src: '/travel-scape-project/ts5.png',
            title: 'Property Creation Modal',
            description: 'Property creation modal',
          },
          {
            id: 6,
            src: '/travel-scape-project/ts6.png',
            title: 'Property List',
            description: 'Property list',
          },
          {
            id: 7,
            src: '/travel-scape-project/ts7.png',
            title: 'Property Image Upload with Cloudinary',
            description: 'Property image upload with Cloudinary',
          },
          {
            id: 8,
            src: '/travel-scape-project/ts8.png',
            title: 'Property Creation',
            description: 'Property creation',
          },
          {
            id: 9,
            src: '/travel-scape-project/ts9.png',
            title: 'Property Price Creation',
            description: 'Property price creation',
          },
          {
            id: 10,
            src: '/travel-scape-project/ts10.png',
            title: 'My Trips',
            description: 'My trips',
          },
          {
            id: 11,
            src: '/travel-scape-project/ts11.png',
            title: 'My Properties',
            description: 'My properties',
          },
          {
            id: 12,
            src: '/travel-scape-project/ts12.png',
            title: 'My Reservations',
            description: 'My reservations',
          },
        ],
      },
    },
  ],
  skills: {
    frontend: ['React Native', 'React.js', 'Next.js', 'WordPress'],
    backend: ['Node.js', 'Express.js', 'Flask'],
    databases: ['PostgreSQL', 'MongoDB', 'MySQL'],
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
      credential: 'BSc (Hons) in Computing – First Class Honours',
      period: 'Aug 2023 – Mar 2025',
      location: 'Edinburgh, UK',
      gpa: 'Distinction',
      relevantCourses: [
        'Software Engineering',
        'Project Management',
        'AI & Machine Learning',
        'Database Systems',
        'Web Development',
        'DevOps Practices',
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
        'Professional Practices',
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
      issuer: 'YMAX Education',
      description: 'Fundamental Linux system administration',
    },
    {
      name: 'Network Engineering',
      year: 2018,
      issuer: 'Myanmar Business & Technology',
      description: 'Network infrastructure and protocols',
    },
    {
      name: 'Intermediate English',
      year: 2018,
      issuer: 'Success English Academy',
      description: 'B2 level English proficiency',
    },
    {
      name: 'CompTIA A+',
      year: 2016,
      issuer: 'IMCS',
      description: 'IT fundamentals and hardware support',
    },
  ],
  // Add achievements and milestones
  achievements: [
    {
      title: 'Delivered a comprehensive learning platform for Technortal',
      description:
        'Architected the complete backend infrastructure, managed project delivery, and coordinated development tasks with the frontend team',
      year: 2025,
      category: 'Professional',
    },
    {
      title: 'FinTech Project Contribution',
      description: 'Contributed to a FinTech project at NTT Data Myanmar',
      year: 2025,
      category: 'Professional',
    },
    {
      title: 'Distinction Graduate',
      description:
        'Achieved 1ˢᵗ Class Honours in BSc Computing from Edinburgh Napier University',
      year: 2025,
      category: 'Academic',
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
