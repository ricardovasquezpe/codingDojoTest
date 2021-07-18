const path = require('path')
const webpack = require('webpack')

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
        contentBase: path.join(__dirname, 'public/'),
        port: 3000,
        publicPath: 'http://127.0.0.1:3000/dist/',
        hotOnly: true,
        historyApiFallback: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devtool: 'eval-source-map',
}
