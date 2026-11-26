import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Header from '@site/src/components/header';
import Hero from '@site/src/components/hero';
import MySkills from '@site/src/components/my-skills';
import ProjectHighlights from '@site/src/components/project-highlights';
import Contact from '@site/src/components/contact';
import Footer from '@site/src/components/footer';

import {
  heroData,
  moreProjectsUrl,
  navLinks,
  projectsData,
  skillsData,
  footerData,
  contactData,
} from '@site/src/data/portfolio';

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
        <MySkills skills={skillsData} />
        <ProjectHighlights
          projects={projectsData}
          moreProjectsUrl={moreProjectsUrl}
        />
        <Contact {...contactData} />
      </main>
        <Footer {...footerData} />
    </>
  );
}