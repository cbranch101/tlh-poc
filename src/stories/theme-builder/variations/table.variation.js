import React from 'react'
import {
    StyledTable,
    StyledHead,
    StyledBody,
    StyledRow,
    StyledCell,
    StyledHeadCell,
    SortableHeadCell,
} from 'baseui/table'

const DATA = [
    ['Sarah Brown', 31],
    ['Jane Smith', 32],
    ['Joe Black', 33],
]

const sharedColors = []

const CustomTable = () => {
    return (
        <StyledTable>
            <StyledHead>
                <SortableHeadCell title="Name" direction="ASC" />
                <StyledHeadCell disabled>Age</StyledHeadCell>
            </StyledHead>
            <StyledBody>
                {DATA.map((row, index) => (
                    <StyledRow key={index}>
                        {row.map((cell, cellIndex) => (
                            <StyledCell $striped={index === 1} key={cellIndex}>
                                {cell}
                            </StyledCell>
                        ))}
                    </StyledRow>
                ))}
            </StyledBody>
        </StyledTable>
    )
}

const variations = [
    {
        span: 8,
        colors: [
            ...sharedColors,
            'tableBackground',
            'tableStripedBackground',
            'tableHeadBackgroundColor',
            'tableHeadText',
            'contentPrimary',
            'mono500',
        ],
        render: () => {
            return <CustomTable />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Table',
}))
