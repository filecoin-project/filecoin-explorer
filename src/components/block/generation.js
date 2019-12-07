import React from 'react'
import Block from './block'

class Generation extends React.Component {
  render () {
    const {blocks} = this.props
    if (!blocks) return null
    return (
      <div className='nowrap'>
        {blocks.map((b, i) => {
          return <div
            className="dib pr4"
            style={{ width: 250 }}
            key={i}
          >
            <Block truncate block={b} secondary={i !== 0} />
          </div>
        })}
      </div>
    )
  }
}

export default Generation
