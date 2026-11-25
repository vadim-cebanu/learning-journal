import type {NavLink} from '@site/src/components/header';

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