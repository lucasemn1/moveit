import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const context = useContext(ChallengeContext);
  const { 
    currentExperience,
    experienceToNextLevel
  } = context.states;

  const percentLevel = Math.round(currentExperience * 100 / experienceToNextLevel);

  return (
    <header className={ styles.experienceBar }>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentLevel}%` }}></div>

        <span 
          className={ styles.currentExperience }
          style={{ left: `${percentLevel}%` }}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}