const webpack = require("webpack");
const path = require("path");
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
  entry: {
    app: "./app/index.js"
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    publicPath: "/build/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify("production")
    }),
    new BabiliPlugin({ mangle: false })
  ]
};
