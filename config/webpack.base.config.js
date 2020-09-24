const { merge } = require("webpack-merge");
const parts = require("./webpack.parts");
const commonConfig = merge([
    {
      resolve: {
        extensions: ['.js', '.jsx']
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