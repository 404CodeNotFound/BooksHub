const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./client/src/App.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            use: [
              {
                loader: 'file-loader',
                options: {}  
              }
            ]
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          }
        ]
      },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./client/public/index.html",
      filename: "./index.html"
    })
  ]
};