import React from 'react'
import { NavLink } from 'react-router-dom'
import filecoinLogo from './filecoin-logo.svg'

function Nav () {
  const {hash} = window.location
  return (
    <div className='dt dt--fixed bg-navy lh-title montserrat'>
      <NavLink to={`/${hash}`} className='dtc v-mid focus-outline tc' style={{height: 30, width: 61}}>
        <img className='v-mid' src={filecoinLogo} alt='ƒ' style={{width: 30}} />
      </NavLink>
      <nav className='dtc tl v-mid'>
        <NavLink to={`/${hash}`} exact className='dib link snow ph4 pv3 fw3 focus-outline' activeClassName='bg-navy-muted'>Chain</NavLink>
        <NavLink to={`/head${hash}`} className='dib link snow ph4 pv3 focus-outline' activeClassName='bg-navy-muted'>Best Block</NavLink>
        <NavLink to={`/actors${hash}`} className='dib link snow ph4 pv3 focus-outline' activeClassName='bg-navy-muted'>Actors</NavLink>
      </nav>
      <div className='dtc tr v-mid montserrat fw2 f4 aqua ph4' style={{width: 250}}>Filecoin Explorer</div>
    </div>
  )
}

export default Nav
