// const rspack = require("@rspack/core");
// const { VueLoaderPlugin } = require("vue-loader");
// const path = require("path");

import { rspack } from "@rspack/core";
import { VueLoaderPlugin } from "vue-loader";
import path from "path";

const isDev = process.env.NODE_ENV == "development";

const __dirname = import.meta.dirname;

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  entry: {
    main: "./src/main.ts",
  },
  resolve: {
    extensions: ["...", ".ts"],
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
    },
  },
  optimization: { splitChunks: false },
  devServer: {
    port: 3000,
    allowedHosts: ["*"],
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new rspack.container.ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      exposes: {
        "./Article": "./src/components/Article.vue",
        "./articleMounter": "./src/articleMounter.ts",
      },
      shared: {
        vue: {
          singleton: false,
          eager: true,
          requiredVersion: "^3.4.21",
          version: "^3.4.21",
          strictVersion: true,
        },
      },
    }),
    new VueLoaderPlugin(),
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: {
                  tailwindcss: {},
                  autoprefixer: {},
                },
              },
            },
          },
        ],
        type: "css",
      },
      {
        test: /\.(js|ts)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: false,
                },
              },
              env: {
                targets: [
                  "chrome >= 87",
                  "edge >= 88",
                  "firefox >= 78",
                  "safari >= 14",
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.svg/,
        type: "asset/resource",
      },
    ],
  },
};

export default config;
