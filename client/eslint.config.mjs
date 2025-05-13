import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

import babelParser from '@babel/eslint-parser';
import pluginJs from '@eslint/js';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		languageOptions: {
			globals: globals.browser,
			parser: babelParser,
			parserOptions: {
				presets: ['@babel/preset-env', '@babel/preset-react'],
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		plugins: {
			'react-hooks': eslintPluginReactHooks,
		},
	},
	{ ignores: ['node_modules/*', 'public/*', 'config/*', 'webpack.config.js'] },
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	eslintConfigPrettier,
	eslintPluginPrettierRecommended,
];
