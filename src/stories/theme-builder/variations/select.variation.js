import React from 'react'
import { Select } from 'baseui/select'

const sharedColors = []

const variations = [
    {
        span: 2,
        colors: [...sharedColors, 'contentPrimary'],
        render: () => {
            return <Select placeholder="Standard" />
        },
    },
    {
        span: 2,
        colors: [
            ...sharedColors,
            'contentPrimary',
            'inputTextDisabled',
            'inputFillDisabled',
        ],
        render: () => {
            return <Select disabled placeholder="Disabled" />
        },
    },
    {
        span: 2,
        colors: [...sharedColors, 'contentPrimary', 'menuFontSelected'],
        render: () => {
            return (
                <Select
                    options={[
                        { id: 'one', label: 'Value Selected' },
                        { id: 'two', label: 'Other' },
                    ]}
                    value={[{ id: 'one', label: 'Value Selected' }]}
                />
            )
        },
    },
    {
        span: 3,
        colors: [...sharedColors, 'inputTextDisabled'],
        render: () => {
            return (
                <Select
                    disabled
                    options={[{ id: 'one', label: 'Value Selected, Disabled' }]}
                    value={[{ id: 'one', label: 'Value Selected, Disabled' }]}
                />
            )
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Select',
}))
