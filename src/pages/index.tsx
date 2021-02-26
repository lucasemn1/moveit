import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { ChallengeProvider } from '../contexts/ChallengeContext';
import { CountdownProvider } from '../contexts/CountdownContext';

export default function Home() {
  return (
      <CountdownProvider>
        <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>

          <ExperienceBar />

          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>

          </section>
        </div>
      </CountdownProvider>
  )
}
