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