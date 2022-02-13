const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	// Path to the output directory, where the bundle.js file will be created
	output: {
		path: path.join(__dirname, "/public"),
		filename: "bundle.js",
	},
	devServer: {
		port: 3000,
	},
	// Rules to compile and bundle the files.
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	// Minimum plugins setup.
	// HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles.
	// MiniCssExtractPlugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
	plugins: [
		new HtmlWebpackPlugin({ template: "./src/index.html" }),
		new MiniCssExtractPlugin(),
	],
};
