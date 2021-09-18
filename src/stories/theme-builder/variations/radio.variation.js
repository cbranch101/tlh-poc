import React from 'react'
import { Radio, RadioGroup } from 'baseui/radio'

const sharedColors = ['borderSelected', 'accent']

const variations = [
    {
        span: 2,
        colors: [
            ...sharedColors,
            'tickBorder',
            'tickFill',
            'contentPrimary',
            'contentSecondary',
            'tickFillHover',
            'tickFillActive',
            'tickMarkFill',
            'tickFillSelected',
            'tickFillSelectedHover',
            'tickFillSelectedHoverActive',
        ],
        render: () => {
            return (
                <RadioGroup value="1" name="number" align="vertical">
                    <Radio value="1">Default</Radio>
                    <Radio description="Description" value="2">
                        Radio
                    </Radio>
                </RadioGroup>
            )
        },
    },
    {
        span: 2,
        colors: [
            ...sharedColors,
            'contentSecondary',
            'tickFillDisabled',
            'tickMarkFillDisabled',
            'borderSelected',
        ],
        render: () => {
            return (
                <RadioGroup disabled value="1" name="number" align="vertical">
                    <Radio value="1">Disabled</Radio>
                    <Radio value="2">Radio</Radio>
                </RadioGroup>
            )
        },
    },
    {
        span: 2,
        colors: [
            ...sharedColors,
            'tickBorderError',
            'tickFillError',
            'tickFillErrorHover',
            'tickFillErrorSelected',
            'tickFillErrorHoverActive',
            'tickFillErrorSelectedHover',
            'tickFillErrorSelectedHoverActive',
        ],
        render: () => {
            return (
                <RadioGroup error value="1" name="number" align="vertical">
                    <Radio value="1">Error</Radio>
                    <Radio value="2">Radio</Radio>
                </RadioGroup>
            )
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Radio',
}))
