import React from 'baret'
import Bacon from 'baconjs'
const seconds = Bacon.interval(1000).toProperty()
const RPS = () =>
  <div>
      The clock is ticking: {seconds.map(() => new Date().toISOString())}
  </div>

export default RPS
