import React from 'react'
import { storiesOf } from '@storybook/react'
import { checkA11y } from '@storybook/addon-a11y'
import Spinner from './spinner'

storiesOf('Spinner', module)
  .addDecorator(checkA11y)
  .add('IT SPIN!', () => (
    <div className='pa4'>
      <Spinner loading />
    </div>
  ))
