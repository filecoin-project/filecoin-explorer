import React from 'react'

export const MethodName = ({children}) => {
  return <span className='monospace green'>{children}</span>
}

export const Params = ({children}) => {
  return <span className='monospace dark-gray'>{children}</span>
}

export default MethodName
