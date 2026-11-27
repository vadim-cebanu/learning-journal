import type {NavLink} from '@site/src/components/header';
import type {Skill} from '@site/src/components/my-skills';
import type {Project, ProjectTag} from '@site/src/components/project-highlights';
import type {ContactLink} from '@site/src/components/contact';

export interface HeroData {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const heroData: HeroData = {
  name: 'Vadim Cebanu',
  title: 'DevSecOps Engineer',
    description:
    "Coming from frontend and backend development, I know how applications are built – now I make sure they are deployed automatically and run securely.\nMy focus: CI/CD with GitHub Actions, Docker, Linux server hardening and security testing with OWASP Juice Shop.\nI'm constantly learning to keep up with new tools and threats.",
  imageSrc: '/img/profile.png',
  imageAlt: 'my image profile',
};

export const navLinks: NavLink[] = [
  {label: 'About me', href: '#about'},
  {label: 'My skills', href: '#skills'},
  {label: 'My projects', href: '#projects'},
  {label: 'Contact', href: '#contact'},
];

export const skillsData: Skill[] = [
  {
    name: 'HTML',
    icon: '/img/skills/html.svg',
    iconMobile: '/img/mobile/html.svg',
    points: [
      'User-friendly navigation menus',
      'Responsive web design',
      'Contact forms and login pages',
      'Transitions, animations and hover effects',
    ],
  },
  {
    name: 'CSS',
    icon: '/img/skills/css.svg',
    iconMobile: '/img/mobile/css.svg',

    points: [
      'User-friendly navigation menus',
      'Responsive web design',
      'Contact forms and login pages',
      'Transitions, animations and hover effects',
    ],
  },
   {
    name: 'Static site generator',
    icon: '/img/skills/static-site.svg',
    iconMobile: '/img/mobile/static-site.svg',

    points: [
      'Search functionality',
      'Static website and customization',
      'Tags, categories and RSS feeds',
      'Translation',
    ],
  },
    {
    name: 'Python',
    icon: '/img/skills/python.svg',
    iconMobile: '/img/mobile/python.svg',

    points: [
      'Build APIs',
      'Spam filtering, recommendation systems',
      'Automate software testing',
      'Using libraries like Tkinter, PyQt or Kivy',
    ],
  },
    {
    name: 'Shell scripting',
    icon: '/img/skills/shell.svg',
    iconMobile: '/img/mobile/shell.svg',

    points: [
      'Adding new users and setting their permissions',
      'Performing calculations or statistical analysis on data',
      'Conditional statements, loops, functions',
    ],
  },
  {
    name: 'Yaml',
    icon: '/img/skills/yaml.svg',
    iconMobile: '/img/mobile/yaml.svg',

    points: [
      'Kubernetes deployments',
      'Store settings like database connections',
      'Environment-specific variables',
      'Complex data structures like lists and maps',
    ],
  },
  {
    name: 'Container',
    icon: '/img/skills/container.svg',
    iconMobile: '/img/mobile/container.svg',

    points: [
      'CI/CD pipelines',
      'Automate building, testing and deploying applications',
      'Build microservices-based applications',
    ],
  },
  {
    name: 'CI/CD with GitHub Actions',
    icon: '/img/skills/cicd.svg',
    iconMobile: '/img/mobile/cicd.svg',

    points: [
      'Automated builds and tests',
      'Pre-built actions for common tasks',
      'Triggers on push, pull request or schedule',
      'Automated deployments',
    ],
  },
  {
    name: 'IT Security',
    icon: '/img/skills/it-security.svg',
    iconMobile: '/img/mobile/it-security.svg',

    points: [
      'Simulate attacks and identify vulnerabilities',
      'Setting up multi-factor authentication',
      'Login security',
      'Implement authentication and authorization mechanisms',
    ],
  },
];

function tagsFor(names: string[]): ProjectTag[] {
  return skillsData
    .filter((skill) => names.includes(skill.name))
    .map(({name, icon}) => ({name, icon}));
}

const projectTags = {
  html: {name: 'HTML', icon: '/img/tags/html.svg'},
  css: {name: 'CSS', icon: '/img/tags/css.svg'},
  staticSite: {name: 'Static site', icon: '/img/tags/static-site.svg'},
  python: {name: 'Python', icon: '/img/tags/python.svg'},
  shell: {name: 'Shell scripting', icon: '/img/tags/shell.svg'},
  yaml: {name: 'Yaml', icon: '/img/tags/yaml.svg'},
  container: {name: 'Container', icon: '/img/tags/container.svg'},
  cicd: {name: 'CI/CD', icon: '/img/tags/cicd.svg'},
  security: {name: 'IT Security', icon: '/img/tags/it-security.svg'},
} satisfies Record<string, ProjectTag>;

export const moreProjectsUrl = '/docs/projects/overview';

export const projectsData: Project[] = [
  {
    id: 'minecraft',
    title: 'Minecraft',
    image: '/img/projects/minecraft.svg',
    imageAlt: 'Minecraft server project',
    description:
      'A Minecraft Java Edition server in a self-built Docker image. Docker Compose configures it through a .env file, keeps the world in a persistent volume and restarts it after crashes.',
    tags: [projectTags.yaml, projectTags.shell, projectTags.security, projectTags.container],
    docsUrl: '/docs/projects/minecraft',
    githubUrl: 'https://github.com/vadim-cebanu/minecraft-server-docker/',
  },
  {
    id: 'conduit-container',
    title: 'Conduit (Container)',
    image: '/img/projects/conduit-container.svg',
    imageAlt: 'Conduit container project',
    description:
      'A Medium clone with an Angular frontend, Django backend and PostgreSQL. GitHub Actions builds the images, pushes them to GHCR and deploys them to a cloud VM on every push to main.',
    tags: [projectTags.container, projectTags.yaml, projectTags.cicd, projectTags.security],
    docsUrl: '/docs/projects/conduit-container',
    githubUrl: 'https://github.com/vadim-cebanu/conduit',
  },
  {
    id: 'wordpress',
    title: 'WordPress hosting',
    image: '/img/projects/wordpress.svg',
    imageAlt: 'WordPress hosting project',
    description:
      'WordPress and MariaDB with Docker Compose, using pinned image versions. Credentials stay in a local .env file, the database is persisted and is not exposed to the host.',
    tags: [projectTags.container, projectTags.shell, projectTags.yaml, projectTags.security],
    docsUrl: '/docs/projects/wordpress',
    githubUrl: 'https://github.com/vadim-cebanu/wordpress',
  },
  {
    id: 'baby-tools',
    title: 'Baby Tools',
    image: '/img/projects/baby-tools.svg',
    imageAlt: 'Baby Tools World shop project',
    description:
      'An online shop for baby products built with Django, with categories, product tags, reviews and user accounts. It can be built and run as a Docker image.',
    tags: [projectTags.python, projectTags.container, projectTags.yaml],
    docsUrl: '/docs/projects/baby-tools',
    githubUrl: 'https://github.com/vadim-cebanu/baby-tools',
  },
  {
    id: 'truck-signs-api',
    title: 'Truck Signs API',
    image: '/img/projects/truck-signs-api.svg',
    imageAlt: 'Truck Signs API project',
    description:
      'A Django REST Framework backend for an online store selling custom vinyl truck letterings. It runs with SQLite for development or PostgreSQL for production.',
    tags: [projectTags.python, projectTags.container, projectTags.yaml],
    docsUrl: '/docs/projects/truck-signs-api',
    githubUrl: 'https://github.com/vadim-cebanu/truck-signs-api',
  },
];

export interface ContactData {
  intro: string;
  points: string[];
  callToAction: string;
  links: ContactLink[];
}

export const contactData: ContactData = {
  intro: "I'm currently looking for new opportunities – feel free to reach out!",
  points: [
    'Open to roles as a DevSecOps Engineer or Fullstack Developer',
    'I bring a solid frontend and backend foundation and a strong focus on security and automation',
    'Happy to contribute to CI/CD, containerization and secure infrastructure in your team',
    'Open to remote or hybrid work and planning to relocate to the Ostfriesland area',
  ],
  callToAction: 'Looking forward to hearing from you!',
  links: [
    {
      label: 'info@vadimcebanu.dev',
      href: 'mailto:info@vadimcebanu.dev',
      icon: '/img/contact/mail.svg',
    },
    {
      label: 'Profile Page',
      href: 'https://www.linkedin.com/in/cebanu-vadim/',
      icon: '/img/contact/profile.svg',
      underline: true,
    },
  ],
};

export const footerData = {
  name: 'Vadim Cebanu',
  legalNoticeUrl: '/legal-notice',
};