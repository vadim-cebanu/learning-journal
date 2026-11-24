import type {ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './hero.module.css';

interface HeroProps {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  contactHref?: string;
}

export default function Hero({
  name,
  title,
  description,
  imageSrc,
  imageAlt,
  contactHref = '#contact',
}: HeroProps): ReactNode {
  return (
    <section id="about" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.greeting}>Hey there. 👋 I am</p>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
          <a href={contactHref} className={styles.button}>
            Contact me
          </a>
        </div>
        <img className={styles.image} src={useBaseUrl(imageSrc)} alt={imageAlt} />
      </div>
    </section>
  );
}