// const webpack = require('webpack')
const path = require('path')

const DIST = path.join(__dirname, 'dist')

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: DIST,
        historyApiFallback: true,
    },
    entry: [
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules',
                loader: 'babel-loader',
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
