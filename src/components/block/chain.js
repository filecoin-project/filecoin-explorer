import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import Spinner from '../loading/spinner';
import Generation from './generation';
import arrowDown from './arrow-down.svg';
import { ErrorContext } from '../error'

// this function returns two arrays
// 1 array represents the chain and its block
// 2 array stores heights as references for the first array
const convertChainStateToArray = chainState => {
  const heights = []
  const chain = Object.keys(chainState)
    .sort((a, b) => b - a)
    .map(height => {
      heights.push(height)
      return chainState[height]
    });
  return { heights, chain }
}

class Chain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chain: false,
      paginating: false,
      page: 1,
      numUpdatesFromChain: 0,
      saySorry: false,
    };
  }

  pause = ms => {
    return new Promise(resolve => (this.pauseHandle = setTimeout(resolve, ms)));
  };

  storeSubscriptionCallback = chainState => {
    const { chain, heights } = convertChainStateToArray(chainState)
    this.setState({
      chain,
      heights,
      // we count the number of chain updates so we dont show any blank screens
      numUpdatesFromChain: this.state.numUpdatesFromChain + 1,
      paginating: false,
    });
  };

  componentDidMount() {
    // loading the chain is a non blocking, asyncronous operation
    this.loadChain()
    this.timer = setTimeout(() => this.setState({ saySorry: true }), 5000)
  }

  async loadChain() {
    try {
      const {chain, heights} = convertChainStateToArray(this.props.chainApi.getChain());
      this.setState({
        chain,
        heights,
        numUpdatesFromChain: chain.length,
      });
      // subscribe to new chain events
      this.props.chainApi.subscribe(this.storeSubscriptionCallback);
      // get collect a few blocks starting at head - 1
      // HACK - todo: clean up - we pass the error setter to asyncronously set errors if one occurs
      this.props.chainApi.fetchChain(this.context.setError);
      // poll lotus for new chain updates and update the observable store
      this.props.chainApi.listen();
    } catch (err) {
      this.context.setError(err)
    }
  }

  componentWillUnmount() {
    if (this.pauseHandle) {
      window.clearTimeout(this.pauseHandle);
    }
    // unsubscribe from the chainstore and stop listening for new events to avoid mem leaks
    this.props.chainApi.unsubscribe(this.storeSubscriptionCallback);
    this.props.chainApi.stopListening();
  }

  render() {
    const { chain, heights, numUpdatesFromChain, paginating } = this.state;

    // wait until 3 chain updates come in before marking "loading" as complete
    const loading = numUpdatesFromChain < 3;

    if (!loading && !chain) {
      return <h2>No Chain (something probably went wrong)</h2>;
    }

    if (!loading && chain.length === 0) {
      return this.props.reverse ? (
        <h3>No Newer Blocks</h3>
      ) : (
        <h3>No Older Blocks</h3>
      );
    }

    if (loading) {
      return (
        <>
          <h3>Chain is loading...</h3>
          <p>Blocks will be streamed starting from the Chain Head</p>
          {this.state.saySorry && <p>Sorry, we know this is taking a while. We're working on making this faster.</p>}
        </>
      );
    }

    return (
      <div>
        <FlipMove enterAnimation="fade" leaveAnimation="fade">
          {chain
            ? chain
                .map((gen, i) => <Generation blocks={gen} key={i} height={heights[i]} />)
            : null}
          {!paginating && numUpdatesFromChain > 5 && this.state.page < 10 &&
            <div
              style={{
                cursor: 'pointer',
                marginTop: '10px',
                width: '30px',
                height: '30px',
              }}
              className="db bottom-0 ph2 pv1 charcoal bg-snow br1 f6 link focus-outline"
              title="Older"
              role="button"
              onClick={() => {
                this.setState({paginating: true, page: this.state.page + 1})
                try {
                  this.props.chainApi.loadNextBlocks()
                } catch (err) {
                  this.context.setError(err)
                }
              }}
            >
              <img src={arrowDown} alt="" className="dib v-mid" />
            </div>
          }
          {paginating &&
            <div style={{ height: '60px' }}>
              <Spinner loading style={{ top: '20px', left: '31px', position: 'relative', height: '20px' }} />
            </div>
          }
        </FlipMove>
        <Spinner loading={loading} style={{ top: '26px', left: '31px' }} />
      </div>
    );
  }
}

Chain.contextType = ErrorContext

export default Chain;
