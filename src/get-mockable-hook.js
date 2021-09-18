import { createContext, useContext } from 'react'
export const MockedHookContext = createContext({})

const getMockableHook = (hookName, realHook) => (...args) => {
    const mockedHooks = useContext(MockedHookContext)
    const hook = mockedHooks[hookName] || realHook
    return hook(...args)
}

export default getMockableHook
