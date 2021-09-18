import React from 'react'
import { Tag } from 'baseui/tag'

const kinds = ['neutral', 'positive', 'warning', 'negative']

const variations = kinds.map((kind) => {
    const capitalizeFirstLetter = (string) =>
        string.charAt(0).toUpperCase() + string.slice(1)
    const upperCaseKind = capitalizeFirstLetter(kind)

    return {
        span: 2,
        colors: [
            `tag${upperCaseKind}SolidBackground`,
            `tag${upperCaseKind}SolidFont`,
        ],
        render: () => {
            return <Tag kind={kind}>{`${upperCaseKind}`}</Tag>
        },
    }
})

export default variations.map((variation) => ({
    ...variation,
    component: 'Tag',
}))
