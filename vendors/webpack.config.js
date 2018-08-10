const path = require("path");
const webpack = require("webpack");
const project = require('../project');

module.exports = {
  context: project.root,
  entry: {
    vendors: ["react", "react-dom"]
  },
  output: {
    path: path.join(project.root, "dist", "vendors"),
    filename: "vendors.[name].js",
    library: "[name]_[hash]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(project.root,
        "dist",
        "vendors",
        "[name]-manifest.json"
      ),
      name: "[name]_[hash]"
    })
  ]
};
