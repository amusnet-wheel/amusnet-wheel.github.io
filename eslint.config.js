import globals from 'globals';

export default [
    {
        files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
        languageOptions: {
            ecmaVersion: 13,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                window: true,
                browser: true
            }
        },
        rules: {
            semi: 'error',
            curly: 'error',
            quotes: ['warn', 'single'],
            'no-undef': 'error',
            indent: ['error', 4]
        }
    }
];
