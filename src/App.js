import React from 'baret'
import logo from './logo.svg'
import styles from './App.css'

import RPS from './components/rps/component.js'

const App = () =>
  <div className={styles.App}>
    <div className={styles.header}>
      <img src={logo} className={styles.logo} alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className={styles.intro}>
    </p>

    <RPS></RPS>
  </div>


export default App
