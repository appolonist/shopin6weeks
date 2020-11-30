const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const { mode } = require("webpack-nano/argv");
const commonConfig = merge([
  {
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'react-redux': require.resolve('react-redux'),
      },
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