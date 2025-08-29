// ESLint Flat Config for ESLint v9
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { react: reactPlugin, 'react-hooks': reactHooks },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      ...reactHooks.configs.recommended.rules,
    },
    settings: { react: { version: 'detect' } },
  },
  prettier,
  {
    ignores: ['dist', 'node_modules', 'storybook-static', 'e2e', 'netlify/functions/*.ts', 'commitlint.config.cjs']
  }
];

