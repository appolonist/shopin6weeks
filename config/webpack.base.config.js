const { merge } = require("webpack-merge");
const path = require("path");
const parts = require("./webpack.parts");
const commonConfig = merge([
    {
      output: {
        path: path.resolve(__dirname,"..", 'dist'),
        filename: '[name].[hash:8].js',
        sourceMapFilename: '[name].[hash:8].map',
        chunkFilename: '[id].[hash:8].js'
      },
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