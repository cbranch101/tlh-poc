import React from 'react'
import { BaseProvider, LightTheme } from 'baseui'
import { Provider as StyletronProvider } from 'styletron-react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { BreakpointProvider } from './use-breakpoint'
import { getZIndexMap } from './hooks'
import RootProviderOptionsContext, {
    defaultOptions,
} from './root-provider-options-context'

console.log(RootProviderOptionsContext.Provider)

const RootProviderOptionsProvider = RootProviderOptionsContext.Provider

const baseEngine = new Styletron({})

const getRootProvider = (options = {}) => {
    const {
        engineOptions,
        zIndexMax = defaultOptions.zIndexMax,
        useLocation,
        useHistory,
    } = options
    const zIndexMap = getZIndexMap(zIndexMax)
    const getEngine = () => {
        if (!engineOptions) {
            return baseEngine
        }
        const {
            engine: Engine = Styletron,
            ...remainingEngineOptions
        } = engineOptions
        return new Engine(remainingEngineOptions)
    }

    const engine = getEngine()

    const getThemeObject = (theme) => {
        if (typeof theme === 'string') {
            // note, you should only pass a string in production
            // if you pass a string while running in storybook
            // the themes won't actually exist yet
            return require(`./themes/${theme}.json`)
        }
        return theme
    }

    const RootProvider = ({ theme = LightTheme, children }) => {
        return (
            <StyletronProvider value={engine}>
                <BaseProvider
                    theme={getThemeObject(theme)}
                    zIndex={zIndexMap.layerManager}
                >
                    <BreakpointProvider>
                        <RootProviderOptionsProvider
                            value={{
                                useLocation,
                                useHistory,
                                zIndexMax,
                                styletron: engine,
                            }}
                        >
                            {children}
                        </RootProviderOptionsProvider>
                    </BreakpointProvider>
                </BaseProvider>
            </StyletronProvider>
        )
    }
    return RootProvider
}
export default getRootProvider
