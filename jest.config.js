module.exports = {
  
    clearMocks: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
    moduleFileExtensions: ['js', 'json', 'jsx'],
    setupFiles: ['<rootDir>/enzyme.config.js'],
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],
    testURL: 'http://localhost',
    verbose: false,
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/cssMock.js",
        "\\.(css|less)$": "identity-obj-proxy"
      }
    
}