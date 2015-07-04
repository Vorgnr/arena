'use strict';

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader?optional=runtime', exclude: node_modules }
        ]
    }
};