const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
// const { GenerateSW } = require('workbox-webpack-plugin');
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      publicPath: "/",
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Weather Dashboard'
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "sw.js",
      }),
      // new GenerateSW(),
      new WebpackPwaManifest({
        // TODO: Create a manifest.json:
        name: "Weather Dashboard",
        short_name: "W-Dash",
        description: "Get Current and Forecasted Weather",
        orientation: "portrait",
        display: "standalone",
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
        start_url: "/",
        publicPath: "/",
        fingerprints: true,
        inject: true,
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            type: "image/png",
            sizes: [36, 48, 72, 96, 144, 192, 512],
          },
        ],
      }),
    ],
    // resolve: {
    //   fallback: {
    //     src: require.resolve("src/")
    //   }
    // },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
