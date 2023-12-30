module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'react-refresh'],
    rules: {
        /**
         * React ESLint Rules
         */
        
        /**
         * Preference.
         * This is just an annoying rule that more often than not leads to 
         * uglier wording on pages since it has to be escaped.
         */
        'react/no-unescaped-entities': 'off',

        /**
         * Not Needed.
         * This rule is not needed as Vite uses a more modern JSX transform out of
         * the box. It configures the necessary Babel and Typescript compiler settings
         * which enables this feature.
         */
        'react/react-in-jsx-scope': 'off',

        /**
         * React Refresh Rules
         */

        /**
         * Validates that your components can safely be updated with fast refresh.
         * This is nice to ensure that hot reloading works well the developer doesn't
         * run into issues where changes propagate unless they manually refresh the page.
         */
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
};
