import { createContext, useContext } from 'react'

export const defaultOptions = {
    zIndexMax: 4,
}

const RootProviderOptionContext = createContext(defaultOptions)

export const useRootProviderOptions = () => {
    return useContext(RootProviderOptionContext)
}

export default RootProviderOptionContext
