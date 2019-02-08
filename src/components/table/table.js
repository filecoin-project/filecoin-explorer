import React from 'react'

export const Table = ({children}) => (
  <div className='dib ba br2 b--black-10 overflow-auto mw-100'>
    <table cellSpacing='0' className='tl monospace collapse pv2 ph3 dt-fixed'>{children}</table>
  </div>
)

export const Th = ({children}) => (
  <th className='pv2 ph3 tl f7 fw5 ttu sans-serif charcoal-muted bg-near-white'>{children}</th>
)

export const Td = ({children, ...props}) => (
  <td className='pv2 ph3 fw4 f7 charcoal' {...props}>{children}</td>
)
