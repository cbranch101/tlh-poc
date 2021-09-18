import React from 'react'
import { Tab, Tabs } from 'baseui/tabs'

const sharedColors = []

const variations = [
    {
        span: 3,
        colors: [
            ...sharedColors,
            'contentPrimary',
            'tabColor',
            'primary',
            'accent',
            'tabBarFill',
        ],
        render: () => {
            return (
                <Tabs activeKey="0">
                    <Tab title="Metrics" />
                    <Tab title="Sales Item" />
                    <Tab title="Promotion" />
                </Tabs>
            )
        },
    },
    {
        span: 2,
        colors: [
            ...sharedColors,
            'contentPrimary',
            'tabColor',
            'accent',
            'tabBarFill',
        ],
        render: () => {
            return (
                <Tabs activeKey="0" orientation="vertical">
                    <Tab title="Metrics" />
                    <Tab title="Sales Item" />
                    <Tab title="Promotion" />
                </Tabs>
            )
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Tabs',
}))
