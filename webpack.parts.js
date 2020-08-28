const { WebpackPluginServe } = require("webpack-plugin-serve");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const path = require("path");
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

const APP_SOURCE = path.join(__dirname, "src");
const ALL_FILES = glob.sync(path.join(__dirname, "src/*.js"));

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

  function addEntryToAll(entries, entry) {
    const ret = {};
  
    Object.keys(entries).forEach((key) => {
      const e = entries[key];
  
      ret[key] = (Array.isArray(e) ? e : [e]).concat(entry);
    });
  
    return ret;
  };
  
  exports.setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);
  
    return {
      plugins: [new webpack.DefinePlugin(env)],
    };
  };

  exports.minifyCSS = ({ options }) => ({
    plugins: [
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: options,
        canPrint: false,
      }),
    ],
  });

  exports.attachRevision = () => ({
    plugins: [
      new webpack.BannerPlugin({
        banner: new GitRevisionPlugin().version(),
      }),
    ],
  });
  
  exports.clean = (path) => ({
    plugins: [new CleanWebpackPlugin()],
  });

  exports.eliminateUnusedCSS = () => ({
    plugins: [
      new PurgeCSSPlugin({
        whitelistPatterns: [],
        paths: ALL_FILES, 
        extractors: [
          {
            extractor: (content) =>
              content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
            extensions: ["html"],
          },
        ],
      }),
    ],
  });

  exports.minifyJavaScript = () => ({
    optimization: {
      minimizer: [new TerserPlugin({ sourceMap: true })],
    },
  });

  exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
    return {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              { loader: MiniCssExtractPlugin.loader, options },
              "css-loader",
            ].concat(loaders),
          },
        ],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash:4].css",
        }),
      ],
    };
  };

  exports.tailwind = () => ({
    loader: "postcss-loader",
    options: {
      plugins: [require("tailwindcss")()],
    },
  });
  
  exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
      plugins: [require("autoprefixer")()],
    },
  });
  

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
  
  exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
      rules: [
        {
          test: /\.(png|jpg)$/,
          include,
          exclude,
          use: {
            loader: "url-loader",
            options,
          },
        },
      ],
    },
  });

  exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
  });