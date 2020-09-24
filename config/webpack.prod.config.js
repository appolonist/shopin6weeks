const { merge } = require('webpack-merge');
const parts = require("./webpack.parts");
const path = require('path');

const prodConfiguration = () => {
  return merge([
    {
      output: {
         chunkFilename: "[name].[contenthash:4].js",
         filename: "[name].[contenthash:4].js",
    },
      recordsPath: path.join(__dirname, "records.json"),
      mode
    },
    parts.minifyJavaScript(),
     parts.minifyCSS({
        options: {
          preset: ["default"],
        },
      }),
      parts.extractCSS( "production" ),
    //parts.eliminateUnusedCSS(), // uncoment for bootstrap, tailwindcss or other framework
    parts.generateSourceMaps({ type: "source-map" }),
    parts.attachRevision(),
    parts.visualizer()
  ]);
}

module.exports = prodConfiguration;