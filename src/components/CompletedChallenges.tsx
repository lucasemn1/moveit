import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
  const context = useContext(ChallengeContext);
  const { totalChallengeCompleted } = context.states;

  return (
    <div className={ styles.completedChanllengesContainer }>
      <span>Desafios completos</span>
      <span>{ totalChallengeCompleted }</span>
    </div>
  );
}