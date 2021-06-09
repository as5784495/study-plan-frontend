const path = require('path');

module.exports = {
  entry: {
    main: "./src/Main.ts",
    Monitor: "./src/Monitor.ts",
    Plan: "./src/Plan.ts",
    Rest: "./src/Rest.ts",
    Schedule: "./src/Schedule.ts",
  },
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
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};