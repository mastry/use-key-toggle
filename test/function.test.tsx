import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'
import { useKeyToggle } from '../src'
import { ModifierKey } from '../src/use-key-toggle'

const PressControlKThenRelease = '{Control>}K{/Control}'
const PressAltKThenRelease = '{Alt>}K{/Alt}'

const testFunction = jest.fn((_: boolean) => { })

const TestComponent: React.FC = () => {
  const [isToggled] = useKeyToggle('KeyK', ModifierKey.Ctrl, testFunction)

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

  it('is not called for invalid key combo', async () => {
    await user.keyboard(PressAltKThenRelease)
    expect(testFunction).toBeCalledTimes(0)
  })

  it('is called once for valid key combo', async () => {
    await user.keyboard(PressControlKThenRelease)
    expect(testFunction).toBeCalledTimes(1)
  })

})