import { createContext, useEffect, useState } from "react";
import challenges from '../../challenges.json';

interface ChallengeContextData {
  states: {
    level: number;
    currentExperience: number;
    totalChallengeCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: {
      type: 'body' | 'eye';
      description: string;
      amount: number;
    };
  };
  functions: {
    completeChallenge: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
  },
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children }) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [totalChallengeCompleted, setTotalChallengeCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const random = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[random];
    setActiveChallenge(challenge);

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio lançado 🎉', {
        body: `Valendo ${challenge.amount}xp! `,
        icon: '/favicon.png',
      });

      new Audio('/notification.mp3').play();
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(activeChallenge) {
      let finalExperience = currentExperience + activeChallenge.amount;

      if(finalExperience >= experienceToNextLevel) {
        finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
      }

      setCurrentExperience(finalExperience);
      setActiveChallenge(null);
      setTotalChallengeCompleted(totalChallengeCompleted + 1);
    }
  }

  return (
    <ChallengeContext.Provider value={
      { states: {
          level, 
          currentExperience, 
          totalChallengeCompleted,
          experienceToNextLevel,
          activeChallenge,
        }, 
        functions: {
          completeChallenge,
          startNewChallenge,
          resetChallenge,
        },
      }
    }>
      { children }
    </ChallengeContext.Provider>
  );
} 