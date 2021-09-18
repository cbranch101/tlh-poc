import React from 'react'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'

const sharedColors = ['contentSecondary']

const variations = [
    {
        span: 3,
        colors: [...sharedColors, 'contentPrimary'],
        render: () => {
            return (
                <FormControl label="Form Control" caption="normal">
                    <Input />
                </FormControl>
            )
        },
    },
    {
        span: 3,
        colors: [...sharedColors],
        render: () => {
            return (
                <FormControl disabled label="Form Control" caption="disabled">
                    <Input disabled />
                </FormControl>
            )
        },
    },
    {
        span: 3,
        colors: [...sharedColors, 'negative400'],
        render: () => {
            return (
                <FormControl error="error" disabled label="Form Control">
                    <Input disabled />
                </FormControl>
            )
        },
    },
    {
        span: 3,
        colors: [...sharedColors, 'negative400'],
        render: () => {
            return (
                <FormControl positive="positive" disabled label="Form Control">
                    <Input disabled />
                </FormControl>
            )
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'FormControl',
}))
