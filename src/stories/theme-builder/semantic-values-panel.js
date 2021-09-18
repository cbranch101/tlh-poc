import React, { useMemo, useState } from 'react'
import { Select } from 'baseui/select'
import { styled, useStyletron } from 'baseui'
import { Button } from 'baseui/button'
import { ListItem, ListItemLabel } from 'baseui/list'
import { Delete } from 'baseui/icon'
import { usePlaygroundTheme } from './hooks'
import SemanticValueDisplay from './semantic-values-display'

const ColorSwatch = styled('div', (props) => {
    return {
        width: props.$theme.sizing.scale600,
        height: props.$theme.sizing.scale600,
        marginRight: props.$theme.sizing.scale200,
        display: 'inline-block',
        backgroundColor: props.$color,
        verticalAlign: 'baseline',
    }
})
const getLabel = ({ option }) => {
    return (
        <React.Fragment>
            <ColorSwatch $color={option.color} />
            {option.id}
        </React.Fragment>
    )
}

const SemanticValueSelect = ({ onChange, options, disabled }) => {
    const [css] = useStyletron()
    const [inputValue, setInputValue] = useState(null)
    const filteredOptions = useMemo(() => {
        if (!inputValue) {
            return []
        }
        return options.filter((option) =>
            option.id.toLowerCase().includes(inputValue.toLowerCase()),
        )
    }, [options, inputValue])
    return (
        <div className={css({ width: '350px' })}>
            <Select
                disabled={disabled}
                labelKey="id"
                valueKey="id"
                type="search"
                placeholder="Add Semantic Value"
                options={filteredOptions}
                getOptionLabel={getLabel}
                getValueLabel={getLabel}
                onInputChange={(event) => {
                    const { value } = event.target
                    setInputValue(value)
                }}
                onChange={({ value }) => {
                    const [option] = value
                    onChange(option)
                    setInputValue(null)
                }}
                value={null}
            />
        </div>
    )
}

const ColorSelect = ({ value, options, onChange }) => {
    const [css] = useStyletron()
    return (
        <div className={css({ width: '350px' })}>
            <Select
                options={options}
                placeholder="Select Primitive"
                labelKey="id"
                valueKey="id"
                clearable={false}
                onChange={({ value }) => {
                    const [option] = value
                    onChange(option)
                }}
                value={value}
                getOptionLabel={getLabel}
                getValueLabel={getLabel}
            />
        </div>
    )
}

const SemanticValueEditor = () => {
    const {
        theme,
        semanticValueChanges,
        semanticValueOptions,
        changeSemanticValue,
        deleteSemanticValue,
        primitives,
    } = usePlaygroundTheme()
    const colorOptions = useMemo(() => {
        const baseOptions = Object.keys(primitives).map((primitiveName) => ({
            id: primitiveName,
            color: theme.colors[primitiveName],
        }))
        return [
            {
                id: 'transparent',
                color: undefined,
            },
            ...baseOptions,
        ]
    }, [primitives, theme])

    return (
        <div>
            <ul>
                {Object.keys(semanticValueChanges).map((semanticValue) => {
                    const getValue = () => {
                        const primitiveName =
                            semanticValueChanges[semanticValue]
                        return [
                            {
                                id: primitiveName,
                                color: theme.colors[primitiveName],
                            },
                        ]
                    }
                    return (
                        <ListItem key={semanticValue}>
                            <ListItemLabel>{semanticValue}</ListItemLabel>
                            <ColorSelect
                                value={getValue()}
                                options={colorOptions}
                                semanticValue={semanticValue}
                                onChange={({ id: primitiveName }) => {
                                    changeSemanticValue(
                                        semanticValue,
                                        primitiveName,
                                    )
                                }}
                            />
                            <Button size="small" shape="round">
                                <Delete
                                    onClick={() =>
                                        deleteSemanticValue(semanticValue)
                                    }
                                />
                            </Button>
                        </ListItem>
                    )
                })}
            </ul>
            <SemanticValueSelect
                options={semanticValueOptions}
                primitives={primitives}
                onChange={({ id: semanticValue }) => {
                    changeSemanticValue(semanticValue)
                }}
            />
        </div>
    )
}

const SemanticValuesPanel = () => {
    const { isDefaultTheme } = usePlaygroundTheme()
    if (!isDefaultTheme) {
        return <SemanticValueEditor />
    }
    return <SemanticValueDisplay />
}

export default SemanticValuesPanel
