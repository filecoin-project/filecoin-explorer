import React from 'react'

const icons = {
  'StoragemarketActor': require('ipfs-css/icons/stroke_server.svg'),
  'PaymentbrokerActor': require('ipfs-css/icons/stroke_share.svg'),
  'AccountActor': require('ipfs-css/icons/stroke_user.svg'),
  'MinerActor': require('ipfs-css/icons/stroke_marketing.svg')
}

const ActorIcon = ({type, size = 36, style, ...props}) => {
  const styles = {width: size, height: size, ...style}
  const iconSrc = icons[type]
  if (!iconSrc) return null
  return <img style={styles} src={iconSrc} alt='' {...props} />
}

export default ActorIcon
