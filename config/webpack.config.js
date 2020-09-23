const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const path = require("path");
const parts = require("./webpack.parts");

const commonConfig = require('./webpack.base.config');

const productionConfig = require('./webpack.prod.config');

const developmentConfig = (mode) => { 
  return merge([
  {
    context: __dirname,
    entry: ['@babel/polyfill','../src/index.js'],
    mode,
    devServer: {
      contentBase: path.resolve(__dirname,'..', 'dist'),
      compress: true,
      port: 9000,
      open: true,
      historyApiFallback: true,
      hot: true,
      lazy: true,
      liveReload: true
    },
  },
  //parts.devServer(),
  parts.extractCSS("development"),,
  parts.loadJavaScript()
 
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

