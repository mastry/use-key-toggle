import React from 'react'
import '@testing-library/jest-dom'
import { render, RenderResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup'
import { useKeyToggle } from '../src'
import { ModifierKey } from '../src/use-key-toggle'

const PressControlKThenRelease = '{Control>}K{/Control}'

const testFunction = jest.fn((_: boolean) => { })

const TestComponent: React.FC = () => {
    const [isToggled, setIsToggled] = useKeyToggle('KeyK', ModifierKey.Ctrl, testFunction)


    return <div>
        <input id='suppressed-test'
            type='checkbox'
            onClick={() => { setIsToggled(!isToggled, true) }}
            checked={isToggled}
        />
        <input id='not-suppressed-test'
            type='checkbox'
            onClick={() => { setIsToggled(!isToggled, false) }}
            checked={isToggled}
        />
    </div>
}

describe('Manual Set', () => {
    let user: UserEvent
    let component: RenderResult

    beforeEach(() => {
        user = userEvent.setup()
        component = render(<TestComponent />)
    })

    it('changes the state', async () => {
        const check1 = component.container.querySelector('#suppressed-test')
        const check2 = component.container.querySelector('#not-suppressed-test')

        expect(check1).not.toBeNull()
        expect(check2).not.toBeNull()

        await user.click(check1!)
        const is1Checked = (check1! as HTMLInputElement).checked
        expect(is1Checked).toBe(true)

        const is2Checked = (check2! as HTMLInputElement).checked
        expect(is2Checked).toBe(true)
    })

    it('does not execute the callback function when suppressed', async () => {
        const check1 = component.container.querySelector('#suppressed-test')
        expect(check1).not.toBeNull()

        await user.click(check1!)
        const isChecked = (check1! as HTMLInputElement).checked
        expect(isChecked).toBe(true)
        expect(testFunction).toBeCalledTimes(0)
    })

    it('executes the callback function', async () => {
        const check2 = component.container.querySelector('#not-suppressed-test')
        expect(check2).not.toBeNull()

        await user.click(check2!)
        const isChecked = (check2! as HTMLInputElement).checked
        expect(isChecked).toBe(true)
        expect(testFunction).toBeCalledTimes(1)
    })
})
