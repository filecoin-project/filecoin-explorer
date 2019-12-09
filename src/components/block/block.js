import React from 'react'
import { Link } from 'react-router-dom'
import Cid from '../cid/cid'
import blockIcon from './filecoin-block.svg'
import minerIcon from 'ipfs-css/icons/stroke_marketing.svg'
import ticketIcon from 'ipfs-css/icons/stroke_tag.svg'
import stateRootIcon from 'ipfs-css/icons/stroke_copy.svg'

const Stat = ({label, bg, children}) => (
  <span className='dib tc mr3'>
    <span className='dib ph2 pv1 br2 white f6 fw4' style={{background: bg, minWidth: 50}}>
      {children}
    </span>
    <label className='db pt1 v-mid charcoal-muted ttu tracked' style={{fontSize: '8px'}}>
      {label}
    </label>
  </span>
)

const Ticket = ({ proof }) => (
  <React.Fragment>
    <img
      src={ticketIcon}
      alt=""
      className="dib v-top"
      style={{ height: 32, marginLeft: 4, marginRight: 4 }}
    />
    <div className="dib mid-gray pt1" style={{ height: 'auto' }}>
      {/* Note this is a bit confusing, were using "Cid" components to render non-cid strings */}
      <Cid value={proof} truncate />
      <label
        className="db v-mid charcoal-muted ttu tracked"
        style={{ fontSize: '8px' }}
      >
        Ticket Proof
      </label>
    </div>
    <br />
  </React.Fragment>
);

export const Block = ({block, secondary, truncate, onClick}) => {
  const { cid, header, messages, messageReceipts = [] } = block
  const { height, miner, tickets, stateRoot, parentWeightNumerator, parentWeightDenominator = [] } = header
  const isNullBlock = !cid
  const parentWeight = (parentWeightNumerator / parentWeightDenominator) || 0
  const parentWeightStr = parentWeight > 10000 ? parentWeight.toExponential(1) : parentWeight.toLocaleString(2)
  const bg = isNullBlock || secondary ? '#EDF0F4' : '#DEF2FF'
  console.log(stateRoot)
  return (
    <MaybeLink
      block={block}
      onClick={onClick}
      title="Explore block"
      style={{ background: bg }}
      className="dib link ba b--black-10 focus-outline mt3 mw7 relative sans-serif"
    >
      <img
        src={blockIcon}
        alt=""
        className="absolute"
        style={{ left: -31, top: -18, width: 60 }}
      />
      <span
        style={{ paddingLeft: 40, paddingBottom: 7 }}
        className="tl db pt2 pr3 mb3 bg-snow-muted monospace mid-gray f7 bb b--black-10 lh-copy"
      >
        {!isNullBlock ? (
          <Cid value={cid} truncate={truncate} />
        ) : (
          <Cid value={'null block'} />
        )}
      </span>
      <span className="db pb1 lh-copy" style={{ paddingLeft: 24 }}>
        <Stat label="Height" bg="#1CA4FC">
          {height}
        </Stat>
        {isNullBlock ? null : (
          <Stat label="Messages" bg="#6C6C6C">
            {messages ? messages.length : 0}
          </Stat>
        )}
        {truncate ? null : (
          <Stat label="Receipts" bg="#6C6C6C">
            {messageReceipts ? messageReceipts.length : 0}
          </Stat>
        )}
        {truncate ? null : (
          <Stat label="Power" bg="#6C6C6C">
            {parentWeightStr}
          </Stat>
        )}
      </span>
      {miner ? (
        <span
          className="db tl bg-snow-muted pr3 bt b--black-10"
          style={{ height: 34 }}
        >
          <img
            src={minerIcon}
            alt=""
            className="dib v-top"
            style={{ height: 32, marginLeft: 4, marginRight: 4 }}
          />
          <span className="dib mid-gray pt1">
            {/* Note this is a bit confusing, were using "Cid" components to render non-cid strings */}
            <Cid value={miner} truncate={truncate} />
            <label
              className="db v-mid charcoal-muted ttu tracked"
              style={{ fontSize: '8px' }}
            >
              Miner
            </label>
          </span>
        </span>
      ) : null}
      {truncate ? null : (
        <span
          className="db tl bg-snow-muted pr3 bt b--black-10"
          style={{ height: 'auto' }}
        >
          {tickets.map(ticket => (
            <Ticket
              key={ticket.VRFProof}
              proof={ticket.VRFProof}
              truncate={truncate}
            />
          ))}
        </span>
      )}
      {truncate ? null : (
        <span
          className="db tl bg-snow-muted pr3 bt b--black-10"
          style={{ height: 34 }}
        >
          <img
            src={stateRootIcon}
            alt=""
            className="dib v-top"
            style={{ height: 32, marginLeft: 4, marginRight: 4 }}
          />
          <span className="dib mid-gray pt1">
            <Cid value={stateRoot} truncate={truncate} />
            <label
              className="db v-mid charcoal-muted ttu tracked"
              style={{ fontSize: '8px' }}
            >
              State root
            </label>
          </span>
        </span>
      )}
    </MaybeLink>
  );
}

const MaybeLink = ({children, block, truncate, onClick, ...props}) => {
  if (onClick || !block.cid) {
    return (
      <span onClick={(e) => onClick(block)} {...props}>
        {children}
      </span>
    )
  }
  const {hash} = window.location
  return (
    <Link to={`/blocks/${block.cid}${hash}`} {...props}>
      {children}
    </Link>
  )
}

export default Block
