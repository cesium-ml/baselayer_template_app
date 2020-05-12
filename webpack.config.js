const path = require('path');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: [
    'whatwg-fetch',
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

    // Uncomment the following line to enable bundle size analysis
    //    new BundleAnalyzerPlugin()

  ],
  resolve: {
    alias: {
      baselayer: path.resolve(__dirname, 'baselayer/static/js')
    },
    extensions: ['.js', '.jsx']
  },
  watchOptions: {
    ignored: /node_modules/,
    // Set to true if you have trouble with JS change monitoring
    poll: false
  },
  mode: 'development'
};

module.exports = config;
