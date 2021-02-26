import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const context = useContext(ChallengeContext);
  const { level } = context.states;

  return (
    <div className={ styles.profileContainer }>
      <img src="https://github.com/lucasemn1.png" alt="Lucas Nóbrega"/>
    
      <div>
        <strong>Lucas Nóbrega</strong>
        <p>
          <img src="icons/level.svg" alt="Ícone de nível"/>
          Level { level }
        </p>
      </div>
    </div>
  );
}