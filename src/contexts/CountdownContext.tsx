import { createContext, useContext, useEffect, useState } from "react";
import challenges from '../../challenges.json';
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContextData {
  states: {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
  };
  functions: {
    startCountdown: () => void;
    resetCountdown: () => void;
  };
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }) {
  const challengeContext = useContext(ChallengeContext);
  const { startNewChallenge } = challengeContext.functions;

  let timeout: NodeJS.Timeout;
  const initialTime = 0.1 * 60;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    if (isActive && time > 0) {
      timeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
    else if (isActive && time === 0) {
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
    setHasFinished(false);
    clearTimeout(timeout);
    setTime(initialTime);
  }

  return (
    <CountdownContext.Provider value={{ states: {
      minutes,
      seconds,
      hasFinished,
      isActive,
    }, functions: {
      startCountdown,
      resetCountdown,
    } }}>
      { children}
    </CountdownContext.Provider>
  );
} 