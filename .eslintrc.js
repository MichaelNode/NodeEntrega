module.exports = {
    "env": {
        "browser": true,
        "amd": true,
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 8
    },
    "rules": {
        'no-console': 'off',
        "indent": [
            "error",
            "tab"
        ],
        "quotes": [
            "error",
            "single"
        ]
    }
};