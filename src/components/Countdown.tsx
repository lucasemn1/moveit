import { useState, useEffect, useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const context = useContext(CountdownContext);
  const { 
    seconds, 
    minutes, 
    isActive, 
    hasFinished
  } = context.states;
  const { 
    resetCountdown, 
    startCountdown
  } = context.functions;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  
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
    else if(!isActive && hasFinished) {
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