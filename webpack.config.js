const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const env = process.env.NODE_ENV;

// if (!env) {
//   console.clear();
// }

module.exports = {
  mode: env,
  
  entry: ['./src/js/index.js','./src/styles/index.css','./src/styles/index.scss'],
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    contentBase: path.resolve(__dirname, "./dist/index.html"),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true,
    clientLogLevel: "silent",
  },

  devtool: "eval-source-map",
  module: {
	rules: [

//loader babel qui compile l'es6 et js basique     
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
    
//loader css/sass/scss avec extracteur de fichier css et autoprefixer
    {
		test: /\.(scss|sass|css)$/,
      use: [
              { loader: 'css-hot-loader' },
              { loader: MiniCssExtractPlugin.loader },
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'postcss-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } }
      ]
    },

//loader url css 
    {
    test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader',
      ],
    },

	]
},
  plugins: [
    new MiniCssExtractPlugin({
          filename: "[name].css",
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