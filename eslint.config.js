import reactRefresh from 'eslint-plugin-react-refresh';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sonarjs from 'eslint-plugin-sonarjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: ['**/*.cjs'],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    ignores: ['**/*.js'],
    plugins: {
      'react-refresh': reactRefresh,
      sonarjs
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.vite.json'],
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react-refresh/only-export-components': ['error', {
        allowConstantExport: true,
      }],
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'sonarjs/cognitive-complexity': 'warn',
      'sonarjs/no-identical-expressions': 'warn',
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/no-gratuitous-expressions': 'warn',
      'sonarjs/no-implicit-dependencies': 'warn',
      'sonarjs/no-redundant-parentheses': 'warn',
      'sonarjs/no-ignored-return': 'warn'
    },
  }
];
