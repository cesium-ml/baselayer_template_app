const path = require('path');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: {
    main: [
      '@babel/polyfill',
      path.resolve(__dirname, 'static/js/components/Main.jsx')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'static/build'),
    publicPath: '/static/build/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkHash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options:
        {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            '@babel/plugin-transform-async-to-generator',
            '@babel/plugin-transform-arrow-functions',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread'
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
