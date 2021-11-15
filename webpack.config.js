const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopmentEnv = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopmentEnv ? "development" : "production",

  devtool: isDevelopmentEnv ? "eval-source-map" : "source-map",

  entry: path.resolve(__dirname, "src", "index.tsx"),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  devServer: {
    static: path.resolve(__dirname, "public"),
    hot: true,
  },

  plugins: [
    isDevelopmentEnv && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader"),
          options: {
            plugins: [
              isDevelopmentEnv && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
