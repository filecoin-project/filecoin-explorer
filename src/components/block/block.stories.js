import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { checkA11y } from '@storybook/addon-a11y'
import Block from './block'
import Generation from './generation'

// fake some extra parents
const chain = [
  [Object.assign({}, require('./fixtures/block.DRo2.json'), {
    height: 314122,
    parents: [
      {
        '/': 'zDPWYqFD7np5ATk5Qn2bT4nv943Ki9Qug2pm2drtnoyXzYQETKS1'
      },
      {
        '/': 'zDPWYqFD7np5ATk5Qn2bT4nv943Ki9Qug2pm2drtnoyXzYQETKS1'
      }
    ]
  })],
  [
    Object.assign({}, require('./fixtures/block.TKS1.json'), { height: 314121 }),
    Object.assign({}, require('./fixtures/block.kQRf.json'), { height: 314121 })
  ]
]

storiesOf('Block', module)
  .addDecorator(checkA11y)
  .add('Block wth full CID', () => (
    <div className='pa4'>
      <Block block={require('./fixtures/block.DRo2.json')} onClick={action('click')} />
    </div>
  ))
  .add('Block wth short CID', () => (
    <div className='pa4'>
      <Block truncate block={require('./fixtures/block.DRo2.json')} onClick={action('click')} />
    </div>
  ))
  .add('Null block', () => (
    <div className='pa4'>
      <Block truncate block={{height: 47999}} onClick={action('click')} />
    </div>
  ))
  .add('2 parents', () => (
    <div className='pa4'>
      <Generation blocks={chain[0]} onClick={action('click')} />
      <Generation blocks={chain[1]} onClick={action('click')} />
    </div>
  ))
  .add('4 parents', () => (
    <div className='pa4'>
      <Generation blocks={chain[0]} onClick={action('click')} />
      <Generation blocks={[...chain[1], ...chain[1]]} onClick={action('click')} />
    </div>
  ))
  .add('8 parents', () => (
    <div className='pa4'>
      <Generation blocks={chain[0]} onClick={action('click')} />
      <Generation blocks={[...chain[1], ...chain[1], ...chain[1], ...chain[1]]} onClick={action('click')} />
    </div>
  ))
