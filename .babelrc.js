// module.exports = {
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
//       "@babel/plugin-transform-modules-commonjs"
//     ]
//   }


module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
            "@babel/plugin-transform-runtime",
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-export-namespace-from",
            "@babel/plugin-proposal-throw-expressions",
            "@babel/plugin-transform-modules-commonjs"
          ],
          env: {
            test: {
              plugins: ["@babel/plugin-transform-modules-commonjs"]
            }
          },
    // Applies the react-refresh Babel plugin on non-production modes only
    ...(!api.env('production') && (!api.env('test')) && { plugins: ['react-refresh/babel'] }),
  };
};