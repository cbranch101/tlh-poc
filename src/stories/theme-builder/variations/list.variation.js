import React from 'react'
import { ListItem, ListItemLabel } from 'baseui/list'

const sharedColors = []

const DemoList = () => {
    return (
        <ul>
            <ListItem>
                <ListItemLabel>Label One</ListItemLabel>
            </ListItem>
            <ListItem>
                <ListItemLabel description="description">
                    Label Two
                </ListItemLabel>
            </ListItem>
        </ul>
    )
}

const variations = [
    {
        span: 3,
        colors: [...sharedColors, 'backgroundPrimary'],
        render: () => {
            return <DemoList />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'List',
}))
