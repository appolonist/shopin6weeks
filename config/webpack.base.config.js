const { merge } = require("webpack-merge");
const path = require("path");
const parts = require("./webpack.parts");
const commonConfig = merge([
    {
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "../dist"),
      },
      
    },
    parts.clean(),
    parts.copyFromStaticToDist(),
    parts.loadJavaScript(),
    parts.setFreeVariable("HELLO", "hello from config"), //test,
    parts.loadImages({
      options: {
        limit: 15000,
        name: "[name].[contenthash:4].[ext]",
      },
    }),
  ]);

  module.exports = commonConfig;