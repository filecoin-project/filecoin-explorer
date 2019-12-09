import React from 'react'
import ExitCode from '../actor/exit-code'
import { Table, Td, Th } from './table'

const MessageReceiptRow = ({row}) => {

  return (
    <tr>
      <Td align='right'><ExitCode value={row.exitCode} /></Td>
      <Td align='left'>{row.gasUsed}</Td>
      <Td>{row.return}</Td>
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
          <Th>Gas used</Th>
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
