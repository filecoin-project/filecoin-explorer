import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { checkA11y } from '@storybook/addon-a11y'
import MessagesTable from './messages-table'
import MessageReceiptsTable from './message-receipts-table'

storiesOf('Messages Table', module)
  .addDecorator(checkA11y)
  .add('Messages table', () => (
    <MessagesTable data={require('./fixtures/block.2fwH.json').messages} />
  ))
  .add('Messages recipts table', () => (
    <MessageReceiptsTable data={require('./fixtures/block.2fwH.json').messageReceipts} />
  ))
