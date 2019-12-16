import React from 'react'
import Cid from '../cid/cid'
import {MethodName, Params} from '../actor/method'
import { Table, Td, Th } from './table'

// @param message: { To, From, Value, Nonce, Method, Params }

const MessageRow = ({ message }) => {
  // TODO: find out the minimal interface for a message, that we could render below.
  return (
    <tr>
      <Td><Cid value={message.To} /></Td>
      <Td><Cid value={message.From} /></Td>
      <Td align='right'>{message.Value}</Td>
      <Td align='right'>{message.Nonce}</Td>
      <Td><MethodName>{message.Method}</MethodName></Td>
      <Td><Params>{message.Params}</Params></Td>
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
          {/* <Th>Signature</Th> */}
        </tr>
      </thead>
      <tbody>
        {data.map((message, i) => <MessageRow key={`message-row-${i}`} message={message} />)}
      </tbody>
    </Table>
  )
}

export default MessagesTable
