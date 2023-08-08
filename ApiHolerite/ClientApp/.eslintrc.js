module.exports = {
  env: {
    es2021: true,
  },
  settings: {
    "react": {
      "version": "detect"
    },
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    projectFolderIgnoreList: ['./.eslinrc.js', './webpack.config.js'],
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'prettier',
    'import',
    '@typescript-eslint',
  ],
  rules: {
    'prettier/prettier': ['error',
      {
        'endOfLine': 'auto',
      }
    ]
  },
};
