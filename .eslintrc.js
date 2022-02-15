module.exports = {
  extends: 'erb',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],
    'import/extensions': 0,
    'react/jsx-filename-extension': [0],
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'require-jsdoc': 0,
    'no-invalid-this': 0,
    'max-len': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/prop-types': 0,
    'operator-linebreak': ['error', 'after'],
    'no-unused-vars': 1,
    'guard-for-in': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    radix: 0,
    'react/jsx-props-no-spreading': 0,
    'no-plusplus': 0,
    'react/no-array-index-key': 0,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'react-hooks'],
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
