import {useState, type CSSProperties, type ReactNode, type UIEvent} from 'react';
import clsx from 'clsx';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import useReveal from '@site/src/hooks/use-reveal';

import styles from './my-skills.module.css';

export interface Skill {
  name: string;
  icon: string;
  iconMobile?: string;
  points: string[];
}

interface MySkillsProps {
  title?: string;
  skills: Skill[];
  perSlide?: number;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

function SkillCard({skill, index}: SkillCardProps): ReactNode {
  const {withBaseUrl} = useBaseUrlUtils();
  const {ref, isVisible} = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={clsx(styles.skill, isVisible && styles.visible)}
      tabIndex={0}
      style={{'--i': index} as CSSProperties}>
      <div className={styles.flip}>
        <div className={styles.label}>
          <picture>
            {skill.iconMobile && (
              <source
                media="(max-width: 900px)"
                srcSet={withBaseUrl(skill.iconMobile)}
              />
            )}
            <img
              className={styles.icon}
              src={withBaseUrl(skill.icon)}
              alt=""
              loading="lazy"
            />
          </picture>
          <span className={styles.srOnly}>{skill.name}</span>
        </div>

        <ul className={styles.points}>
          {skill.points.map((point, k) => (
            <li key={point} style={{'--n': k} as CSSProperties}>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function MySkills({
  title = 'My skills',
  skills,
  perSlide = 3,
}: MySkillsProps): ReactNode {
  const [active, setActive] = useState<number>(0);
  const {ref: titleRef, isVisible: isTitleVisible} =
    useReveal<HTMLHeadingElement>();

  // Mobile carousel: `perSlide` skills per slide.
  const groups: Skill[][] = Array.from(
    {length: Math.ceil(skills.length / perSlide)},
    (_, i) => skills.slice(i * perSlide, i * perSlide + perSlide),
  );

  const handleScroll = (event: UIEvent<HTMLUListElement>): void => {
    const list = event.currentTarget;
    const first = list.firstElementChild as HTMLElement | null;
    if (!first) return;
    setActive(Math.round(list.scrollLeft / (first.offsetWidth + 16)));
  };

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <h2
          ref={titleRef}
          className={clsx(styles.title, isTitleVisible && styles.visible)}>
          {title}
        </h2>

        <ul className={styles.skills} onScroll={handleScroll}>
          {groups.map((group, gi) => (
            <li key={gi} className={styles.slide}>
              <ul className={styles.group}>
                {group.map((skill, j) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={gi * perSlide + j}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className={styles.dots} aria-hidden="true">
          {groups.map((_, i) => (
            <i key={i} className={clsx(i === active && styles.dotActive)} />
          ))}
        </div>
      </div>
    </section>
  );
}