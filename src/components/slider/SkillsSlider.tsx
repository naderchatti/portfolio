'use client';

import styles from './SkillsSlider.module.css';
import { useResponsive } from '@/context/ResponsiveContext';
import CustomSVGs from '../customSVGs/CustomSVGs';

const frameworks = [
  'NextJS',
  'React',
  'NodeJS',
  'Angular',
  'Flask',
  'FastAPI',
  'Spring Boot',
  'Python',
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Java',
  'C',
  'C++',
  'MongoDB',
  'Oracle',
  'MySQL',
  'SQLite',
  'PostgreSQL',
];

export const SkillsSlider = () => {
  const { isMobile } = useResponsive();

  return (
    <div
      className={styles.slider}
      style={
        {
          '--item-width': isMobile ? '3.5rem' : '6rem',
          '--item-height': isMobile ? '2rem' : '3rem',
          '--quantity': frameworks.length.toString(),
          '--direction': 'forwards',
        } as React.CSSProperties
      }
    >
      <div className={styles.list}>
        {frameworks?.map((framework, index) => {
          return (
            <div
              key={index}
              className={styles.item}
              style={
                {
                  '--item-position': (index + 1).toString(),
                } as React.CSSProperties
              }
            >
              <CustomSVGs iconName={framework} />
              <p>{framework}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
