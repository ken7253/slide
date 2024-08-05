import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

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
      complexity: ['warn', 2],
    },
  },

  // ESLint typescript
  ...tseslint.configs.recommended,

  // eslint vue
  ...pluginVue.configs['flat/essential'],
);
