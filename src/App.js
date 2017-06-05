import React from 'baret'
import styles from './App.css'
import Bacon from 'baconjs'

import RPS from './components/rps/component.js'
import {addListener, disconnect, connect} from './util/socket.js'

const userStream = Bacon.fromBinder(sink => addListener('usercount', sink))

class App extends React.Component {
  componentWillUnmount() {
    disconnect()
  }
  componentWillMount() {
    connect()
  }
  render = () =>
  <div className={styles.App}>
    <div className={styles.header}>
      <h2>Rock to da Paper to da Scissors</h2>
    </div>
    <h4> {userStream} user(s) connected </h4>
    <p className={styles.intro}>
    </p>

    <RPS></RPS>
  </div>
}


export default App
