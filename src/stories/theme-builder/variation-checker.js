import React, { useMemo, useState } from 'react'
import { Grid, Cell } from 'baseui/layout-grid'
import { Select } from 'baseui/select'
import { useStyletron } from 'baseui'
import variations from './variations'
import { usePlaygroundTheme } from './hooks'

const AllColorSet = new Set()
const AllComponentSet = new Set()

variations.forEach((variation) => {
    variation.colors.forEach((color) => AllColorSet.add(color))
    AllComponentSet.add(variation.component)
})

// const allColors = [...AllColorSet];
// const allComponents = [...AllComponentSet];

const convertArrayToOptions = (array) =>
    array.map((value) => ({
        id: value,
        label: value,
    }))

const allColorOptions = convertArrayToOptions([...AllColorSet])
const allComponentOptions = convertArrayToOptions([...AllComponentSet])

const VariationChecker = () => {
    const [css] = useStyletron()
    const { semanticValues, primitives } = usePlaygroundTheme()
    const allPrimitiveOptions = useMemo(() => {
        const PrimitiveSet = new Set()
        ;[...AllColorSet].forEach((valueName) => {
            const primitiveName = semanticValues[valueName]
            if (primitives[primitiveName]) {
                PrimitiveSet.add(semanticValues[valueName])
            }
        })
        return convertArrayToOptions([...PrimitiveSet].sort())
    }, [semanticValues, primitives])
    const [componentValue, setComponentValue] = useState([])
    const [primitiveValue, setPrimitiveValue] = useState([])
    const [colorValue, setColorValue] = useState([])
    const {
        filteredVariations,
        colorOptions,
        componentOptions,
        primitiveOptions,
    } = useMemo(() => {
        const colorsAreEmpty = colorValue.length === 0
        const componentsAreEmpty = componentValue.length === 0
        const primitivesAreEmpty = primitiveValue.length === 0
        if (colorsAreEmpty && componentsAreEmpty && primitivesAreEmpty) {
            return {
                colorOptions: allColorOptions,
                primitiveOptions: allPrimitiveOptions,
                componentOptions: allComponentOptions,
                filteredVariations: variations,
            }
        }
        const getIds = (values) => values.map((value) => value.id)
        const selectedComponents = getIds(componentValue)
        const selectedColors = getIds(colorValue)
        const selectedPrimitives = getIds(primitiveValue)
        const ColorSet = new Set()
        const ComponentSet = new Set()
        const PrimitiveSet = new Set()
        const filteredVariations = variations.filter(
            ({ colors, component }) => {
                const containsRelevantColor = colorsAreEmpty
                    ? true
                    : colors.some((color) => selectedColors.includes(color))
                const isRelevantComponent = componentsAreEmpty
                    ? true
                    : selectedComponents.includes(component)
                const containsRelevantPrimitive = primitivesAreEmpty
                    ? true
                    : colors.some((color) =>
                          selectedPrimitives.includes(semanticValues[color]),
                      )
                const isIncluded =
                    containsRelevantColor &&
                    isRelevantComponent &&
                    containsRelevantPrimitive
                if (!isIncluded) {
                    return false
                }

                ComponentSet.add(component)

                colors.forEach((color) => {
                    if (
                        primitivesAreEmpty ||
                        selectedPrimitives.includes(semanticValues[color])
                    ) {
                        ColorSet.add(color)
                    }
                    if (colorsAreEmpty || selectedColors.includes(color)) {
                        if (semanticValues[color]) {
                            PrimitiveSet.add(semanticValues[color])
                        }
                    }
                })

                return true
            },
        )

        const colorOptions =
            componentsAreEmpty && primitivesAreEmpty
                ? allColorOptions
                : convertArrayToOptions([...ColorSet])

        const componentOptions =
            colorsAreEmpty && primitivesAreEmpty
                ? allComponentOptions
                : convertArrayToOptions([...ComponentSet])

        const primitiveOptions =
            primitivesAreEmpty && colorsAreEmpty && componentsAreEmpty
                ? allPrimitiveOptions
                : convertArrayToOptions([...PrimitiveSet])

        return {
            colorOptions,
            componentOptions,
            filteredVariations,
            primitiveOptions,
        }
    }, [
        componentValue,
        colorValue,
        allPrimitiveOptions,
        semanticValues,
        primitiveValue,
    ])
    return (
        <div data-testid="variation-checker">
            <div className={css({ marginBottom: '32px' })}>
                <Grid gridColumns={12}>
                    <Cell span={3}>
                        <div data-testid="semantic-value-select">
                            <Select
                                placeholder="Select Semantic Value..."
                                value={colorValue}
                                onChange={({ value }) => {
                                    setPrimitiveValue([])
                                    setColorValue(value)
                                }}
                                multi
                                options={colorOptions}
                            />
                        </div>
                    </Cell>
                    <Cell span={3}>
                        <Select
                            placeholder="Select Component..."
                            value={componentValue}
                            multi
                            onChange={({ value }) => {
                                setComponentValue(value)
                            }}
                            options={componentOptions}
                        />
                    </Cell>
                    <Cell span={3}>
                        <Select
                            disabled={colorValue.length !== 0}
                            placeholder="Select Primitive..."
                            value={primitiveValue}
                            multi
                            onChange={({ value }) => {
                                setColorValue([])
                                setPrimitiveValue(value)
                            }}
                            options={primitiveOptions}
                        />
                    </Cell>
                </Grid>
            </div>
            <Grid gridColumns={12} gridGaps={36}>
                {filteredVariations.map(({ span, render }, index) => (
                    <Cell key={index} span={span}>
                        {render()}
                    </Cell>
                ))}
            </Grid>
        </div>
    )
}

export default VariationChecker
