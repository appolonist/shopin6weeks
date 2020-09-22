const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const path = require("path");
const parts = require("./webpack.parts");

const commonConfig = require('./webpack.base.config');

const productionConfig = require('./webpack.prod.config');

const developmentConfig = (mode) => { 
  return merge([
  {
    output: {
      filename: '[name].js',
    },
    mode
  },
  parts.devServer(),
  parts.extractCSS("development")
 
])};

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
  const config = mode === "production" ? productionConfig(mode): developmentConfig(mode);

  return merge([commonConfig, config].concat(pages));
};

module.exports = getConfig(mode);

