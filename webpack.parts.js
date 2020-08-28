const { WebpackPluginServe } = require("webpack-plugin-serve");
const path = require("path");
//const glob = require("glob");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const APP_SOURCE = path.join(__dirname, "src");

exports.page = ({ path = "", template, title, entry, chunks, mode} = {}) => ({
    entry:
      mode === "development"
        ? addEntryToAll(entry, "webpack-plugin-serve/client")
        : entry,
    plugins: [
      new MiniHtmlWebpackPlugin({
        chunks,
        filename: "index.html",
        context: {
          title: 'Appolonist Shop',
          favicon: 'https://assets-cdn.github.com/favicon.ico',
          container: 'app',
          trimWhitespace: true,
        },
        template: require('@vxna/mini-html-webpack-template'),
      }),
    ],
  });
  
  function addEntryToAll(entries, entry) {
    const ret = {};
  
    Object.keys(entries).forEach((key) => {
      const e = entries[key];
  
      ret[key] = (Array.isArray(e) ? e : [e]).concat(entry);
    });
  
    return ret;
  }
  
  exports.loadJavaScript = () => ({
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: APP_SOURCE,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        },
      ],
    },
  });

exports.devServer = () => ({
    watch: true,
    plugins: [
      new WebpackPluginServe({
        port: process.env.PORT || 8080,
        static: "./dist",
        liveReload: true,
        waitForBuild: true,
        open: true,
        hmr: true
      }),
    ],
  });
  