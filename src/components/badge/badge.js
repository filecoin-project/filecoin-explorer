import React from 'react'

const Badge = ({children}) => {
  return (
    <span className='dib bg-teal-muted white br2 tr f6' style={{padding: '3px 5px 3px 6px'}}>{children}</span>
  )
}

export default Badge
