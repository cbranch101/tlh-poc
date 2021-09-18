import React from 'react'
import { Breadcrumbs } from 'baseui/breadcrumbs'

const sharedColors = []

const variations = [
    {
        span: 3,
        colors: [
            ...sharedColors,
            'breadcrumbsSeparatorFill',
            'breadcrumbsText',
        ],
        render: () => {
            return (
                <Breadcrumbs>
                    <span>Breadcrumbs</span>
                    <span>Step Two</span>
                </Breadcrumbs>
            )
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Breadcrumbs',
}))
