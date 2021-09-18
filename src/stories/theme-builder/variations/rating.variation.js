import React from 'react'
import { StarRating, EmoticonRating } from 'baseui/rating'

const sharedColors = []

const variations = [
    {
        span: 2,
        colors: [...sharedColors, 'rating400', 'mono500', 'mono300', 'accent'],
        render: () => {
            return <StarRating numItems={5} value={2} />
        },
    },
    {
        span: 3,
        colors: [...sharedColors, 'rating400', 'mono500', 'accent'],
        render: () => {
            return <EmoticonRating value={2} />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Rating',
}))
