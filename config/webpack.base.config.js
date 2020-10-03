const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const { mode } = require("webpack-nano/argv");
const commonConfig = merge([
  {
    resolve: {
      alias: { 'react-dom': '@hot-loader/react-dom' },
      extensions: ['.js', '.jsx']
    },
    mode

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