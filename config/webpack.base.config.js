const { merge } = require("webpack-merge");
const path = require("path");
const parts = require("./webpack.parts");
const APP_DIR = path.resolve(__dirname, '../src');
const commonConfig = merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
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