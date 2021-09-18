import React from 'react'
import { MemoryRouter } from 'react-router-dom'

const withRouter = () => (Story, { parameters }) => {
    const { url } = parameters
    const initialEntries = url && [url]
    return (
        <MemoryRouter initialEntries={initialEntries}>
            <Story />
        </MemoryRouter>
    )
}

export default withRouter
