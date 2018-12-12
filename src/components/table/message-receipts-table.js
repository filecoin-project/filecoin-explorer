import React from 'react'
import ExitCode from '../actor/exit-code'
import { Table, Td, Th } from './table'

const MessageReceiptRow = ({row}) => {
  let returns = []
  if (row.return && row.return.length > 0) {
    returns = row.return.map((v) => Buffer.from(v, 'base64').toString('hex'))
  }

  return (
    <tr>
      <Td align='right'><ExitCode value={row.exitCode} /></Td>
      <Td>[{returns.join(', ')}]</Td>
    </tr>
  )
}

const MessageReceiptsTable = ({data}) => {
  if (!data || !data.length) return null

  return (
    <Table>
      <thead>
        <tr>
          <Th>Exit Code</Th>
          <Th>Returns</Th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => <MessageReceiptRow key={i} row={row} />)}
      </tbody>
    </Table>
  )
}

export default MessageReceiptsTable
