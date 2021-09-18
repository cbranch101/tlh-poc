import React from 'react'
import { SnackbarElement } from 'baseui/snackbar'

const sharedColors = ['backgroundInverseSecondary', 'contentInversePrimary']

const variations = [
    {
        span: 2,
        colors: [...sharedColors],
        render: () => {
            return <SnackbarElement message="Snackbar" />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Snackbar',
}))
