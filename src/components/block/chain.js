import React, { Component } from 'react'
import FlipMove from 'react-flip-move'
import ErrorModal from '../error/error-modal'
import Spinner from '../loading/spinner'
import Generation from './generation'

class Chain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chain: false,
      loading: true,
      hasError: false
    }
  }

  pause = (ms) => {
    return new Promise((resolve) => (this.pauseHandle = setTimeout(resolve, ms)))
  }

  loadData = async () => {
    this.setState({loading: true})
    const {chainApi} = this.props
    try {
      const res = await chainApi.fetchChain()
      this.setState({chain: res, loading: false})
      // soon.
      await this.pause(2000)
      // presage the update with some spinner
      this.setState({loading: true})
      await this.pause(1200)
      // this.loadData()
    } catch (err) {
      console.error(err)
      this.setState({hasError: true, loading: false})
    }
  }

  componentDidMount () {
    this.loadData()
  }

  componentWillUnmount () {
    if (this.pauseHandle) {
      window.clearTimeout(this.pauseHandle)
    }
  }

  render () {
    const {chain, hasError, loading} = this.state
    const clearError = () => this.setState({hasError: false})

    if (hasError) {
      return (
        <ErrorModal subject='Something went wrong' onClose={clearError}>
          Chain could not be loaded.
        </ErrorModal>
      )
    }

    if (!loading && !chain) {
      return <h2>No Chain (something probably went wrong)</h2>
    }

    if (!loading && chain.length === 0) {
      return this.props.reverse ? <h3>No Newer Blocks</h3> : <h3>No Older Blocks</h3>
    }

    return (
      <div>
        <FlipMove enterAnimation='fade' leaveAnimation='fade'>
        {chain ? chain.filter((gen) => gen.length > 0).map((gen, i) => (
            <Generation blocks={gen} key={i} />
        )) : null}
        </FlipMove>
        <Spinner loading={loading} style={{top: '26px', left: '31px'}} />
      </div>
    )
  }
}

export default Chain
