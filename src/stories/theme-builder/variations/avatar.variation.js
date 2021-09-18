import React from 'react'
import { Avatar } from 'baseui/avatar'

const sharedColors = []

const variations = [
    {
        span: 1,
        colors: [...sharedColors, 'avatarBackgroundColor', 'mono100'],
        render: () => {
            return <Avatar name="Han Solo" />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Avatar',
}))
