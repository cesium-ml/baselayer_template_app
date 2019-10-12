const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'static/js/components/Main.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'static/build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options:
        {
          presets: ['env'],
          plugins: [
            'transform-object-rest-spread',
            'transform-async-to-generator',
            'transform-es2015-arrow-functions',
            'transform-class-properties'
          ],
          compact: false
        }
      },
      {
        test: /\.jsx?$/,
        include: /static\/js/,
        loader: 'babel-loader',
        options:
        {
          presets: ['env', 'react'],
          plugins: [
            'transform-object-rest-spread',
            'transform-async-to-generator',
            'transform-es2015-arrow-functions',
            'transform-class-properties'
          ],
          compact: false
        }
      },
      {
        test: /\.css$/,
        include: /static\/js/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),

    // We do not use JQuery for anything in this project; but Bootstrap
    // depends on it
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    })
  ],
  resolve: {
    alias: {
      baselayer: path.resolve(__dirname, 'baselayer/static/js')
    },
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;
