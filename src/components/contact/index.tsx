import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

import styles from './contact.module.css';

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
  underline?: boolean;
}

interface ContactProps {
  title?: string;
  intro: string;
  points: string[];
  callToAction: string;
  links: ContactLink[];
}

export default function Contact({
  title = 'Contact me',
  intro,
  points,
  callToAction,
  links,
}: ContactProps): ReactNode {
  const {withBaseUrl} = useBaseUrlUtils();

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.intro}>{intro}</p>
          <ul className={styles.points}>
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className={styles.right}>
          <p className={styles.callToAction}>{callToAction}</p>
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={link.underline ? styles.linkUnderline : styles.link}>
                  <img
                    className={styles.icon}
                    src={withBaseUrl(link.icon)}
                    alt=""
                    aria-hidden="true"
                  />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}