import React from 'react'

export function cidStartAndEnd (value) {
  const chars = value.split('')
  if (chars.length <= 9) return value
  const start = chars.slice(0, 4).join('')
  const end = chars.slice(chars.length - 4).join('')
  return {
    value,
    start,
    end
  }
}

const ShortCid = ({value, title, style, ...props}) => {
  style = Object.assign({}, {
    textDecoration: 'none'
  }, style)
  const {start, end} = cidStartAndEnd(value)
  return (
    <abbr title={title || value} style={style} {...props}>
      <span>{start}</span>
      <span className='o-20'>...</span>
      <span>{end}</span>
    </abbr>
  )
}

const Cid = ({value, truncate, children}) => {
  if (!value && !children) return null

  let cidStr = value || children
  if (cidStr['/']) {
    cidStr = cidStr['/']
  }
  if (typeof cidStr !== 'string') {
    throw new Error('Unexpected CID value', {cidStr, value, children})
  }
  if (truncate) {
    return <ShortCid value={cidStr} className='monospace f7' />
  }
  return (
    <span className='monospace f7'>{cidStr}</span>
  )
}

export default Cid
