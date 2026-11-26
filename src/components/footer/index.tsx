import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import styles from './footer.module.css';

interface FooterProps {
  name: string;
  legalNoticeUrl: string;
  legalNoticeLabel?: string;
}

export default function Footer({
  name,
  legalNoticeUrl,
  legalNoticeLabel = 'Legal notice',
}: FooterProps): ReactNode {
  const year = new Date().getFullYear();

  const scrollToTop = (): void => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <footer className={styles.footer}>
      <button
        type="button"
        className={styles.toTop}
        onClick={scrollToTop}
        aria-label="Scroll to top">
                 <svg
          className={styles.arrow}
          viewBox="0 0 12 48"
          width="12"
          height="48"
          aria-hidden="true">
          <polygon points="6,0 11,9 1,9" fill="currentColor" />
          <line
            x1="6"
            y1="8"
            x2="6"
            y2="48"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      <p className={styles.copyright}>
        © {name} {year}
      </p>

      <Link className={styles.legal} to={legalNoticeUrl}>
        {legalNoticeLabel}
      </Link>
    </footer>
  );
}