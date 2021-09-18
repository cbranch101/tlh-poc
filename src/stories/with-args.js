import React from 'react'
import { Provider } from './theme-builder/use-args'

export default () => (Story, { args = {} }) => {
    return (
        <Provider value={args}>
            <Story />
        </Provider>
    )
}
