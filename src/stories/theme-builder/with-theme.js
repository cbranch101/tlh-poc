import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { buildThemesByName } from '../../themes/helpers'
import getRootProvider from '../../get-root-provider'
import { usePlaygroundTheme } from './hooks'

const defaultRootProviderOptions = { useLocation, useHistory }

const BaseRootProvider = getRootProvider(defaultRootProviderOptions)

export const PlaygroundThemeProvider = ({ onChange, children }) => {
    const { theme } = usePlaygroundTheme()
    useEffect(() => {
        if (onChange) {
            onChange(theme)
        }
    }, [theme, onChange])

    return children(theme)
}

const withTheme = (options = {}) => (Story, { parameters = {} }) => {
    const {
        disableRootProvider = false,
        rootProviderOptions,
        theme,
    } = parameters
    const { onChange } = options

    const getCorrectRootProvider = () => {
        if (!rootProviderOptions) {
            return BaseRootProvider
        }
        return getRootProvider({
            ...defaultRootProviderOptions,
            ...rootProviderOptions,
        })
    }

    if (disableRootProvider) {
        return <Story />
    }

    const RootProvider = getCorrectRootProvider()

    const getThemeObject = () => {
        if (!theme) {
            return undefined
        }
        if (typeof theme === 'string') {
            const themesByName = buildThemesByName()
            return themesByName[theme]
        }
        return theme
    }

    const themeObject = getThemeObject()

    if (themeObject) {
        return <RootProvider theme={themeObject}>{<Story />}</RootProvider>
    }

    return (
        <PlaygroundThemeProvider onChange={onChange}>
            {(playgroundTheme) => (
                <RootProvider theme={playgroundTheme}>{<Story />}</RootProvider>
            )}
        </PlaygroundThemeProvider>
    )
}

export default withTheme
