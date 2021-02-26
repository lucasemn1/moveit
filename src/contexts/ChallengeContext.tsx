import { createContext, useState } from "react";
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
    levelUp: () => void;
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

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const random = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[random];
    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
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
          levelUp,
          startNewChallenge,
          resetChallenge,
        },
      }
    }>
      { children }
    </ChallengeContext.Provider>
  );
} 