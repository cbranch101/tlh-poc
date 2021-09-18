import React from 'react'
import { ProgressBar } from 'baseui/progress-bar'

const sharedColors = []

const variations = [
    {
        span: 3,
        colors: [...sharedColors, 'progressbarTrackFill', 'accent', 'mono700'],
        render: () => {
            return <ProgressBar value={50} showLabel />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'ProgressBar',
}))
