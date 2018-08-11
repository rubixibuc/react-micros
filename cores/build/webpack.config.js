const path = require("path");
const webpack = require("webpack");
const project = require("../../project");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const WebpackLoadersContextPlugin = require("webpack-loaders-context-plugin");

module.exports = env => {
  if (!env || !env.id) {
    throw new Error(
      "Must specific core id: npm run build -- --env.id=<core.id>"
    );
  }

  return {
    context: __dirname,
    entry: [path.join(project.root, "cores", env.id, "src", "index.js")],
    resolve: {
      modules: [
        path.join(__dirname, "node_modules"),
        path.join(project.root, "vendors", "node_modules")
      ]
    },
    output: {
      library: env.id,
      libraryTarget: "umd",
      filename: env.id + ".js",
      path: path.join(project.root, "dist", "cores")
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                require.resolve("babel-preset-env"),
                require.resolve("babel-preset-react"),
                require.resolve("babel-preset-stage-2")
              ]
            }
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
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        reportFilename: env.id + "-report.html"
      })
    ],
    optimization: {
      minimizer: [new UglifyJsPlugin()]
    }
  };
};
