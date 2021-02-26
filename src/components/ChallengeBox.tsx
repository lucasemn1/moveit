import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const context = useContext(ChallengeContext);
  const { activeChallenge } = context.states;
  const { resetChallenge, completeChallenge } = context.functions;

  const countdownContext = useContext(CountdownContext);
  const { resetCountdown } = countdownContext.functions;
  
  function handleChallengeSucceded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }
  
  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe { activeChallenge.amount } xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p> { activeChallenge.description } </p>
          </main>


          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >Falhei</button>
            <button
              type="button"
              className={styles.challengeSuccededButton}
              onClick={handleChallengeSucceded}
            >Completei</button>
          </footer>
        </div>
      ) : (
          <div className={styles.challengeNotActive}>
            <strong>
              Finalize um ciclo para receber um desafio
          </strong>
            <p>
              <img src="icons/level-up.svg" alt="Subir de nível" />
            Avance de nível completando desafios.
          </p>
          </div>
        )}
    </div>
  );
}