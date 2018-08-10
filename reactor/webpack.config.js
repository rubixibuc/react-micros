const path = require("path");
const webpack = require("webpack");
const project = require("../project");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  context: __dirname,
  resolve: {
    modules: [path.join(project.root, "vendors", "node_modules")]
  },
  output: {
    library: "reactor",
    libraryTarget: "umd",
    filename: "[name].[chunkhash].js",
    path: path.join(project.root, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(project.root, "vendors"),
      manifest: require(path.join(
        project.root,
        "dist",
        "vendors",
        "vendors-manifest.json"
      ))
    }),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      filename: path.join(project.root, "dist", "index.html")
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(project.root, "dist", "vendors", "*.dll.js"),
        includeSourcemap: false
      }
    ])
  ]
};
