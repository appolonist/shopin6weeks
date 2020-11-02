const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const path = require("path");
const parts = require("./webpack.parts");

const commonConfig = require('./webpack.base.config');

const productionConfig = require('./webpack.prod.config');

const developmentConfig = merge([
  {
    output: {
      chunkFilename: "chunk-[name].[contenthash].js",
      publicPath: "/",
      path: path.join(process.cwd(), "dist"),
      filename: '[name].bundle.js'
    },
  },
  parts.devServer(),
  parts.extractCSS("development")
]);

const getConfig = (mode) => {
  const pages = [
    parts.page({
      title: "Appolonist Shop",
      entry: {
        app: ["core-js/modules/es6.promise",
        "core-js/modules/es6.array.iterator", 
        '@hot-loader/react-dom', 
        path.resolve(__dirname, '..', 'src', 'index.js')
      ]},
      chunks: ["app", "runtime", "vendor"],
      mode,
      template: path.resolve(__dirname, "..", "src", "index.html")
    }),
  ];
  const config = mode === "production" ? productionConfig : developmentConfig;

  return merge([commonConfig, config, { mode }].concat(pages));
};

module.exports = getConfig(mode);

