const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
	entry: path.resolve('./src/index.tsx'),
	output: {
		path: path.resolve(__dirname, '../public'),
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('./src/index.html'),
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/assets', to: 'assets' },
				{ from: 'src/styles', to: 'styles' },
			],
		}),
		new CssMinimizerWebpackPlugin(),
		new Dotenv(),
	],
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
	},
	resolve: {
		alias: {
			'@assets': path.resolve('./src/assets'),
			'@components': path.resolve('./src/components'),
			'@contexts': path.resolve('./src/contexts'),
			'@services': path.resolve('./src/services'),
			'@pages': path.resolve('./src/pages'),
			'@utils': path.resolve('./src/utils'),
		},
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							getCustomTransformers: () => ({
								before: [styledComponentsTransformer],
							}),
						},
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					},
				],
			},
		],
	},
};
