// const webpack = require('webpack')
const path = require('path')

const DIST = path.join(__dirname, 'dist')
const STATIC = path.join(__dirname, 'static')

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: STATIC,
        historyApiFallback: true,
    },
    entry: [
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [ 'env', 'react' ]
                }
            }
        ]
    },
    output: {
        path: DIST,
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'source-map'
}
