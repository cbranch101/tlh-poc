import React from 'react'
import { Input } from 'baseui/input'

const sharedColors = ['contentPrimary', 'contentInversePrimary', 'borderFocus']
const variations = [
    {
        span: 3,
        colors: [...sharedColors, 'inputPlaceholder', 'inputFill'],
        render: () => <Input placeholder="Standard" />,
    },
    {
        span: 3,
        colors: [...sharedColors, 'inputFill'],
        render: () => (
            <Input
                startEnhancer="@"
                value="Entered Text"
                placeholder="Standard"
            />
        ),
    },
    {
        span: 3,
        colors: [...sharedColors, 'inputBorderError', 'inputFillError'],
        render: () => <Input startEnhancer="@" placeholder="Error" error />,
    },
    {
        span: 3,
        colors: [...sharedColors, 'inputBorderPositive', 'inputFillPositive'],
        render: () => (
            <Input startEnhancer="@" placeholder="Positive" positive />
        ),
    },
    {
        span: 3,
        colors: [
            ...sharedColors,
            'inputEnhancerTextDisabled',
            'inputEnhancerFillDisabled',
            'inputPlaceholderDisabled',
        ],
        render: () => (
            <Input disabled startEnhancer="@" placeholder="Disabled" />
        ),
    },
    {
        span: 3,
        colors: [...sharedColors, 'contentSecondary'],
        render: () => <Input disabled value="Disabled, with Text entered" />,
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Input',
}))
