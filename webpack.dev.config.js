const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    app: "./app/index.js"
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    publicPath: "/build/"
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      }
    ]
  }
};
