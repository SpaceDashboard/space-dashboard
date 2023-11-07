const webpack = require('webpack');
const config = require('./webpack.config.js');
const wpUtils = require('./webpack.utils');
const noop = require('noop-webpack-plugin');
const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

let isLocalEnv = process.env.ENV === 'local';

console.log('\n\n\n\n--- DEV BUILD ---\n\n\n\n');

const devConfig = {
    // Generates a source map for showing original source files in browser developer tools
    devtool: isLocalEnv ? 'cheap-module-source-map' : '',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 3000,
        inline: true,
        watchContentBase: true
    },
    plugins: [ // tell webpack to use our configured plugins
        new WebpackShellPlugin({
            onBuildEnd:[
                'gulp build-local'
            ],
        }),
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, 'node_modules')
        ]),
    ]
};

// set up main webpack config object for development
module.exports = function(env) {
    return wpUtils.merger(config, devConfig);
};
