import React from 'react'
import Block from './block'

class Generation extends React.Component {
  render () {
    const {blocks, onClick} = this.props
    if (!blocks) return null
    return (
      <div className='nowrap'>
        {blocks.map((b, i) => (
          <div className='dib pr4' style={{width: 250}} key={b.cid+b.height}>
            <Block truncate block={b} onClick={onClick} secondary={i !== 0} />
          </div>
        ))}
      </div>
    )
  }
}

export default Generation
