// @ts-check

import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    js.configs.recommended,
    ...ts.configs.recommended,
    ...pluginVue.configs["flat/recommended"],
    eslintConfigPrettier,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                parser: tsParser,
                sourceType: "module",
            },
        },
        rules: {
            "vue/multi-word-component-names": [
                "error",
                {
                    ignores: ["Dashboard", "Default", "Empty", "Index", "Personal", "Ticket"],
                },
            ],
            "vue/no-v-html": 0,
        },
    },
];
