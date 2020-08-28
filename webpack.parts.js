const { WebpackPluginServe } = require("webpack-plugin-serve");
const path = require("path");
const webpack = require('webpack');
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
        template: () => `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="description" content="Appolonist Shop" />
          <meta name="keywords" content="Appolonist Shop" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="style.css" type="text/css" />
            <title>Appolonist Shop</title>
            <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        </head>
        <body>
            <div id="app"></div>
            <script src="app.js" type="text/javascript"></script>
        </body>
        </html>`
      }),
    ],
  });
  
  exports.setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);
  
    return {
      plugins: [new webpack.DefinePlugin(env)],
    };
  };

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
  