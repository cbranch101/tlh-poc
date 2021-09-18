export default {
    'Light Theme': {
        semanticValueChanges: {
            headerNavigationFill: 'primary',
            headerNavigationText: 'primaryB',
        },
        primitiveChanges: {},
        customThemeValues: {
            borders: {
                useRoundedCorners: false,
                buttonBorderRadius: '0px',
                inputBorderRadius: '0px',
                popoverBorderRadius: '0px',
                surfaceBorderRadius: '0px',
            },
        },
    },
    Core: {
        fileName: 'core',
        copiedFrom: 'Light Theme',
        customThemeValues: {
            borders: {
                useRoundedCorners: false,
                buttonBorderRadius: '4px',
                inputBorderRadius: '4px',
                popoverBorderRadius: '4px',
                surfaceBorderRadius: '4px',
            },
            breakpoints: {
                small: 320,
                medium: 768,
                large: 1081,
            },
        },
        semanticValueChanges: {},
        primitiveChanges: {},
    },
}
