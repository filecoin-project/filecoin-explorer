import React, { Component } from 'react';
import { Lotus } from '@openworklabs/lotus-block-explorer';
import ErrorModal from '../error/error-modal.js';
import Cid from '../cid/cid';
import Inspector from '../object/inspector';
import ActorIcon from '../actor/actor-icon';
import Spinner from '../loading/spinner';
import arrowDown from '../block/arrow-down.svg';

const lotus = new Lotus({
  jsonrpcEndpoint: 'https://lotus-dev.temporal.cloud/rpc/v0',
});

export default class Actors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      loading: true,
      paginating: false,
      lastActorIndex: 0,
      actors: []
    };
  }

  async componentDidMount() {
    await this.getActors(0, 4);
    this.setState({ loading: false });
  }

  getActors = async (to, from) => {
    this.setState({...this.state, paginating: true})
    const actors = await lotus.listActors(to, from);
    this.setState({
      actors: [...this.state.actors, ...actors],
      lastActorIndex: from,
      paginating: false
    });
  };

  render() {
    const { actors, hasError, loading, paginating } = this.state;
    const clearError = () => this.setState({ hasError: false });
    if (hasError) {
      return (
        <ErrorModal subject="Something went wrong" onClose={clearError}>
          Actors could not be loaded.
        </ErrorModal>
      );
    }
    
    if (!loading && !actors) {
      return <h2>No Actors</h2>;
    }

    if (loading) {
      return (
        <>
          <h3>Actors are loading...</h3>
        </>
      );
    }

    return (
      <div>
        {actors
          ? actors.map((data, i) => <Actor actor={data} key={i} />)
          : null}
        <Spinner loading={loading} style={{ top: '26px', left: '31px' }} />
        {!paginating && 
          <div
            style={{
              cursor: 'pointer',
              marginTop: '10px',
              width: '30px',
              height: 'auto',
            }}
            className="db bottom-0 ph2 pv1 charcoal bg-snow br1 f6 link focus-outline"
            title="Older"
            role="button"
            onClick={() =>
              this.getActors(
                this.state.lastActorIndex,
                this.state.lastActorIndex + 4
              )
            }
          >
            <img src={arrowDown} alt="" className="dib v-mid" />
          </div>
        }
        {paginating && 
          <div style={{ height: '50px' }}>
            <Spinner loading={true} style={{ top: '20px', left: '31px', position: 'relative', height: '20px' }} />
          </div>
        }
      </div>
    );
  }
}

export function Actor({ actor }) {
  return (
    <section className="bg-snow ba b--black-10 mt3 mb4 mw7">
      <h2 className="ma0 f6 tracked charcoal montserrat fw4 ttu bb b--black-10">
        <ActorIcon type={actor.actorType} className="v-mid mh1" />
        <span className="v-mid charcoal">
          {actor.actorType.replace('Actor', '')}
        </span>
      </h2>
      <div className="pv2 ph3 lh-copy bg-snow-muted">
        <dl className="f7" display="inline">
          <dt className="ttu fw4 f7 silver">Address</dt>
          <dd>
            <Cid value={actor.address} />
          </dd>
          <dt className="ttu fw4 silver">Code CID</dt>
          <dd>
            {actor.code && actor.code['/'] ? (
              <Cid value={actor.code && actor.code['/']} />
            ) : null}
          </dd>
          <dt className="ttu fw4 silver">Nonce</dt>
          <dd>{actor.nonce}</dd>
          <dt className="ttu fw4 silver">Balance</dt>
          <dd>{actor.balance}</dd>
          <Memory memory={actor.memory} actorType={actor.actorType} />
        </dl>
        {/* <Exports exports={actor.exports} /> */}
      </div>
    </section>
  );
}

function Exports({ exports }) {
  const entries = Object.entries(exports || {});
  if (entries.length === 0) return null;
  return (
    <div>
      <h3 className="ttu fw4 f6 montserrat charcoal tracked">Exports</h3>
      {entries.map(ent => (
        <Export key={ent[0]} name={ent[0]} data={ent[1]} />
      ))}
    </div>
  );
}

function Export({ name, data }) {
  return (
    <code className="db lh-copy f7 pb2">
      <span className="green">{name} </span>
      <span className="aqua">(</span>
      <span className="dark-gray">{data.Params.join(', ')}</span>
      <span className="aqua">)</span>
      <span className="red"> => </span>
      <span className="aqua">(</span>
      <span className="dark-gray">{data.Return.join(', ')}</span>
      <span className="aqua">)</span>
    </code>
  );
}

function Memory({ memory, actorType }) {
  if (!memory || Object.keys(memory).length === 0) return null;
  return (
    <div>
      <h3 className="ttu fw4 f6 montserrat charcoal tracked">Memory</h3>
      <Inspector data={memory} />
    </div>
  );
}
