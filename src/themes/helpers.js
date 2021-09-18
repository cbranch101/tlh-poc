import { lightThemePrimitives, createTheme } from 'baseui'
import themeDefaults from './theme-tree'
import { LIGHT_THEME_SEMANTIC_VALUES } from './config'

export const getInheritedTheme = (theme, themes) => {
    if (!theme.copiedFrom) {
        return {
            ...theme,
            primitives: lightThemePrimitives,
            semanticValues: {
                ...LIGHT_THEME_SEMANTIC_VALUES,
                ...(theme.semanticValueChanges || {}),
            },
        }
    }

    const parent = getInheritedTheme(themes[theme.copiedFrom], themes)
    return {
        ...theme,
        semanticValues: {
            ...parent.semanticValues,
            ...theme.semanticValueChanges,
        },
        customThemeValues: {
            ...(parent.customThemeValues || {}),
            ...theme.customThemeValues,
        },
        primitives: {
            ...parent.primitives,
            ...theme.primitiveChanges,
        },
    }
}

const applyNewBoldFontWeightToTheme = (theme, boldWeight) => {
    const typography = Object.keys(theme.typography).reduce((memo, key) => {
        const value = theme.typography[key]
        const { fontWeight } = value
        if (!fontWeight) {
            return memo
        }
        return {
            [key]: {
                ...value,
                fontWeight: fontWeight === 500 ? boldWeight : fontWeight,
            },
            ...memo,
        }
    }, {})
    return {
        ...theme,
        typography,
    }
}

export const convertThemeIntoFormatForBaseweb = (theme, themes) => {
    const inheritedTheme = getInheritedTheme(theme, themes)

    const { semanticValues, primitives, customThemeValues } = inheritedTheme

    const overrides = Object.keys(semanticValues).reduce(
        (memo, semanticValue) => {
            const primitive = semanticValues[semanticValue]
            const colorValue = primitives[primitive]
            if (!colorValue) {
                return {
                    ...memo,
                    [semanticValue]: primitive,
                }
            }

            return {
                ...memo,
                [semanticValue]: colorValue,
            }
        },
        {},
    )

    const createdTheme = createTheme(primitives, {
        ...customThemeValues,
        colors: overrides,
    })

    const { boldWeight } = customThemeValues
    return boldWeight
        ? applyNewBoldFontWeightToTheme(createdTheme, boldWeight)
        : createdTheme
}

export const buildThemesByName = () => {
    return Object.keys(themeDefaults).reduce((memo, themeName) => {
        const theme = themeDefaults[themeName]
        const { fileName } = theme
        if (!fileName) {
            return memo
        }
        return {
            ...memo,
            [themeName]: {
                ...convertThemeIntoFormatForBaseweb(theme, themeDefaults),
                fileName,
            },
        }
    }, {})
}
