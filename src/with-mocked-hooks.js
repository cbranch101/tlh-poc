import React, { useState } from 'react'
import themeDefaults from './themes/theme-tree'
import getMockedHandler from '../src/__tests__/get-mocked-handler'
import { MockedHookContext } from './get-mockable-hook'
import api from './api'

const { Provider } = MockedHookContext

const testThemeDefaults = {
    'Light Theme': themeDefaults['Light Theme'],
    Core: themeDefaults.Core,
}

// const byString = (o, s) => {
//     s = s.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
//     s = s.replace(/^\./, '') // strip a leading dot
//     return s.split('.').reduce((res, prop) => res[prop], o)
// }

const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const getMockedAPIFunctions = (returnValuesByFunctionName) => {
    const {
        DELAY_AMOUNT: delayAmountBase = 0,
        ...remainingReturnValues
    } = returnValuesByFunctionName
    return Object.keys(remainingReturnValues).reduce((memo, functionName) => {
        const delayAmount =
            typeof delayAmountBase === 'object'
                ? delayAmountBase[functionName] || 0
                : delayAmountBase
        const returnValue = returnValuesByFunctionName[functionName]
        return {
            ...memo,
            [functionName]: async (...args) => {
                await delay(delayAmount)
                const output =
                    typeof returnValue === 'function'
                        ? returnValue(...args)
                        : returnValue
                if (typeof output === 'object' && !!output.MOCK_ERROR) {
                    throw new Error(output.MOCK_ERROR)
                }
                return output
            },
        }
    }, {})
}

const hookMap = {
    useClipboard: ({ options }) => {
        if (options.isTest) {
            return false
        }
        return {
            handlers: {
                onCopyToClipboard: 'copy',
            },
            useHook: () => {
                return {
                    copy: () => {},
                }
            },
        }
    },
    useAPI: ({ args }) => {
        const { api: apiDetails } = args
        if (!apiDetails) {
            return false
        }

        const mockedAPI = getMockedAPIFunctions(apiDetails)
        const handlers = Object.keys(api).reduce(
            (memo, name) => ({
                ...memo,
                [name]: name,
            }),
            {},
        )
        return {
            handlers,
            useHook: () => {
                return {
                    ...api,
                    ...mockedAPI,
                }
            },
        }
    },

    useThemeState: ({ args }) => {
        if (args.theme || args.themes) {
            return false
        }
        const { theme = 'Core', themes = {} } = args
        return {
            handlers: {
                onSetThemeState: 1,
            },
            useHook: () => {
                return useState(() => ({
                    currentTheme: theme,
                    themes,
                }))
            },
        }
    },
    useThemeDefaults: ({ args, options }) => {
        if (!options.isTest) {
            return false
        }
        const { themeDefaults = testThemeDefaults } = args
        return {
            useHook: () => {
                return themeDefaults
            },
        }
    },
}

const getMockedHooks = ({ options = {}, args = {} }) => {
    const { handlers: neededHandlers = [] } = options
    return Object.keys(hookMap).reduce((memo, hookName) => {
        const hookDetails = hookMap[hookName]({
            options,
            args,
        })

        if (!hookDetails) {
            return memo
        }

        const { useHook, handlers: handlersForHook = {} } = hookDetails

        if (!neededHandlers && !handlersForHook) {
            return {
                ...memo,
                [hookName]: useHook,
            }
        }

        const useMockedHook = (...args) => {
            const returnValue = useHook(...args)
            const isArrayReturned = Array.isArray(returnValue)
            return Object.keys(handlersForHook)
                .filter((handler) => neededHandlers.includes(handler))
                .reduce((memo, handlerName) => {
                    const mockedHandler = getMockedHandler(handlerName)
                    const lookupKey = handlersForHook[handlerName]
                    const wrappedFunction = async (...handlerArgs) => {
                        const output = await returnValue[lookupKey](
                            ...handlerArgs,
                        )
                        mockedHandler(...handlerArgs)
                        return output
                    }

                    if (isArrayReturned) {
                        memo[lookupKey] = wrappedFunction
                        return memo
                    }

                    return {
                        ...memo,
                        [lookupKey]: wrappedFunction,
                    }
                }, returnValue)
        }

        return {
            ...memo,
            [hookName]: useMockedHook,
        }
    }, {})
}

export default (options = {}) => (Story, { args = {} }) => {
    const mockedHooks = getMockedHooks({
        options,
        args,
    })
    return (
        <Provider value={mockedHooks}>
            <Story />
        </Provider>
    )
}
