const path = require("path");
const webpack = require("webpack");
const project = require("../project");

module.exports = {
  context: __dirname,
  entry: {
    vendors: ["react", "react-async-script-loader", "react-dom", "react-redux", "react-router", "recompose", "redux"]
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
  ]
};
