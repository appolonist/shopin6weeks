const path = require('path')


const { mode } = require("webpack-nano/argv");
const {
  MiniHtmlWebpackPlugin,
} = require("mini-html-webpack-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");

module.exports = {
  watch: mode === "development",
  entry: path.resolve(__dirname, 'src', 'index.js'),
  mode,
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: "Appolonist Shop",
      },
    }),
    new WebpackPluginServe({
      port: process.env.PORT || 8080,
      static: "./dist",
      liveReload: true,
      waitForBuild: true,
    }),
  ],
};