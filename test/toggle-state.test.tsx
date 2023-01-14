import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'

const PressControlKThenRelease = '{Control>}K{/Control}'

import { useKeyToggle } from '../src'

const TestComponent: React.FC = () => {
  const [isToggled] = useKeyToggle('KeyK')

  return <div id='output'>
    {isToggled ? 'on' : 'off'}
  </div>
}

describe('Toggle State', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup();
    render(<TestComponent />)
  })

  it('is initially false', async () => {
    expect(screen.getByText('off')).not.toBeNull()
  })

  it('is true after the key combo is pressed once', async () => {
    await user.keyboard(PressControlKThenRelease)

    expect(screen.getByText('on')).not.toBeNull()
  })

  it('is false after the key combo is pressed twice', async () => {
    await user.keyboard(PressControlKThenRelease)
    expect(screen.getByText('on')).not.toBeNull()

    await user.keyboard(PressControlKThenRelease)
    expect(screen.getByText('off')).not.toBeNull()
  })
})