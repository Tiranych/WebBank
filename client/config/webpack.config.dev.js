const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
	entry: path.resolve('./src/index.tsx'),
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
		new Dotenv(),
	],
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
				test: /\.tsx?$/,
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
							name: '[path][name].[ext]',
						},
					},
				],
			},
		],
	},
	devServer: {
		open: true,
		hot: true,
		historyApiFallback: true,
	},
	devtool: 'eval',
	watchOptions: {
		ignored: ['/node_modules/', '/public/'],
	},
};
