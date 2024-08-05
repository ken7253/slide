import globals from 'globals';
import eslint from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

const compat = new FlatCompat();

export default tseslint.config(
  {
    name: 'eslint/recommended',
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
    rules: eslint.configs.recommended.rules,
  },

  {
    name: 'eslint/custom-rules',
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'require-unicode-regexp': ['error'],
      radix: ['error'],
      'prefer-template': ['error'],
      'no-plusplus': ['error'],
      camelcase: ['error'],
    },
  },

  // ESLint typescript
  ...tseslint.configs.recommended,

  // eslint vue
  ...pluginVue.configs['flat/essential'],

  {
    name: 'storybook/plugin',
    plugins: compat.extends('plugin:storybook/recommended')[0].plugins,
  },

  {
    name: 'storybook/stories',
    files: ['**/*.stories.ts'],
    rules: compat.extends('plugin:storybook/recommended')[1].rules,
  },
  {
    name: 'storybook/settings',
    files: ['.storybook/**.ts'],
    rules: compat.extends('plugin:storybook/recommended')[2].rules,
  },
);
