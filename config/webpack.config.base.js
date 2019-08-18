const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

module.exports = {
  externals: {
    path: PATHS
  },
  
  entry: {
    app: PATHS.src
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    // publicPath: "/"
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.(png|jpg|gif|svg|webp|jpeg)$/,
      loader: 'file-loader',
      options: {  name: '[name].[ext]'  }
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {  name: '[name].[ext]'  }
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true, url: false }
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: {'path': `./postcss.config.js` }}
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true, url: false }
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: {'path': `./postcss.config.js` }}
        }
      ]
    }
  ]
},

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`
    }),
    new HtmlWebpackPlugin ({
      template: `${PATHS.src}/index.html`,
      filename: 'index.html',
      inject: false
    }),
    new CopyWebpackPlugin ([
      {from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}img`},
      {from: `${PATHS.src}/assets/uploads`, to: `${PATHS.assets}uploads`},
      {from: `${PATHS.src}/assets/fonts`, to: `${PATHS.assets}fonts`},
      {from: `${PATHS.src}/static`, to: 'static'},
    ])
  ],
}