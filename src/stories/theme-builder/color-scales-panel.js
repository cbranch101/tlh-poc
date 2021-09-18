import React, { useState, useEffect, Fragment } from 'react'
import { SketchPicker } from 'react-color'
import { useStyletron } from 'baseui'
import { COLOR_TYPES, STEPS } from '../../themes/config'
import { LabelMedium } from 'baseui/typography'
import { Grid, Cell } from 'baseui/layout-grid'
import { StatefulPopover } from 'baseui/popover'
import { usePlaygroundTheme } from './hooks'

const getColorsForScale = (type) => {
    return STEPS.map((step) => `${type}${step}`)
}

const Inner = ({ children }) => {
    const [css] = useStyletron()
    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            })}
        >
            {children}
        </div>
    )
}

const Swatch = ({ color, onChange, colors, disabled }) => {
    const [localColor, setLocalColor] = useState(color)
    useEffect(() => {
        setLocalColor(color)
    }, [color])
    const [css] = useStyletron()

    const renderContent = () => {
        const swatchContent = (
            <div
                data-testid="swatch"
                className={css({
                    background: localColor,
                    height: '30px',
                    width: '30px',
                    borderRadius: '4px',
                })}
            />
        )
        if (disabled) {
            return swatchContent
        }

        return (
            <StatefulPopover
                content={
                    <div data-testid="color-picker">
                        <SketchPicker
                            width={300}
                            presetColors={colors}
                            color={localColor}
                            onChange={(color) => {
                                setLocalColor(color.hex)
                            }}
                            onChangeComplete={onChange}
                        />
                    </div>
                }
            >
                {swatchContent}
            </StatefulPopover>
        )
    }

    return (
        <Cell span={1}>
            <Inner>{renderContent()}</Inner>
        </Cell>
    )
}

const columnNames = [
    'A',
    'B',
    'main',
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

const monoScale = [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '1000',
]

export default () => {
    const { theme, setPrimitives, isDefaultTheme } = usePlaygroundTheme()
    const [css] = useStyletron()
    return (
        <div
            data-testid="color-scales-panel"
            className={css({ marginTop: '32px' })}
        >
            <div className={css({ maxWidth: '700px', marginBottom: '15px' })}>
                <Grid gridGutters={8} gridColumns={15}>
                    <Cell span={2} />
                    {columnNames.map((name) => (
                        <Cell key={name} span={1}>
                            <Inner>{name}</Inner>
                        </Cell>
                    ))}
                </Grid>
            </div>
            {COLOR_TYPES.map((type) => {
                const baseColors = [
                    theme.colors[type],
                    ...getColorsForScale(type).map(
                        (colorName) =>
                            theme.colors[colorName] || theme.colors.mono100,
                    ),
                ]

                const colors =
                    type === 'primary'
                        ? [
                              theme.colors.primaryA,
                              theme.colors.primaryB,
                              ...baseColors,
                          ]
                        : baseColors
                return (
                    <div
                        key={type}
                        className={css({
                            maxWidth: '700px',
                            marginBottom: '15px',
                        })}
                    >
                        <Grid gridGutters={8} gridColumns={15}>
                            <Cell span={2}>
                                <LabelMedium paddingTop="6px">
                                    {type}
                                </LabelMedium>
                            </Cell>
                            {type === 'primary' ? (
                                <Fragment>
                                    <Swatch
                                        disabled={isDefaultTheme}
                                        colors={colors}
                                        color={theme.colors.primaryA}
                                        onChange={({ hex }) =>
                                            setPrimitives((prevPrimitives) => ({
                                                ...prevPrimitives,
                                                primaryA: hex,
                                            }))
                                        }
                                    />
                                    <Swatch
                                        disabled={isDefaultTheme}
                                        colors={colors}
                                        color={theme.colors.primaryB}
                                        onChange={({ hex }) =>
                                            setPrimitives((prevPrimitives) => ({
                                                ...prevPrimitives,
                                                primaryB: hex,
                                            }))
                                        }
                                    />
                                </Fragment>
                            ) : (
                                <Cell span={2} />
                            )}
                            <Swatch
                                disabled={isDefaultTheme}
                                colors={colors}
                                color={theme.colors[type]}
                                onChange={({ hex }) =>
                                    setPrimitives((prevPrimitives) => ({
                                        ...prevPrimitives,
                                        [type]: hex,
                                    }))
                                }
                            />
                            {getColorsForScale(type).map((colorName) => {
                                return (
                                    <Swatch
                                        disabled={isDefaultTheme}
                                        key={colorName}
                                        colors={colors}
                                        color={
                                            theme.colors[colorName] ||
                                            theme.colors.mono100
                                        }
                                        onChange={({ hex }) =>
                                            setPrimitives((prevPrimitives) => ({
                                                ...prevPrimitives,
                                                [colorName]: hex,
                                            }))
                                        }
                                    />
                                )
                            })}
                        </Grid>
                    </div>
                )
            })}
            <div
                className={css({
                    maxWidth: '700px',
                    marginTop: '30px',
                    marginBottom: '15px',
                })}
            >
                <Grid gridGutters={8} gridColumns={15}>
                    <Cell span={3} />
                    {monoScale.map((name) => (
                        <Cell key={name} span={1}>
                            <Inner>{name}</Inner>
                        </Cell>
                    ))}
                </Grid>
            </div>
            <div className={css({ maxWidth: '700px', marginBottom: '15px' })}>
                <Grid gridGutters={8} gridColumns={15}>
                    <Cell span={2}>
                        <LabelMedium paddingTop="6px">Mono</LabelMedium>
                    </Cell>
                    <Cell span={1} />
                    {monoScale.map((name) => (
                        <Swatch
                            disabled={isDefaultTheme}
                            colors={monoScale.map(
                                (name) => theme.colors[`mono${name}`],
                            )}
                            key={name}
                            color={theme.colors[`mono${name}`]}
                            onChange={({ hex }) =>
                                setPrimitives((prevPrimitives) => ({
                                    ...prevPrimitives,
                                    [`mono${name}`]: hex,
                                }))
                            }
                        />
                    ))}
                </Grid>
            </div>
        </div>
    )
}
