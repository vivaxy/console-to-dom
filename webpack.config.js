/**
 * @since 2015-12-10 20:15
 * @author vivaxy
 */
'use strict';

module.exports = {
    entry: {
        'dest/index': './src/index.js',
        'demo/demo': './demo/src.js'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?presets[]=es2015'
            }
        ]
    }
};
