import React from 'react'
import VariationChecker from './variation-checker'

export default {
    title: 'Test Scenarios/Theme Builder/VariationChecker',
}

export const SinglePrimaryChange = () => <VariationChecker />
SinglePrimaryChange.args = {
    themes: {
        Basic: {
            primitiveChanges: {
                primary: '#FFC043',
            },
            copiedFrom: 'Light Theme',
            customThemeValues: { overrideKey: 'fuse' },
        },
    },
    theme: 'Basic',
}
