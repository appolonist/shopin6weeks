const { WebpackPluginServe } = require("webpack-plugin-serve");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const path = require("path");
const webpack = require('webpack');
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const APP_SOURCE = path.resolve(__dirname, "../src");
const ALL_FILES = glob.sync(path.resolve(__dirname, "../src/*.js"));
const outputPath = path.join(process.cwd(), '/dist');

exports.page = ({ path = "", template, title, entry, chunks, mode } = {}) => ({
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
}

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
        }
      ],
    }),
  ],
});

exports.minifyJavaScript = () => ({

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [new TerserPlugin()],
  },
});

exports.extractCSS = (mode) => ({
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: mode === 'development' ? true : false
            }
          },
          {
            loader: 'css-loader',
            options: {
              //mode: 'local',
              esModule: true,
              import: true,
              modules: {
                namedExport: true,
                auto: true,
                localIdentName: mode === 'development' ? '[local]' : '[name]__[local]___[hash:base64:5]'
              }

            }

          },
          // 'postcss-loader',
          // 'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: mode === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: mode === 'development' ? '[id].css' : '[id].[hash].css',
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
        test: /\.(css|scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
  },
]}
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
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }

        }
      },
    ],

  },
});

exports.devServer = () => ({
  output:{
    path: outputPath
  },
  
  plugins: [
    new WebpackPluginServe({
      client: {
        retry: true
      },
      port: process.env.PORT || 8087,
      static: outputPath,
      open: true,
      //liveReload: true, // this kill hmr!
      waitForBuild: true,
      hmr: true,
      historyFallback: true
    }),
  ],
  watch: true,
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

exports.copyFromStaticToDist = () => ({
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: 'src/static', to: 'static' }] }),
  ],
})

exports.visualizer = () => ({
  plugins: [
    new Visualizer({ filename: './statistics.html' })
  ],
})