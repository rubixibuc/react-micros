const path = require("path");
const webpack = require("webpack");
const project = require("../project");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: {
    vendors: [
      "lodash",
      "react",
      "react-async-script-loader",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-dom",
      "recompose",
      "redux"
    ]
  },
  output: {
    path: path.join(project.root, "dist", "vendors"),
    filename: "[name].[chunkhash].dll.js",
    library: "[name]"
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(project.root, "dist", "vendors", "[name]-manifest.json"),
      name: "[name]"
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};
