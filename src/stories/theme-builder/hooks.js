import { useMemo, useCallback, useEffect } from 'react'
import { useClipboard as useClipboardBase } from 'use-clipboard-copy'
import { createLocalStorageStateHook } from 'use-local-storage-state'
import themeDefaults from '../../themes/theme-tree'
import {
    getInheritedTheme,
    convertThemeIntoFormatForBaseweb,
} from '../../themes/helpers'
import getMockableHook from '../../get-mockable-hook'

export const useClipboard = getMockableHook('useClipboard', useClipboardBase)

export const useThemeState = getMockableHook(
    'useThemeState',
    createLocalStorageStateHook('theme', {
        currentTheme: 'Core',
        themes: {},
    }),
)

const useThemeDefaults = getMockableHook('useThemeDefaults', () => {
    return themeDefaults
})

export const usePlaygroundTheme = () => {
    const themeDefaults = useThemeDefaults()
    const [themeState, setThemeState] = useThemeState()
    const { currentTheme, themes } = useMemo(() => {
        return {
            themes: {
                ...themeDefaults,
                ...themeState.themes,
            },
            currentTheme: themeState.currentTheme,
        }
    }, [themeState, themeDefaults])

    const allThemeNames = Object.keys(themes).filter((themeName) => {
        const theme = themes[themeName]
        return theme.copiedFrom ? !!themes[theme.copiedFrom] : true
    })

    const importTheme = (importedTheme) => {
        setThemeState((state) => ({
            ...state,
            themes: {
                ...state.themes,
                [importedTheme.themeName]: importedTheme.theme,
            },
        }))
    }

    const setCurrentTheme = useCallback(
        (theme) => {
            setThemeState((state) => ({
                ...state,
                currentTheme: theme,
            }))
        },
        [setThemeState],
    )

    const isValid = useMemo(() => {
        const theme = themes[currentTheme]
        return theme && theme.copiedFrom && themes[theme.copiedFrom]
    }, [currentTheme, themes])

    const fallbackTheme = useMemo(() => {
        return allThemeNames[0]
    }, [allThemeNames])

    useEffect(() => {
        if (!isValid) {
            setCurrentTheme(fallbackTheme)
        }
    }, [isValid, fallbackTheme, setCurrentTheme])

    const {
        theme,
        copiedFrom,
        primitives,
        semanticValues,
        semanticValueChanges,
        primitiveChanges,
    } = useMemo(() => {
        const foundTheme = isValid
            ? themes[currentTheme]
            : themes[fallbackTheme]
        const inheritedTheme = getInheritedTheme(foundTheme, themes)
        const theme = convertThemeIntoFormatForBaseweb(inheritedTheme, themes)
        return {
            theme,
            ...inheritedTheme,
        }
    }, [currentTheme, themes, isValid, fallbackTheme])

    const updateCurrentTheme = useCallback(
        (set) => {
            setThemeState((state) => {
                const theme = state.themes[currentTheme]
                return {
                    ...state,
                    themes: {
                        ...state.themes,
                        [currentTheme]: set(theme),
                    },
                }
            })
        },
        [currentTheme, setThemeState],
    )

    const createNewTheme = useCallback(
        (name) => {
            setThemeState((state) => {
                const { currentTheme, themes } = state
                return {
                    ...state,
                    currentTheme: name,
                    themes: {
                        ...themes,
                        [name]: {
                            copiedFrom: currentTheme,
                            primitiveChanges: {},
                            semanticValueChanges: {},
                        },
                    },
                }
            })
        },
        [setThemeState],
    )

    const setSemanticValueChanges = useCallback(
        (set) =>
            updateCurrentTheme((theme) => ({
                ...theme,
                semanticValueChanges: set(theme.semanticValueChanges),
            })),
        [updateCurrentTheme],
    )

    const deleteSemanticValue = (toDelete) => {
        setSemanticValueChanges((prevSemanticValues) =>
            Object.keys(prevSemanticValues).reduce((memo, prevValue) => {
                if (prevValue === toDelete) {
                    return memo
                }
                return {
                    ...memo,
                    [prevValue]: prevSemanticValues[prevValue],
                }
            }, {}),
        )
    }

    const changeSemanticValue = useCallback(
        (valueName, primitiveBase) => {
            const primitive = primitiveBase || semanticValues[valueName]
            setSemanticValueChanges((prevSemanticValues) => ({
                ...prevSemanticValues,
                [valueName]: primitive,
            }))
        },
        [semanticValues, setSemanticValueChanges],
    )

    const isThemeNameInDefaults = useCallback(
        (themeName) => themeDefaults[themeName],
        [themeDefaults],
    )

    const isDefaultTheme = useMemo(() => {
        return !!isThemeNameInDefaults(currentTheme)
    }, [currentTheme, isThemeNameInDefaults])

    const semanticValueOptions = useMemo(() => {
        if (isDefaultTheme) {
            return []
        }
        return Object.keys(semanticValues).map((valueName) => ({
            id: valueName,
            color:
                primitives[semanticValues[valueName]] ||
                semanticValues[valueName],
        }))
    }, [primitives, semanticValues, isDefaultTheme])

    const setPrimitives = (set) =>
        updateCurrentTheme((theme) => ({
            ...theme,
            primitiveChanges: set(theme.primitiveChanges),
        }))

    const combineCurrentThemeWithParent = () => {
        const childTheme = themes[currentTheme]
        const parentTheme = themes[childTheme.copiedFrom]
        if (!parentTheme) {
            return childTheme
        }
        return {
            ...parentTheme,
            semanticValueChanges: {
                ...parentTheme.semanticValueChanges,
                ...childTheme.semanticValueChanges,
            },
            primitiveChanges: {
                ...parentTheme.primitiveChanges,
                ...childTheme.primitiveChanges,
            },
        }
    }

    return {
        changeSemanticValue,
        deleteSemanticValue,
        semanticValueOptions,
        primitiveChanges,
        combineCurrentThemeWithParent,
        copiedFrom,
        isThemeNameInDefaults,
        semanticValues,
        importTheme,
        isDefaultTheme: !!themeDefaults[currentTheme],
        setCurrentTheme,
        currentTheme,
        setPrimitives,
        primitives,
        theme,
        themes: themeState.themes,
        createNewTheme,
        allThemeNames,
        semanticValueChanges,
    }
}
