module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-refresh/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['react', 'react-hooks', 'react-refresh', '@typescript-eslint'],
  rules: {
    // Suas regras personalizadas aqui, por exemplo:
    'react/prop-types': 'off', // Se estiver usando TypeScript, pode desligar essa regra
    '@typescript-eslint/no-explicit-any': 'warn', // Aviso sobre o uso de `any`
    'react-refresh/only-export-components': 'warn',
  },
  settings: {
    react: {
      version: 'detect', // Detecta automaticamente a versão do React instalada
    },
  },
};
