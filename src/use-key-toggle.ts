import { useState, useEffect } from 'react';

export enum ModifierKey {
    None = 0x0,
    Alt = 0x1,
    Ctrl = 0x2,
    Shift = 0x4,
}

export type SetToggleStateFunc =
    (state: boolean, suppressCallback: boolean) => void

export type KeyToggleCallback = (isVisible: boolean) => void

export function useKeyToggle(
    keyCode: string,
    modifierKey: ModifierKey,
    callback?: KeyToggleCallback): [boolean, SetToggleStateFunc] {

    const [isOn, setIsOn] = useState(false)

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    });

    return [isOn, _setIsOn];

    function _setIsOn(isOn: boolean, suppressCallback: boolean = false) {
        setIsOn(isOn);
        if (callback && !suppressCallback) {
            callback(isOn);
        }
    }

    function onKeyDown(e: KeyboardEvent) {

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
}

