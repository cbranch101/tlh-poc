import React from 'react'
import { StatelessAccordion, Panel } from 'baseui/accordion'

const sharedColors = []

const Demo = () => {
    const [expanded, setExpanded] = React.useState(['P1'])
    return (
        <StatelessAccordion
            expanded={expanded}
            onChange={({ expanded }) => {
                setExpanded(expanded)
            }}
        >
            <Panel key="P1" title="Panel 1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Panel>
            <Panel key="P2" title="Panel 2">
                Quisque luctus eu sem et pharetra.
            </Panel>
            <Panel key="P3" title="Panel 3">
                Proin egestas dui sed semper iaculis.
            </Panel>
        </StatelessAccordion>
    )
}

const variations = [
    {
        span: 4,
        colors: [
            ...sharedColors,
            'contentPrimary',
            'listHeaderFill',
            'mono500',
            'mono400',
            'accent',
            'primary',
            'listBodyFill',
            'border',
        ],
        render: () => {
            return <Demo />
        },
    },
]

export default variations.map((variation) => ({
    ...variation,
    component: 'Accordion',
}))
