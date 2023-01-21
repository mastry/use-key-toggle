# use-key-toggle

A simple React hook to toggle a boolean flag with a key press.

## Installation

```sh
npm i @mastry/use-key-toggle
```

## Usage

```ts
import React from 'react'
import useKeyToggle from 'use-key-toggle'

const MyComponent: React.FC = () => {
    const [isOpen] = useKeyToggle('KeyK', false);

    return <>Press CTRL+K to change state. The current state is {isOpen}</>
}
```