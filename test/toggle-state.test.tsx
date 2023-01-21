import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'

import { useKeyToggle } from '../src'
import { ModifierKey } from '../src/use-key-toggle'

const PressControlKThenRelease = '{Control>}K{/Control}'
const PressShiftKThenRelease = '{Shift>}K{/Shift}'
const PressAltKThenRelease = '{Alt>}K{/Alt}'

interface TestComponentProps {
  name: string
  keyCode: string
  modifierKey: ModifierKey
}

const TestComponent: React.FC<TestComponentProps> = (props) => {
  const [isToggled] = useKeyToggle(props.keyCode, props.modifierKey)

  return <div>
    {`${props.name} = ${isToggled ? 'on' : 'off'}`}
  </div>
}

describe('Toggle State', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup();
  })

  it('toggles with ALT key modifier', async () => {
    render(<TestComponent name='alt' keyCode='KeyK' modifierKey={ModifierKey.Alt} />)

    await user.keyboard(PressAltKThenRelease)
    expect(screen.getByText('alt = on')).not.toBeNull()

    await user.keyboard(PressAltKThenRelease)
    expect(screen.getByText('alt = off')).not.toBeNull()
  })

  it('toggles with SHIFT key modifier', async () => {
    render(<TestComponent name='shift' keyCode='KeyK' modifierKey={ModifierKey.Shift} />)

    await user.keyboard(PressShiftKThenRelease)
    expect(screen.getByText('shift = on')).not.toBeNull()

    await user.keyboard(PressShiftKThenRelease)
    expect(screen.getByText('shift = off')).not.toBeNull()
  })

  it('toggles with CONTROL key modifier', async () => {
    render(<TestComponent name='control' keyCode='KeyK' modifierKey={ModifierKey.Ctrl} />)

    await user.keyboard(PressControlKThenRelease)
    expect(screen.getByText('control = on')).not.toBeNull()

    await user.keyboard(PressControlKThenRelease)
    expect(screen.getByText('control = off')).not.toBeNull()
  })
})