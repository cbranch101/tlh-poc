import React, { useMemo } from 'react'
import { Grid, Cell } from 'baseui/layout-grid'
import { useStyletron } from 'baseui'
import { LabelMedium } from 'baseui/typography'
import { LIGHT_THEME_SEMANTIC_VALUES } from '../../themes/config'
import semanticValueDefaults from '../../themes/semantic-value-defaults'
import { usePlaygroundTheme } from './hooks'

const ColorSwatch = ({ color }) => {
    const [css, theme] = useStyletron()
    return (
        <div
            className={css({
                width: theme.sizing.scale900,
                height: theme.sizing.scale900,
                display: 'inline-block',
                backgroundColor: color,
                verticalAlign: 'baseline',
                borderRadius: '4px',
            })}
        />
    )
}

const SemanticValueDisplay = () => {
    const { semanticValues, primitives } = usePlaygroundTheme()
    const displayItems = useMemo(() => {
        const sortedKeys = Object.keys(semanticValues).sort()
        return sortedKeys
            .map((valueName) => {
                const lightThemeValue = LIGHT_THEME_SEMANTIC_VALUES[valueName]
                const semanticValue = semanticValues[valueName]
                if (
                    lightThemeValue &&
                    semanticValue === lightThemeValue &&
                    !semanticValueDefaults[valueName]
                ) {
                    return null
                }
                return {
                    name: valueName,
                    primitiveName: semanticValue,
                    color: primitives[semanticValue],
                }
            })
            .filter((value) => !!value)
    }, [semanticValues, primitives])

    const [css] = useStyletron()
    return (
        <div className={css({ marginTop: '36px' })}>
            <Grid gridColumns={[3, 6, 12]} gridGaps={36}>
                {displayItems.map(({ name, primitiveName, color }) => {
                    return (
                        <Cell span={3} key={name}>
                            <div
                                className={css({
                                    display: 'flex',
                                    padding: '10px',
                                    flexDirection: 'column',
                                    borderTopColor: 'black',
                                    borderBottomColor: 'black',
                                    borderRightColor: 'black',
                                    borderLeftColor: 'black',
                                    borderTopStyle: 'solid',
                                    borderRadius: '4px',
                                    borderBottomStyle: 'solid',
                                    borderRightStyle: 'solid',
                                    borderLeftStyle: 'solid',
                                    borderTopWidth: '1px',
                                    borderBottomWidth: '1px',
                                    borderRightWidth: '1px',
                                    borderLeftWidth: '1px',
                                })}
                            >
                                <LabelMedium>{name}</LabelMedium>
                                <div
                                    className={css({
                                        marginTop: '15px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    })}
                                >
                                    <LabelMedium>{primitiveName}</LabelMedium>
                                    <ColorSwatch color={color} />
                                </div>
                            </div>
                        </Cell>
                    )
                })}
            </Grid>
        </div>
    )
}

export default SemanticValueDisplay
