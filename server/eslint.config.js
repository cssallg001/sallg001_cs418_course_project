import globals from "globals";
import pluginJs from "@eslint/js";
import stylistic from '@stylistic/eslint-plugin';
import pluginReact from "eslint-plugin-react";

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: ["dist/**/*"],
  },

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      "valid-jsdoc": "off",
      "max-len": "off",
      "space-before-function-paren": [
        "error",
        {
          anonymous: "never",
          named: "never",
          asyncArrow: "always",
        },
      ],
      "prettier/prettier": [
        "error",
        {},
        {
          usePrettierrc: false,
        },
      ],
      "import/no-import-module-exports": "off",
      "arrow-parens": ["error", "as-needed"],
      quotes: ["error", "single", { avoidEscape: true }],
      "brace-style": ["error", "allman"],
      "object-curly-newline": [
        "error",
        {
          ObjectExpression: "always",
          ObjectPattern: { multiline: true },
          ImportDeclaration: "never",
          ExportDeclaration: { multiline: true, minProperties: 3 },
        },
      ],
      "no-unused-vars": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      indent: ["error", 4],
      // "indent": [4, "tab"],
      "no-tabs": 0,
    },
    settings: {
      "import/ignore": ["node_modules", "src"],
      react: {
        version: "detect",
      },
    },
  },

  eslintPluginPrettierRecommended, // Must be the last object in configuration array
];
