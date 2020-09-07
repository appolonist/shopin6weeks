const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const path = require("path");
const parts = require("./webpack.parts");

const commonConfig = require('./webpack.base.config');

const productionConfig = merge([
  {
    output: {
      chunkFilename: "[name].[contenthash:4].js",
      filename: "[name].[contenthash:4].js",
    },
    recordsPath: path.join(__dirname, "records.json"),
  },
    parts.minifyJavaScript(),
    parts.minifyCSS({
      options: {
        preset: ["default"],
      },
    }),
    parts.extractCSS({ devMode: false }),
    //parts.eliminateUnusedCSS(), // uncoment for bootstrap, tailwindcss or other framework
    parts.generateSourceMaps({ type: "source-map" }),
    {
      optimization: {
        splitChunks: {
          chunks: "all",
        },
        runtimeChunk: {
          name: "runtime",
        },
      },
    },
    parts.attachRevision(),
  ]);

const developmentConfig = merge([
  parts.devServer(),
  parts.extractCSS({ devMode: true })
 
]);

const getConfig = (mode) => {
  const pages = [
    parts.page({
      title: "Appolonist Shop",
      entry: {
        app: path.join(__dirname, "..", "src", "index.js"),
      },
      chunks: ["app", "runtime", "vendor"],
      mode,
      template: path.join(__dirname, "../src/index.html")
    }),
  ];
  const config = mode === "production" ? productionConfig : developmentConfig;

  return merge([commonConfig, config, { mode }].concat(pages));
};

module.exports = getConfig(mode);
