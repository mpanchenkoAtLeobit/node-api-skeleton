module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint/eslint-plugin', '@typescript-eslint/tslint', 'prettier'
    ],
    extends: [
        'eslint:recommended',
        'plugin:node/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        //project: './tsconfig.json',
        sourceType: "module"
    },
    rules: {
        "prettier/prettier": "error",
        "node/no-unsupported-features/es-syntax": [
            "error",
            { ignores: ["modules"] },
        ],
        "node/no-missing-import": ["error", {
            "allowModules": ["config"],
            "resolvePaths": ["config/index"],
            "tryExtensions": [".ts",".js", ".json", ".node"]
        }],
        "no-console": "error"
    }
};