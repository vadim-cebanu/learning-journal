import {useEffect, useRef, useState, type ReactNode} from 'react';
import clsx from 'clsx';

import styles from './header.module.css';

export interface NavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  links: NavLink[];
}

export default function Header({links}: HeaderProps): ReactNode {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      setIsHidden(isScrollingDown && currentScrollY > 80);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = (): void => setIsMenuOpen((open) => !open);
  const closeMenu = (): void => setIsMenuOpen(false);

  return (
    <header
      className={clsx(styles.header, isHidden && !isMenuOpen && styles.hidden)}>
      <nav className={styles.nav} aria-label="Main navigation">
        <button
          type="button"
          className={clsx(styles.burger, isMenuOpen && styles.burgerOpen)}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu">
          <span />
          <span />
          <span />
        </button>

        <ul
          id="main-menu"
          className={clsx(styles.list, isMenuOpen && styles.listOpen)}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.link} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}