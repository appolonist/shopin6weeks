const { mode } = require("webpack-nano/argv");
const { merge } = require("webpack-merge");
const path = require("path");
const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    output: {
      filename: '[name].js',
      path: path.join(__dirname, "dist"),
    },
    
  },
  parts.loadJavaScript(),
  parts.setFreeVariable("HELLO", "hello from config") //test,
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  parts.devServer(),
]);

const getConfig = (mode) => {
  const pages = [
    parts.page({
      title: "Appolonist Shop",
      entry: {
        app: path.join(__dirname, "src", "index.jsx"),
      },
      chunks: ["app", "runtime", "vendor"],
      mode
    }),
  ];
  const config = mode === "production" ? productionConfig : developmentConfig;

  return merge([commonConfig, config, { mode }].concat(pages));
};

module.exports = getConfig(mode);

