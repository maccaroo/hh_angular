import eslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintParser from "@typescript-eslint/parser";
import angularEslintPlugin from "@angular-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";

export default [
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: eslintParser,
            parserOptions: {
                project: "tsconfig.json",
                tsconfigRootDir: process.cwd(),
                createDefaultProgram: true,
            },
        },
        plugins: {
            "@typescript-eslint": eslintPlugin,
            "@angular-eslint": angularEslintPlugin,
        },
        rules: {
            ...prettierConfig.rules, // Apply Prettier rules directly
            "@angular-eslint/directive-selector": [
                "error",
                { type: "attribute", prefix: "app", style: "camelCase" },
            ],
            "@angular-eslint/component-selector": [
                "error",
                { type: "element", prefix: "app", style: "kebab-case" },
            ],
            "no-extra-semi": "warn",
            indent: ["warn", 4],
        },
    },
];
