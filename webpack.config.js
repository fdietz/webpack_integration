var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebPackPlugin = require("copy-webpack-plugin");

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
      phoenix: __dirname + "/deps/phoenix/web/static/js/phoenix.js"
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css!sass?includePaths[]=" + __dirname + "/node_modules"
        )
      }
    ]
  },
  plugins: [
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
  ]
}
