import React from 'react'
import { Checkbox } from 'baseui/checkbox'

const sharedColors = ['accent']

const variations = [
    {
        span: 2,
        colors: [
            ...sharedColors,
            'tickFill',
            'tickMarkFill',
            'tickFillSelectedHoverActive',
            'tickFillSelectedHover',
            'tickFillSelected',
            'contentPrimary',
        ],
        render: () => {
            return <Checkbox checked>Checked</Checkbox>
        },
    },
    {
        span: 2,
        colors: [...sharedColors, 'tickBorder'],
        render: () => {
            return <Checkbox>Unchecked</Checkbox>
        },
    },
    {
        span: 2,
        colors: [...sharedColors, 'tickFillDisabled', 'tickMarkFillDisabled'],
        render: () => {
            return (
                <Checkbox disabled checked>
                    Disabled Checked
                </Checkbox>
            )
        },
    },
    {
        span: 2,
        colors: [
            ...sharedColors,
            'borderError',
            'tickFillErrorHoverActive',
            'tickFillErrorHover',
            'tickFillError',
        ],
        render: () => {
            return <Checkbox error>Error Unchecked</Checkbox>
        },
    },
    {
        span: 2,
        colors: [
            ...sharedColors,
            'tickFillErrorSelectedHoverActive',
            'tickFillErrorSelectedHover',
            'tickFillErrorSelected',
            'tickMarkFillError',
        ],
        render: () => {
            return (
                <Checkbox checked error>
                    Error Checked
                </Checkbox>
            )
        },
    },
    {
        span: 3,
        colors: [
            ...sharedColors,
            'sliderTrackFillActive',
            'sliderTrackFillHover',
            'sliderTrackFill',
            'toggleFill',
        ],
        render: () => {
            return (
                <Checkbox checkmarkType="toggle_round">
                    Toggle Round Unchecked
                </Checkbox>
            )
        },
    },
    {
        span: 3,
        colors: [...sharedColors, 'toggleFillChecked', 'toggleTrackFill'],
        render: () => {
            return (
                <Checkbox checked checkmarkType="toggle_round">
                    Toggle Round Checked
                </Checkbox>
            )
        },
    },

    {
        span: 3,
        colors: [
            ...sharedColors,
            'sliderTrackFillDisabled',
            'toggleFillDisabled',
            'toggleTrackFillDisabled',
            'contentSecondary',
        ],
        render: () => {
            return (
                <Checkbox disabled checkmarkType="toggle_round">
                    Toggle Round Disabled
                </Checkbox>
            )
        },
    },
    {
        span: 3,
        colors: [...sharedColors, 'borderError', 'tickFillError'],
        render: () => {
            return (
                <Checkbox error checked checkmarkType="toggle_round">
                    Toggle Round Error Checked
                </Checkbox>
            )
        },
    },
    {
        span: 2,
        colors: [
            ...sharedColors,
            'mono100',
            'sliderHandleInnerFillSelectedActive',
            'sliderHandleInnerFillSelectedHover',
            'sliderHandleInnerFill',
        ],
        render: () => {
            return (
                <Checkbox checked checkmarkType="toggle">
                    Toggle Checked
                </Checkbox>
            )
        },
    },
    {
        span: 2,
        colors: [...sharedColors, 'mono100', 'sliderHandleInnerFill'],
        render: () => {
            return <Checkbox checkmarkType="toggle">Toggle Unchecked</Checkbox>
        },
    },

    {
        span: 2,
        colors: [...sharedColors, 'sliderHandleInnerFillDisabled'],
        render: () => {
            return (
                <Checkbox disabled checkmarkType="toggle">
                    Toggle Disabled
                </Checkbox>
            )
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Checkbox',
}))
