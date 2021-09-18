import React from 'react'
import { Pagination } from 'baseui/pagination'

const sharedColors = []

const variations = [
    {
        span: 12,
        colors: [...sharedColors, 'accent', 'backgroundInversePrimary'],
        render: () => {
            return <Pagination numPages={20} currentPage={1} />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Pagination',
}))
