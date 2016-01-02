var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebPackPlugin = require("copy-webpack-plugin");

var env = process.env.MIX_ENV || 'dev'
var prod = env === 'prod'

var plugins = [
  new ExtractTextPlugin("css/app.css"),
  new CopyWebPackPlugin([
    { from: "./web/static/assets" },
    { from: "./deps/phoenix_html/web/static/js/phoenix_html.js",
      to: "js/phoenix_html.js"
    },
    { from: "./deps/phoenix/web/static/js/phoenix.js",
      to: "js/phoenix.js"
    }
  ])
];

if (prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
  devtool: "source-map",
  entry: {
    "app": ["./web/static/js/app.js", "./web/static/css/app.scss"]
  },
  output: {
    path: "./priv/static",
    filename: "js/app.js"
  },
  resolve: {
    modulesDirectories: [__dirname + "/web/static/js"],
    alias: {
      phoenix_html: __dirname + "/deps/phoenix_html/web/static/js/phoenix_html.js",
      phoenix: __dirname + "/deps/phoenix/web/static/js/phoenix.js",
      normalize: __dirname + "/node_modules/normalize.css/normalize.css"
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css!sass?includePaths[]=" + __dirname + "/node_modules!autoprefixer?browsers=last 2 versions"
        )
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.woff$/,
        loader: 'url?limit=100000'
      }
    ]
  },
  plugins: plugins
}
