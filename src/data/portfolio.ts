import type {NavLink} from '@site/src/components/header';
import type {Skill} from '@site/src/components/my-skills';

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
    'My description',
  imageSrc: '/img/profile.jpg',
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