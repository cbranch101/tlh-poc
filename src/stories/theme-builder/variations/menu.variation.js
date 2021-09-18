import React from 'react'
import { StatefulMenu } from 'baseui/menu'

const ITEMS = [
    { label: 'Item One' },
    { label: 'Item Two' },
    { label: 'Disabled', disabled: true },
    { label: 'Highlighted', isHighlighted: true },
]

const GROUPED_ITEMS = {
    'Group One': [{ label: 'Item One' }],
    'Group Two': [{ label: 'Item Two' }],
}

const variations = [
    {
        span: 2,
        colors: [
            'accent',
            'menuFill',
            'menuFillHover',
            'menuFontDisabled',
            'menuFontDefault',
            'menuFontHighlighted',
            'menuFontSelected',
        ],
        render: () => {
            return <StatefulMenu items={ITEMS} />
        },
    },
    {
        span: 2,
        colors: ['colorPrimary'],
        render: () => {
            return <StatefulMenu items={GROUPED_ITEMS} />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Menu',
}))
