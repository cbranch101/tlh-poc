import { createContext, useContext } from 'react'
const ArgsContext = createContext({})
export const Provider = ArgsContext.Provider

const useArgs = () => {
    const args = useContext(ArgsContext)
    return args
}

export default useArgs
