import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Header from '@site/src/components/header';
import Hero from '@site/src/components/hero';
import {heroData, navLinks} from '@site/src/data/portfolio';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.tagline} />
      </Head>
      <Header links={navLinks} />
      <main className={styles.main}>
        <Hero {...heroData} />
      </main>
    </>
  );
}