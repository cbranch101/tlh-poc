import React from 'react'
import { StyledLink } from 'baseui/link'

const sharedColors = []

const variations = [
    {
        span: 1,
        colors: [
            ...sharedColors,
            'linkText',
            'linkHover',
            'linkVisited',
            'linkActive',
            'accent',
        ],
        render: () => {
            return <StyledLink href="https://baseweb.design">Link</StyledLink>
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Link',
}))
