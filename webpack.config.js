const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // Entry point of your application
  entry: "./src/index.js",

  // Output configuration for the bundle files
  output: {
    path: path.join(__dirname, "/public"),
    filename: "bundle.js",
    clean: true, // Cleans the output directory before each build
  },

  // Development server configuration
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "public"), // Serves static files from 'public' directory
    compress: true, // Enables gzip compression
    hot: true, // Enables Hot Module Replacement
    open: true, // Opens the browser after server has been started
  },

  // Module rules for processing different file types
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Use MiniCssExtractPlugin loader instead of 'style-loader' for production
      },
    ],
  },

  // Plugins configuration
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // Use contenthash for cache busting
    }),
  ],

  // Optimization and performance enhancements
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  // Resolving module import statements
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"), // Shortcut to reference src directory
    },
  },

  // Source Map for easier debugging
  devtool: "source-map",
};
