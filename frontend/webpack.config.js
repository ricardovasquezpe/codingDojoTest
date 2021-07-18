const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist/'),
        port: 3000,
        publicPath: 'http://localhost:3000/dist/',
        /*hotOnly: true,*/
        historyApiFallback: true
    },
    plugins: [new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
      })],
    devtool: 'eval-source-map',
}
