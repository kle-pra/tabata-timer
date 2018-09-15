const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './app.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0']
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      // {
      //   test: /\.(scss)$/,
      //   use: [
      //     {
      //       // Adds CSS to the DOM by injecting a `<style>` tag
      //       loader: 'style-loader'
      //     },
      //     {
      //       // Interprets `@import` and `url()` like `import/require()` and will resolve them
      //       loader: 'css-loader'
      //     },
      //     {
      //       // Loader for webpack to process CSS with PostCSS
      //       loader: 'postcss-loader',
      //       options: {
      //         plugins: function () {
      //           return [
      //             require('autoprefixer')
      //           ];
      //         }
      //       }
      //     },
      //     {
      //       // Loads a SASS/SCSS file and compiles it to CSS
      //       loader: 'sass-loader'
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: 'index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })

  ]
}