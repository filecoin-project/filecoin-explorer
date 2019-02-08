import React from 'react'
import Cid from '../cid/cid'
import {MethodName, Params} from '../actor/method'
import { Table, Td, Th } from './table'

// @param row: { signature: "", meteredMessage: { message: {...}}}
const MessageRow = ({row}) => {
  if (!row || !row.signature) return null
  const { signature, ...rest } = row
  let message = {}
  if (rest.meteredMessage) {
    message = rest.meteredMessage.message
  } else {
    // find the first prop that has a message sub-prop
    const msgKey = Object.keys(rest).find(key => !!rest[key].message)
    if (msgKey) {
      message = rest[msgKey].message
    }
  }
  // TODO: find out the minimal interface for a message, that we could render below.
  return (
    <tr>
      <Td><Cid value={message.to} /></Td>
      <Td><Cid value={message.from} /></Td>
      <Td align='right'>{message.value}</Td>
      <Td align='right'>{message.nonce}</Td>
      <Td><MethodName>{message.method}</MethodName></Td>
      <Td><Params>{message.params}</Params></Td>
      <Td aligh='right'>{signature}</Td>
    </tr>
  )
}

const MessagesTable = ({data}) => {
  if (!data || !data.length) return null
  return (
    <Table>
      <thead>
        <tr>
          <Th>To</Th>
          <Th>From</Th>
          <Th>Value</Th>
          <Th>Nonce</Th>
          <Th>MeThod</Th>
          <Th>Params</Th>
          <Th>Signature</Th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => <MessageRow key={`message-row-${i}`} row={row} />)}
      </tbody>
    </Table>
  )
}

export default MessagesTable
