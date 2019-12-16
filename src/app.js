import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ChainApi from './api/chain'
import Nav from './components/nav/nav'
import ChainView from './components/block/chain'
import Actors from './components/actor/actors'
import Info from './components/info/info'
import BlockDetails from './components/block/block-details'
import ErrorHandler from './components/error'

// Caching api wrapper for chain and block data
const chainApi = new ChainApi()

const ActorsPageContainer = () => {
  return <Actors />
}

const BlockPageContainer = ({match}) => {
  return <BlockDetails chainApi={chainApi} cid={match.params.cid} />
}

const ChainPageContainer = () => {
  return <ChainView chainApi={chainApi} />
}

const InfoPageContainer = () => {
  return <Info />
}

const Main = () => (
    <Router>
      <ErrorHandler>
        <Nav />
        <div className='pv4 pr4' id='page-container' style={{ paddingLeft: 60 }}>
          <Switch>
            <Route exact path='/' component={ChainPageContainer} />
            <Route exact path='/head' component={BlockPageContainer} />
            <Route exact path='/actors' component={ActorsPageContainer} />
            <Route path='/chain/:cid' component={ChainPageContainer} />
            <Route path='/blocks/:cid' component={BlockPageContainer} />
            <Route exact path='/info' component={InfoPageContainer} />
            <Route render={() => <h3>404</h3>} />
          </Switch>
        </div>
      </ErrorHandler>
    </Router>
)

export default Main
