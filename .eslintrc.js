module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    settings: {
        react: {
            version: "detect"
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    plugins: ["@typescript-eslint", "react"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        "react/prop-types": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "react/react-in-jsx-scope": "off",
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    },
    globals: {React: "writable"}
};