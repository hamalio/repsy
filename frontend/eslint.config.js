import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // "recommended" (no type checking) keeps linting fast
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser, // allow browser globals (window, document, fetch...)
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules, // rules for the new JSX runtime (no React import needed)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'semi': ['error', 'never'],
    },
    settings: {
      react: {
        version: 'detect', // auto-detect the installed React version
      },
    },
  },
)