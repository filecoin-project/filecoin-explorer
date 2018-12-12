import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ChainApi from './api/chain'
import fetchActors from './api/actors'
import Nav from './components/nav/nav'
import ChainView from './components/block/chain'
import Actors from './components/actor/actors'
import BlockDetails from './components/block/block-details'

// Caching api wrapper for chain and block data
const chainApi = new ChainApi()

const ActorsPageContainer = () => {
  return <Actors fetchActors={fetchActors} />
}

const BlockPageContainer = ({match}) => {
  return <BlockDetails chainApi={chainApi} cid={match.params.cid} />
}

const ChainPageContainer = () => {
  return <ChainView chainApi={chainApi} />
}

const Main = () => (
  <Router>
    <div>
      <Nav />
      <div className='pv4 pr4' style={{paddingLeft: 60}}>
        <Switch>
          <Route exact path='/' component={ChainPageContainer} />
          <Route exact path='/head' component={BlockPageContainer} />
          <Route exact path='/actors' component={ActorsPageContainer} />
          <Route path='/chain/:cid' component={ChainPageContainer} />
          <Route path='/blocks/:cid' component={BlockPageContainer} />
          <Route render={() => <h3>404</h3>} />
        </Switch>
      </div>
    </div>
  </Router>
)

export default Main
