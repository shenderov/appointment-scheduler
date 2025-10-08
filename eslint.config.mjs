// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ['apps/frontend/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./apps/frontend/tsconfig.app.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      ...(reactHooks.configs.recommended.rules ?? {}),
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...prettierPlugin.configs.recommended.rules,
    },
    settings: {
      // 👇 THIS IS THE FIX
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./apps/frontend/tsconfig.app.json'],
        },
      },
    },
  },

  {
    files: [
      'apps/backend/src/**/*.{ts,tsx}',
      'apps/backend/test/**/*.{ts,tsx}',
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: [
          './apps/backend/tsconfig.app.json',
          './apps/backend/tsconfig.test.json',
        ],
        tsconfigRootDir: __dirname,
      },
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-call': 'off',
      ...prettierPlugin.configs.recommended.rules,
    },
  },
];
