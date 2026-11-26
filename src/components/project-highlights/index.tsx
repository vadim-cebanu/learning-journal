import { useState, type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';

import styles from './project-highlights.module.css';

export interface ProjectTag {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  description: string;
  tags: ProjectTag[];
  docsUrl: string;
  githubUrl: string;
}

interface ProjectHighlightsProps {
  title?: string;
  projects: Project[];
  moreProjectsUrl: string;
  moreProjectsLabel?: string;
}

interface ProjectCardProps {
  project: Project;
  number?: number;
}

function ProjectCard({ project, number }: ProjectCardProps): ReactNode {
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          {number !== undefined && `${number}. `}
          {project.title}
        </h3>
        <ul className={styles.tags} aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag.name} className={styles.tag} title={tag.name}>
              <img src={withBaseUrl(tag.icon)} alt={tag.name} />
            </li>
          ))}
        </ul>
      </header>

      <div className={styles.cardBody}>
        <img
          className={styles.image}
          src={withBaseUrl(project.image)}
          alt={project.imageAlt}
          loading="lazy"
        />
        <div className={styles.content}>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.actions}>
            <Link
              className={clsx(styles.button, styles.buttonPrimary)}
              to={project.docsUrl}>
              Documentation
            </Link>
            <Link
              className={clsx(styles.button, styles.buttonOutline)}
              to={project.githubUrl}>
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectHighlights({
  title = 'My project highlights',
  projects,
  moreProjectsUrl,
  moreProjectsLabel = 'see more projects',
}: ProjectHighlightsProps): ReactNode {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id ?? '');
  const activeProject =
    projects.find((project) => project.id === activeId) ?? projects[0];

  const moreLink = (
    <Link className={styles.more} to={moreProjectsUrl}>
      ↳ {moreProjectsLabel}
    </Link>
  );

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        {/* Desktop: list on the left, selected project on the right */}
        <div className={styles.desktop}>
          <nav className={styles.list} aria-label="Projects">
            <ol>
              {projects.map((project) => {
                const isActive = project.id === activeProject?.id;
                return (
                  <li key={project.id}>
                    <button
                      type="button"
                      className={clsx(
                        styles.listButton,
                        isActive && styles.listButtonActive,
                      )}
                      aria-pressed={isActive}
                      onClick={() => setActiveId(project.id)}>
                      {project.title}
                    </button>
                  </li>
                );
              })}
            </ol>
            {moreLink}
          </nav>

          {activeProject && <ProjectCard project={activeProject} />}
        </div>

        {/* Mobile: all projects as stacked cards */}
        <div className={styles.mobile}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} number={index + 1} />
          ))}
          {moreLink}
        </div>
      </div>
    </section>
  );
}