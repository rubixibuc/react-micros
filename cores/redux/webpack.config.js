const path = require("path");
const webpack = require("webpack");
const project = require("../../project");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  context: __dirname,
  resolve: {
    modules: [path.join(project.root, "vendors", "node_modules")]
  },
  output: {
    library: "redux",
    libraryTarget: "umd",
    filename: "redux.js",
    path: path.join(project.root, "dist", "cores")
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
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};
