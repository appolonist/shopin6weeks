// {
//     "presets": [
//       "@babel/preset-react",
//       "@babel/preset-env"
//     ],
//     "plugins": [
//       "@babel/plugin-transform-runtime",
//       "@babel/plugin-syntax-dynamic-import",
//       "@babel/plugin-proposal-class-properties",
//       "@babel/plugin-proposal-export-namespace-from",
//       "@babel/plugin-proposal-throw-expressions",
//       "@babel/plugin-transform-modules-commonjs",
//       "react-hot-loader/babel"
//     ]
//   }


module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    // Applies the react-refresh Babel plugin on non-production modes only
    ...(!api.env('production') && { plugins: ['react-refresh/babel'] }),
  };
};