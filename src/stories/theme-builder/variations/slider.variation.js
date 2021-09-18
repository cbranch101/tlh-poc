import React from 'react'
import { Slider } from 'baseui/slider'

const sharedColors = []

const variations = [
    {
        span: 3,
        colors: [
            ...sharedColors,
            'primary',
            'mono400',
            'contentPrimary',
            'mono100',
            'accent',
        ],
        render: () => {
            return <Slider value={[50]} max={100} />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Slider',
}))
