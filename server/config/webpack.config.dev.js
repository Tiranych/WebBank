const path = require("path");

module.exports = {
  entry: path.resolve("./src/app.ts"),
  resolve: [".ts", ".js"],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  devServer: {
    hot: true,
    port: 3000,
  },
  devtool: "eval",
  watchOptions: {
    ignored: ["/node_modules/"],
  },
};
