import React from 'baret'
import styles from './App.css'
import Bacon from 'baconjs'

import RPS from './components/rps/component.js'
import {addListener} from './util/socket.js'

const userStream = Bacon.fromBinder(sink => addListener('usercount', sink))

const App = () =>
  <div className={styles.App}>
    <div className={styles.header}>
      <h2>Rock to da Paper to da Scissors</h2>
      <h4> {userStream} users connected </h4>
    </div>
    <p className={styles.intro}>
    </p>

    <RPS></RPS>
  </div>


export default App
