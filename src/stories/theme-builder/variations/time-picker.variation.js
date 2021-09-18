import React from 'react'
import { TimePicker } from 'baseui/timepicker'

const sharedColors = []

const variations = [
    {
        span: 3,
        colors: [...sharedColors],
        render: () => {
            return <TimePicker value={new Date()} />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'TimePicker',
}))
