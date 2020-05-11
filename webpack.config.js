const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const env = process.env.NODE_ENV;

console.log(env);

module.exports = {
  mode: env,
  entry: ['./src/index.js','./src/index.css','./src/index.scss'],
  output: {
    filename: "[name].[contenhash].js",
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist/index.html"),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true,
    
  },
  devtool: "eval-source-map",
  module: {
	rules: [
	  {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
		}
	  },
	  {
		test: /\.(scss|sass|css)$/,
		use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
		]
	  },
	]
  },
  plugins: [
	new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css",
        chunkFilename: "[id].css"
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                autoprefixer()
            ]
        }
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'Custom template',
        template: './src/index.html'
    })
  ] 
}
if (env === 'production') {

    module.exports.plugins.push(
        new OptimizeCSSAssets()
    );
  }