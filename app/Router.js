import React from 'react'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Frontpage from './pages/Frontpage'
import Grants from './pages/Grants'

export default function({ history }){
  return (
    <Router history={history}>
      <Route path="/grants" component={Grants} />
      <Route path="*" component={Frontpage} />
    </Router>
  )
}
