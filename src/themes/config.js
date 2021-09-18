import { lightThemePrimitives, createTheme } from 'baseui'
import semanticValueDefaults from './semantic-value-defaults'

export const COLOR_TYPES = [
    'primary',
    'accent',
    'negative',
    'warning',
    'positive',
]
export const STEPS = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
]

const getLightThemeSemanticValues = () => {
    const mappedPrimitives = Object.keys(lightThemePrimitives).reduce(
        (memo, key) => {
            return { ...memo, [key]: key }
        },
        {},
    )
    const dummyTheme = createTheme(mappedPrimitives)

    const allColors = {
        ...dummyTheme.colors,
        ...semanticValueDefaults,
    }
    return Object.keys(allColors).reduce((memo, key) => {
        if (mappedPrimitives[key]) {
            return memo
        }
        return {
            ...memo,
            [key]: allColors[key],
        }
    }, {})
}

export const LIGHT_THEME_SEMANTIC_VALUES = getLightThemeSemanticValues()

export const SEMANTIC_VALUE_OPTIONS = Object.keys({
    ...LIGHT_THEME_SEMANTIC_VALUES,
}).map((valueName) => ({
    id: valueName,
    color:
        lightThemePrimitives[valueName] ||
        LIGHT_THEME_SEMANTIC_VALUES[valueName],
}))
