import React from 'react'
import { Textarea } from 'baseui/textarea'

const sharedColors = []

const variations = [
    {
        span: 3,
        colors: [...sharedColors],
        render: () => {
            return <Textarea value="Basic usage" />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Textarea',
}))
