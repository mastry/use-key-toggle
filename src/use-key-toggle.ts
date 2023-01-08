import { useState, useEffect } from 'react';

export interface KeyToggleOptions {
    altkey: boolean
    ctrlKey: boolean
    metaKey: boolean
    shiftKey: boolean
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