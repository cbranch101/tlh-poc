import React, { useState, useMemo } from 'react'
import { useStyletron } from 'baseui/index'
import { Select } from 'baseui/select'
import { Button } from 'baseui/button'
import { Input } from 'baseui/input'
import { Textarea } from 'baseui/textarea'
import { Grid, Cell } from 'baseui/layout-grid'
import { usePlaygroundTheme, useClipboard } from './hooks'

const ThemePanel = () => {
    const {
        allThemeNames,
        currentTheme,
        semanticValueChanges,
        combineCurrentThemeWithParent,
        primitiveChanges,
        copiedFrom,
        importTheme,
        isDefaultTheme,
        createNewTheme,
        setCurrentTheme,
    } = usePlaygroundTheme()
    const [css] = useStyletron()
    const clipboard = useClipboard()
    const [newThemeName, setNewThemeName] = useState('')
    const [importedJson, setImportedJson] = useState('')

    const importedTheme = useMemo(() => {
        if (importedJson === '') {
            return null
        }
        try {
            const potentialTheme = JSON.parse(importedJson)
            if (potentialTheme.themeName) {
                return potentialTheme
            }
            const { ...cleanedTheme } = potentialTheme.theme
            return {
                ...potentialTheme,
                theme: cleanedTheme,
            }
        } catch {
            return 'error'
        }
    }, [importedJson])

    const options = allThemeNames.map((name) => ({
        id: name,
        label: name,
    }))

    const importedThemeHasError = importedTheme === 'error'
    return (
        <div data-testid="theme-panel" className={css({ marginTop: '24px' })}>
            <Grid gridColumns={3}>
                <Cell span={1}>
                    <Select
                        clearable={false}
                        onChange={({ value }) => {
                            const [{ id }] = value
                            setCurrentTheme(id)
                        }}
                        options={options}
                        value={[{ label: currentTheme, id: currentTheme }]}
                    />
                </Cell>
                <Cell span={1}>
                    <div className={css({ marginBottom: '10px' })}>
                        <Input
                            value={newThemeName}
                            placeholder="New Theme Name"
                            onChange={(e) => {
                                const { value } = e.target
                                setNewThemeName(value)
                            }}
                        />
                    </div>
                </Cell>
                {newThemeName !== '' && (
                    <Cell span={1}>
                        <Button
                            onClick={() => {
                                createNewTheme(newThemeName)
                                setNewThemeName('')
                            }}
                        >
                            Create Copied Theme
                        </Button>
                    </Cell>
                )}
            </Grid>
            {!isDefaultTheme && (
                <div className={css({ marginTop: '24px' })}>
                    <Grid gridColumns={3}>
                        <Cell span={1}>
                            <Button
                                kind="primary"
                                onClick={() => {
                                    const newTheme = {
                                        semanticValueChanges,
                                        primitiveChanges,
                                        copiedFrom,
                                        customThemeValues: {
                                            overrideKey: 'fuse',
                                        },
                                    }
                                    clipboard.copy(
                                        JSON.stringify({
                                            themeName: currentTheme,
                                            theme: newTheme,
                                        }),
                                    )
                                }}
                            >
                                Copy To Clipboard
                            </Button>
                        </Cell>
                        <Cell span={1}>
                            <Button
                                kind="secondary"
                                onClick={() => {
                                    clipboard.copy(
                                        JSON.stringify(
                                            combineCurrentThemeWithParent(),
                                        ),
                                    )
                                }}
                            >
                                Copy To Clipboard With Parent
                            </Button>
                        </Cell>
                    </Grid>
                </div>
            )}
            <div className={css({ marginTop: '24px' })}>
                <Grid gridColumns={3}>
                    <Cell span={1}>
                        <Textarea
                            value={importedJson}
                            placeholder="Paste import text here"
                            onChange={(e) => {
                                const { value } = e.target
                                setImportedJson(value)
                            }}
                        />
                    </Cell>
                    {importedTheme !== null && (
                        <Cell span={1}>
                            <Button
                                disabled={importedThemeHasError}
                                onClick={() => {
                                    importTheme(importedTheme)
                                    setImportedJson('')
                                }}
                            >
                                {importedThemeHasError
                                    ? 'Invalid Input'
                                    : 'Import Theme'}
                            </Button>
                        </Cell>
                    )}
                </Grid>
            </div>
        </div>
    )
}

export default ThemePanel
