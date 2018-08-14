const path = require("path");
const webpack = require("webpack");
const project = require("../project");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  context: __dirname,
  resolve: {
    modules: [path.join(project.root, "vendors", "node_modules")]
  },
  output: {
    library: "reactor",
    libraryTarget: "var",
    filename: "reactor.[chunkhash].js",
    path: path.join(project.root, "dist", "reactor")
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
      filename: path.join(project.root, "dist", "reactor", "index.html")
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(project.root, "dist", "vendors", "*.dll.js"),
        includeSourcemap: false
      }
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "reactor-report.html"
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  externals: /^(core.+)$/i
};
