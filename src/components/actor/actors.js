import React, {Component} from 'react'
import ErrorModal from '../error/error-modal.js'
import Cid from '../cid/cid'
import Inspector from '../object/inspector'
import ActorIcon from '../actor/actor-icon'
import Spinner from '../loading/spinner'

export default class Actors extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false, loading: true }
  }

  componentDidMount () {
    const {fetchActors} = this.props
    fetchActors().then(actors => {
      this.setState({actors: actors, loading: false})
    }).catch(err => {
      console.error(err)
      this.setState({hasError: true, loading: false})
    })
  }

  render () {
    const {actors, hasError, loading} = this.state
    const clearError = () => this.setState({hasError: false})
    if (hasError) {
      return <ErrorModal subject='Something went wrong' onClose={clearError}>Actors could not be loaded.</ErrorModal>
    }
    if (!loading && !actors) {
      return <h2>No Actors</h2>
    }
    return (
      <div>
        { actors ? actors.map((data, i) => <Actor actor={data} key={i} />) : null}
        <Spinner loading={loading} style={{top: '26px', left: '31px'}} />
      </div>
    )
  }
}

export function Actor ({actor}) {
  return (
    <section className='bg-snow ba b--black-10 mt3 mb4 mw7'>
      <h2 className='ma0 f6 tracked charcoal montserrat fw4 ttu bb b--black-10'>
        <ActorIcon type={actor.actorType} className='v-mid mh1' />
        {/* <span className='v-mid charcoal'>{actor.actorType.replace('Actor', '')}</span> */}
      </h2>
      <div className='pv2 ph3 lh-copy bg-snow-muted'>
        <dl className='f7' display='inline'>
          <dt className='ttu fw4 f7 silver'>Address</dt>
          <dd><Cid value={actor.address} /></dd>
          <dt className='ttu fw4 silver'>Code CID</dt>
          <dd>
            {actor.code && actor.code['/'] ? (
              <Cid value={actor.code && actor.code['/']} />
            ) : null}
          </dd>
          <dt className='ttu fw4 silver'>Nonce</dt>
          <dd>{actor.nonce}</dd>
          <dt className='ttu fw4 silver'>Balance</dt>
          <dd>{actor.balance}</dd>
          {/* <Memory memory={actor.memory} actorType={actor.actorType} /> */}
        </dl>
        {/* <Exports exports={actor.exports} /> */}
      </div>
    </section>
  )
}

function Exports ({exports}) {
  const entries = Object.entries(exports || {})
  if (entries.length === 0) return null
  return (
    <div>
      <h3 className='ttu fw4 f6 montserrat charcoal tracked'>Exports</h3>
      {entries.map(ent => <Export key={ent[0]} name={ent[0]} data={ent[1]} />) }
    </div>
  )
}

function Export ({name, data}) {
  return (
    <code className='db lh-copy f7 pb2'>
      <span className='green'>{name} </span>
      <span className='aqua'>(</span>
      <span className='dark-gray'>{data.Params.join(', ')}</span>
      <span className='aqua'>)</span>
      <span className='red'> => </span>
      <span className='aqua'>(</span>
      <span className='dark-gray'>{data.Return.join(', ')}</span>
      <span className='aqua'>)</span>
    </code>)
}

function Memory ({memory, actorType}) {
  if (!memory || Object.keys(memory).length === 0) return null
  return (
    <div>
      <h3 className='ttu fw4 f6 montserrat charcoal tracked'>Memory</h3>
      <Inspector data={memory} />
    </div>
  )
}
