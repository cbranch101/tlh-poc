import withTheme from './theme-builder/with-theme'
import withRouter from './with-router'
import withArgs from './with-args'

import withMockedHooks from '../with-mocked-hooks'

const getDecorators = () => [
    withArgs(),
    withRouter(),
    withTheme(),
    withMockedHooks(),
]

export default getDecorators
