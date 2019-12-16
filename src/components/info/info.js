import React, {Component} from 'react'
import ErrorModal from '../error/error-modal.js'
import Cid from '../cid/cid'
import Inspector from '../object/inspector'
import ActorIcon from '../actor/actor-icon'
import Spinner from '../loading/spinner'

export default class Info extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false, loading: true }
  }

  componentDidMount () {}

  render () {
    const {actors, hasError, loading} = this.state

    return (
      <div className="about">
        <h2>About this Explorer</h2>
        <p>Welcome to the Filecoin Testnet Chain Explorer!</p>
        <br/>
        <h3>Chain</h3>
        <p>The Chain page shows a visualization of the Filecoin blockchain.
        <br/><br/>Each row is a <strong><a href="https://filecoin-project.github.io/specs/#systems__filecoin_blockchain__struct__tipset" target="_blank">Tipset</a></strong> at the chain height listed.
        <br/><br/>A Tipset is the set of all valid blocks in a given round.
        <br/><br/>Just as there can be zero block miners winning a round, multiple block miners can be elected as leaders in a given round.
        <br/><br/>This in turn means multiple blocks can be created per round.
        <br/><br/>In order to avoid wasting valid work done by miners, Filecoin's consensus algorithm (called <a href="https://filecoin-project.github.io/specs/#algorithms__expected_consensus" target="_blank">Expected Consensus</a>) makes use of all valid blocks generated.
        <br/><br/>Winning Parent Tipsets have a weight, and heaviest tipsets track the most total storage power.
        <br/><br/>The network eventually converges around the heaviest weighted chain.
        <br/><br/>Click on <strong>height</strong> or <strong>messages</strong> to see further details about that block.</p>
        <br/>
        <h3>Best Block</h3>
        <p>The Best Block page shows details about one of the recent winning blocks (there may be others not shown).
        <br/><br/><strong>Parents</strong> shows blocks in the block's Parent Tipset.
        <br/><br/><strong><a href="https://filecoin-project.github.io/specs/#systems__filecoin_vm__message" target="_blank">Messages</a></strong> shows all the Actor transactions assembled within that block.
        <br/><br/>Below that are <a href="https://filecoin-project.github.io/specs/#receipts" target="_blank">Message Receipts</a> which are the results of VM executions.</p>
        <br/>
        <h3>Actors</h3>
        <p>The Actors page shows a list of some actors in the Filecoin network by address.
        <br/><br/>This can include any Account holder, Storage Miners, and system actors that manage network-wide functions (e.g. StorageMarketActor, StoragePowerActor, CronActor, InitActor, etc.)
        <br/><br/>Actors are similar to smart contracts in other chains, but they are hard-coded into the network. User-defined smart contracts are on the Filecoin roadmap.
        </p>
      </div>
    )
  }
}

