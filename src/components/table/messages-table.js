import React from 'react'
import Cid from '../cid/cid'
import {MethodName, Params} from '../actor/method'
import { Table, Td, Th } from './table'

const MessageRow = ({row}) => (
  <tr>
    <Td><Cid value={row.message.to} /></Td>
    <Td><Cid value={row.message.from} /></Td>
    <Td align='right'>{row.message.value}</Td>
    <Td align='right'>{row.message.nonce}</Td>
    <Td><MethodName>{row.message.method}</MethodName></Td>
    <Td><Params>{row.message.params}</Params></Td>
    <Td aligh='right'>{row.signature}</Td>
  </tr>)

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
          <Th>Sinature</Th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => <MessageRow key={row.message.nonce + row.message.from} row={row} />)}
      </tbody>
    </Table>
  )
}

export default MessagesTable
