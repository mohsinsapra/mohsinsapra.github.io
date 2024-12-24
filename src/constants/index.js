export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'Contact',
    href: '#contact',
  },
];
export const clientReviews = [
  {
    id: 2,
    name: 'Richard Rojas',
    position: 'CEO at Matrix Network International B.V.',
    img: 'assets/review2.png',
    review:
      'Muhammad’s ability to develop scalable solutions is impressive. From Crypto ATMs to mobile recharge services, he delivered robust architectures and seamless integrations that helped our products shine. A true professional!',
  },
  {
    id: 3,
    name: 'Aisha Khan',
    position: 'Project Coordinator at Pakperegrine Pvt LTD',
    img: 'assets/review3.png',
    review:
      'I was thoroughly impressed by Muhammad’s problem-solving skills during our e-commerce projects. He transformed complex requirements into functional, high-performing applications. A great team player!',
  },
];

export const myProjects = [
  {
    title: 'Bitcoin ATM Machine',
    desc: 'An ATM machine developed for bitcoiners to buy bitcoin from various locations using cash or debit card. The project features integration with bitcoin Main-net and lightning wallets.',
    subdesc: 'Microservices architecture using AWS SQS for service communication.',
    texture: '/textures/project/project1.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#F7931A',
      border: '0.2px solid #D9822F',
      boxShadow: '0px 0px 60px 0px rgba(255, 192, 128, 0.5)',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      { id: 1, name: 'React.js', path: '/assets/react.svg' },
      { id: 2, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
      { id: 3, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 4, name: 'Framer Motion', path: '/assets/framer.png' },
    ],
  },
  {
    title: 'Venrecarga',
    desc: 'A mobile recharge service for Venezuelan nationals to recharge for their loved ones in Venezuela.',
    subdesc: 'Integrated with BunQ bank, Stripe, PayPal, and Open-node for payment collection.',
    texture: '/textures/project/project2.mp4',
    logo: '/assets/project-logo2.png',
    logoStyle: {
      backgroundColor: '#E53935',
      border: '0.2px solid #B71C1C',
      boxShadow: '0px 0px 60px 0px rgba(233, 30, 99, 0.5)',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      { id: 1, name: 'React.js', path: '/assets/react.svg' },
      { id: 2, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
      { id: 3, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 4, name: 'Framer Motion', path: '/assets/framer.png' },
    ],
  },
  {
    title: 'Rembit',
    desc: 'A remittance web service to send funds instantly over the Master and Visa networks without extensive KYCs.',
    subdesc: 'Developed ETL jobs for data transformation and loading from S3 using Athena.',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#0A74DA',
      border: '0.2px solid #1565C0',
      boxShadow: '0px 0px 60px 0px rgba(33, 150, 243, 0.5)',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      { id: 1, name: 'React.js', path: '/assets/react.svg' },
      { id: 2, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
      { id: 3, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 4, name: 'Framer Motion', path: '/assets/framer.png' },
    ],
  },
  {
    title: 'Chivozon',
    desc: 'A WordPress plugin that syncs WooCommerce stores to manage inventory and automate order processing.',
    subdesc: 'Implemented RabbitMQ for communication between microservices and plugin backend.',
    texture: '/textures/project/project4.mp4',
    logo: '/assets/project-logo4.png',
    logoStyle: {
      backgroundColor: '#FFA726',
      border: '0.2px solid #FFB74D',
      boxShadow: '0px 0px 60px 0px rgba(255, 183, 77, 0.5)',
    },
    spotlight: '/assets/spotlight4.png',
    tags: [
      { id: 1, name: 'React.js', path: '/assets/react.svg' },
      { id: 2, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
      { id: 3, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 4, name: 'Framer Motion', path: '/assets/framer.png' },
    ],
  },
  {
    title: 'IceRebus',
    desc: 'An ice vending machine project offering easy access to ice in diverse locations.',
    subdesc: 'Developed mobile application and hardware communication microservices.',
    texture: '/textures/project/project5.mp4',
    logo: '/assets/project-logo5.png',
    logoStyle: {
      backgroundColor: '#29B6F6',
      border: '0.2px solid #0288D1',
      boxShadow: '0px 0px 60px 0px rgba(41, 182, 246, 0.5)',
    },
    spotlight: '/assets/spotlight5.png',
    tags: [
      { id: 1, name: 'React.js', path: '/assets/react.svg' },
      { id: 2, name: 'TailwindCSS', path: '/assets/tailwindcss.png' },
      { id: 3, name: 'TypeScript', path: '/assets/typescript.png' },
      { id: 4, name: 'Framer Motion', path: '/assets/framer.png' },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};
export const workExperiences = [
  {
    id: 1,
    name: 'Dosell AB',
    pos: 'Full Stack Engineer',
    duration: 'Dec 2022 - Present',
    title: 'Developed and maintained a medical dispenser’s full-stack architecture, integrating NestJS and React.js. Managed secure and scalable backend operations and drove integrations to boost product competitiveness.',
    icon: '/assets/react.svg',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Matrix Network International B.V.',
    pos: 'Software Engineer',
    duration: 'Apr 2021 - Nov 2022',
    title: 'Worked on diverse projects like Crypto ATMs, remittance platforms, and mobile recharge services. Focused on scalable microservices, backend development, and integration with financial APIs.',
    icon: '/assets/figma.svg',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Pakperegrine Pvt LTD',
    pos: 'Software Engineer',
    duration: 'Sep 2020 - Mar 2021',
    title: 'Contributed to mobile e-commerce applications and multi-user web solutions. Developed key features and maintained performance-critical components for high-traffic platforms.',
    icon: '/assets/notion.svg',
    animation: 'salute',
  },
];

