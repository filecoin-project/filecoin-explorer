import React from 'react'

export const Table = ({children}) => (
  <table cellSpacing='0' className='tl monospace collapse ba br2 b--black-10 pv2 ph3'>{children}</table>
)

export const Th = ({children}) => (
  <th className='pv2 ph3 tl f7 fw5 ttu sans-serif charcoal-muted bg-near-white'>{children}</th>
)

export const Td = ({children, ...props}) => (
  <td className='pv2 ph3 fw4 f7 charcoal' {...props}>{children}</td>
)
