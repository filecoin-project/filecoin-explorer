import React from 'react'

const ExitCode = ({value}) => {
  const color = value === 0 ? 'green' : 'red'
  return <span className={color}>{value}</span>
}

export default ExitCode
