import React from 'react'

const Separator = ({ height }) => (
  <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
    <hr style={{
      border: 'none',
      height: '1px',
      backgroundColor: '#333',
      width: '50px'
    }} />
    <p style={{ color: '#333' }}>{height}</p>
    <hr style={{
      border: 'none',
      height: '1px',
      backgroundColor: '#333',
      width: '80vw'
    }} />
  </div>
)

export default Separator
