import React, { useState, useEffect } from 'react';

export enum ModifierKey {
    None = 0x0,
    Alt = 0x1,
    Ctrl = 0x2,
    Shift = 0x4,
}

export type SetToggleStateFunc = React.Dispatch<React.SetStateAction<boolean>>

export function useKeyToggle(
    keyCode: string,
    modifierKey: ModifierKey,
    callback?: (isVisible: boolean) => void): [boolean, SetToggleStateFunc] {

    const [isOn, setIsOn] = useState(false)

    useEffect(() => {
        const toggleState = (e: KeyboardEvent) => {

            if (e.code !== keyCode) {
                return;
            }

            let shouldHandle = false

            if (modifierKey == ModifierKey.None && !e.altKey && !e.ctrlKey && !e.shiftKey) {
                shouldHandle = true
            }

            else if (modifierKey === ModifierKey.Alt && e.altKey && !e.ctrlKey && !e.shiftKey) {
                shouldHandle = true
            }

            else if (modifierKey === ModifierKey.Ctrl && !e.altKey && e.ctrlKey && !e.shiftKey) {
                shouldHandle = true
            }

            else if (modifierKey === ModifierKey.Shift && !e.altKey && !e.ctrlKey && e.shiftKey) {
                shouldHandle = true
            }

            if (shouldHandle) {
                e.preventDefault();
                if (callback) {
                    callback(!isOn);
                }
                setIsOn(!isOn);
            }
        }

        document.addEventListener('keydown', toggleState);

        return () => document.removeEventListener('keydown', toggleState);
    });

    return [isOn, setIsOn];
}
