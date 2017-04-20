import React from 'baret'
import styles from './App.css'

import RPS from './components/rps/component.js'

const App = () =>
  <div className={styles.App}>
    <div className={styles.header}>
      <h2>Rock to da Paper to da Scissors</h2>
    </div>
    <p className={styles.intro}>
    </p>

    <RPS></RPS>
  </div>


export default App
