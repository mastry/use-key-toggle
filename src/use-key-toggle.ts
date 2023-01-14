import { useState, useEffect } from 'react';

export class KeyToggleOptions {
    private _altkey: boolean
    private _ctrlKey: boolean
    private _metaKey: boolean
    private _shiftKey: boolean

    constructor(altkey, ctrlkey, shiftkey) {
        this._altkey = altkey
        this._ctrlKey = ctrlkey
        this._metaKey = ctrlkey
        this._shiftKey = shiftkey
    }

    get altKey() {
        return this._altkey
    }

    get ctrlKey() {
        return this._ctrlKey
    }

    get metaKey() {
        return this._ctrlKey
    }

    get shiftKey() {
        return this._shiftKey
    }
}

export function useKeyToggle(keyCode: string, func?: (isVisible: boolean) => void, options?: KeyToggleOptions): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    const [isOn, setIsOn] = useState(false)

    useEffect(() => {
        const toggleState = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.code === keyCode) {
                e.preventDefault();
                if (func) {
                    func(!isOn);
                }
                setIsOn(!isOn);
            }
        }
        document.addEventListener('keydown', toggleState);
        return () => document.removeEventListener('keydown', toggleState);
    });

    return [isOn, setIsOn];
}