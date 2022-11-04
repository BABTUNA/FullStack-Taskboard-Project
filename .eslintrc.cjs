module.exports = {
  root: true,
  env: { es2022: true },
  extends: ['eslint:recommended'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  overrides: [
    {
      files: ['client/src/**/*.{js,jsx}'],
      env: { browser: true },
      plugins: ['react'],
      extends: ['plugin:react/recommended'],
      settings: { react: { version: 'detect' } },
    },
    {
      files: ['server/**/*.js'],
      env: { node: true, jest: true },
      parserOptions: { sourceType: 'script' },
    },
  ],
};
