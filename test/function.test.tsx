import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'
import { useKeyToggle } from '../src'

const PressControlKThenRelease = '{Control>}K{/Control}'

const testFunction = jest.fn((_: boolean) => { })

const TestComponent: React.FC = () => {
  const [isToggled] = useKeyToggle('KeyK', testFunction)

  return <div id='output'>
    {isToggled ? 'on' : 'off'}
  </div>
}

describe('Function Call', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    render(<TestComponent />)
  })

  it('is called once', async () => {
    await user.keyboard(PressControlKThenRelease)
    expect(testFunction).toBeCalledTimes(1)
  })
})