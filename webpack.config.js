const path = require('path');

module.exports = {
  entry: "./src/main.ts",

  devtool: 'inline-source-map',
  watch:true,
  watchOptions:{
      ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};