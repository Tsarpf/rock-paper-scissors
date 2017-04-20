import React from 'baret'
import logo from './logo.svg'
import styles from './App.css'

const App = () =>
  <div className={styles.App}>
    <div className={styles.header}>
      <img src={logo} className={styles.logo} alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className={styles.intro}>
      test
    </p>
  </div>


export default App
