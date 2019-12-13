import React from 'react'
import Nav from '../nav/nav'

export const ErrorContext = React.createContext({})

const ErrorMessage = ({error}) => (
  <div className='pv4 pr4' id="error-message" style={{ paddingLeft: 60 }}>
    <h3>Oops!</h3>
    <p>> {error}</p>
    <p>We'll see this error soon, but feel free to bring it to our attention in the <a href="https://filecoinproject.slack.com/ ">Filecoin slack</a> or a <a href="https://github.com/openworklabs/filecoin-explorer">GitHub issue.</a></p>
  </div>
)

class ErrorWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }
  }

  setError = (err) => this.setState({ error: err })

  render() {
    return (
      <ErrorContext.Provider value={{ error: this.state.error, setError: this.setError.bind(this) }}>
        {this.state.error
          ? <React.Fragment>
            <Nav />
            <ErrorMessage error={this.state.error.message} />
          </React.Fragment>
          : this.props.children}
      </ErrorContext.Provider>
    )
  }
}

export default ErrorWrapper
