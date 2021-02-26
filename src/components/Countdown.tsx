import { useState, useEffect, useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const context = useContext(ChallengeContext);
  const { startNewChallenge } = context.functions;
  
  let timeout: NodeJS.Timeout;
  const initialTime = 0.1 * 60;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  useEffect(() => {
    if (isActive && time > 0) {
      timeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
    else if(isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    setIsActive(false);
    clearTimeout(timeout);
    setTime(initialTime);
  }

  function renderButton() {
    if(isActive) {
      return (
        <button
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={resetCountdown}
        >
          Abandonar ciclo
        </button>
      )
    }
    else if(!isActive && !hasFinished) {
      return (
        <button
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
        >
          Iniciar um ciclo
        </button>
      )
    }
    else {
      return (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      )
    }
  }

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { renderButton() }
    </div>
  );
}