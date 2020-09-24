const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const path = require("path");
const parts = require("./webpack.parts");

const commonConfig = require('./webpack.base.config');

const productionConfig = require('./webpack.prod.config');

const developmentConfig = () => { 
  return merge([
  { 
    output: "../dist",
    mode 
  },
  parts.devServer(),
  parts.extractCSS("development"),,
  parts.loadJavaScript()
 
])};

const getConfig = (mode) => {
  const pages = [
    parts.page({
      title: "Appolonist Shop",
      entry: {
        app: path.resolve(__dirname, '../src/index.js'),
      },
      chunks: ["app", "runtime", "vendor"],
      mode,
      template: path.resolve(__dirname, "../src/index.html")
    }),
  ];
  const config = mode === "production" ? productionConfig: developmentConfig;

  return merge([commonConfig, config, {mode}].concat(pages));
};

module.exports = getConfig(mode);

