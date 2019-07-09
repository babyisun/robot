import React from 'react';
import Config from '@/config/config';
import styles from './Home.scss';

const Home = () => (
  <div className={styles.home}>
    <div className={styles.welcome}>
      <header>
        <h2 key="title">{Config.Home.Title}</h2>
      </header>
      <div className={styles.img} />
    </div>
  </div>
);

export default Home;
