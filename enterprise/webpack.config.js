const { VueLoaderPlugin } = require("vue-loader");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const { ModuleFederationPlugin } = require("webpack").container;

const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./main.js"),
  },
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].[contenthash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader",
        options: {
          name: "[name][contenthash:8].[ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name][contenthash:8].[ext]",
          outputPath: "assets/img",
          esModule: false,
        },
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "pdp",
      filename: "remoteEntry.js",
      remotes: {
        home: "home@http://localhost:3000/remoteEntry.js",
      },
      shared: {
        vue: {
          singleton: false,
          packageName: "./node_modules/vue/dist/vue.esm.js",
          requiredVersion: "^2.6.12",
          version: "^2.6.12",
          strictVersion: true,
        },
      },
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css",
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
  ],
  resolve: {
    alias: {
      // vue$: "vue2",
      // vue$: "vue/dist/vue.esm-browser.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  optimization: {
    // moduleIds: "deterministic",
    // runtimeChunk: "single",
    splitChunks: false,
  },
  devServer: {
    historyApiFallback: true,
  },
};
