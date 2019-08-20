const path = require('path');
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
const PAGES_DIR = `${PATHS.src}/assets/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  externals: {
    path: PATHS
  },
  
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    // publicPath: "/"
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
  module: {
    rules: [
    {
      test: /\.pug$/,
        loader: 'pug-loader?pretty=true'
    },
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
    },
    {
      test: /\.svg$/,
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: './static/icons.svg',
          runtimeCompat: true
        }
      },
        'svg-transform-loader',
        'svgo-loader'
      ]
    }
      
  ],
},

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`
    }),
    
    new CopyWebpackPlugin ([
      {from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}img`},
      {from: `${PATHS.src}/assets/uploads`, to: `${PATHS.assets}uploads`},
      {from: `${PATHS.src}/assets/fonts`, to: `${PATHS.assets}fonts`},
      {from: `${PATHS.src}/static`, to: 'static'},
    ]),
    new SpriteLoaderPlugin({
      plainSprite: true
    }),

    // Automatic creation any html pages (Don't forget to RERUN dev server)
    // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
    // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    }))
  ],
}

