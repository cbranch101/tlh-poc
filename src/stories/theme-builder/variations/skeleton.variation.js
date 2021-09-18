import React from 'react'
import { Skeleton } from 'baseui/skeleton'

const sharedColors = ['backgroundTertiary', 'backgroundSecondary']

const variations = [
    {
        span: 2,
        colors: [...sharedColors],
        render: () => {
            return <Skeleton height="100px" width="200px" />
        },
    },
    {
        span: 2,
        colors: [...sharedColors],
        render: () => {
            return <Skeleton animation height="100px" width="200px" />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Skeleton',
}))
