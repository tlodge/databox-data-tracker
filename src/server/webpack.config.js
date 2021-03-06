var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
module.exports = {
    entry: {
        data_tracker: './server.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    mode: "production",
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', "stage-0"]
                },
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
