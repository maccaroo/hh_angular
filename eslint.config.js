import eslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintParser from "@typescript-eslint/parser";
import angularEslintPlugin from "@angular-eslint/eslint-plugin";

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
            "@angular-eslint/directive-selector": [
                "error",
                { type: "attribute", prefix: "app", style: "camelCase" },
            ],
            "@angular-eslint/component-selector": [
                "error",
                { type: "element", prefix: "app", style: "kebab-case" },
            ],
            "no-extra-semi": "warn",
            "indent": ["warn", 4],
        },
    }
];
