import React from 'react'
import { addons, types } from '@storybook/addons'
import { AddonPanel } from '@storybook/components' //eslint-disable-line import/no-extraneous-dependencies
import { LightTheme } from 'baseui'
import getRootProvider from '../../get-root-provider'
import ThemePanel from './theme-panel'
import ColorScalesPanel from './color-scales-panel'
import SemanticValuesPanel from './semantic-values-panel'

const RootProvider = getRootProvider()

addons.register('baseweb-playground', () => {
    addons.add('baseweb-playground/theme-panel', {
        type: types.PANEL,
        title: 'Theme',
        render: ({ active, key }) => (
            <AddonPanel key={key} active={active}>
                <RootProvider theme={LightTheme}>
                    <ThemePanel />
                </RootProvider>
            </AddonPanel>
        ),
    })

    addons.add('baseweb-playground/color-scale-panel', {
        type: types.PANEL,
        title: 'Scales',
        render: ({ active, key }) => (
            <AddonPanel key={key} active={active}>
                <RootProvider theme={LightTheme}>
                    <ColorScalesPanel />
                </RootProvider>
            </AddonPanel>
        ),
    })
    addons.add('baseweb-playground/semantic-values', {
        type: types.PANEL,
        title: 'Mapped Colors',
        render: ({ active, key }) => (
            <AddonPanel key={key} active={active}>
                <RootProvider theme={LightTheme}>
                    <SemanticValuesPanel />
                </RootProvider>
            </AddonPanel>
        ),
    })
})
