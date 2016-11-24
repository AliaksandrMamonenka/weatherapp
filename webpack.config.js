const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname + '/sources',
  entry: './main',
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: '[name].js'
  },

  devtool: (NODE_ENV == 'development') ? 'inline-source-map' : null,

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
  }
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}