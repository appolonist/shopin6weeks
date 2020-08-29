const { WebpackPluginServe } = require("webpack-plugin-serve");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const path = require("path");
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      new HtmlWebpackPlugin({
        template,
        chunks,
        title,
        minify: {
          collapseWhitespace: true
        }
      })
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
  
  exports.clean = () => ({
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

  exports.extractCSS = ({devMode}) => ({
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]'
                  }
              }
            },
             //'postcss-loader',
            //'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      }),
    ],
  });
  
  exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
      plugins: [require("autoprefixer")()],
    },
  });

  exports.loadCSS = () => ({
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
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