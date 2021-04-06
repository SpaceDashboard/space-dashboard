const webpack = require("webpack");
const config = require('./webpack.config.js');
const wpUtils = require('./webpack.utils');
const noop = require('noop-webpack-plugin');
const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

let isLocalEnv = process.env.ENV === "local";

console.log("\n\n\n\n--- DEV BUILD ---\n\n\n\n");

// const bmrApps = {
//     'ecommerce': './bui/ecommerce/application/js/app/EcommerceBuyApp.js',
//     'messages': './bui/messages/application/js/app/MsgApp.js',
//     'manage-programs': './bui/manage_programs/application/js/app/ManagePrograms.js',
//     'pricing-discounts': './bui/pricing/application/discounts/js/app/DiscountsApp.js',
//     'pricing-fees': './bui/pricing/application/fees/js/app/FeesApp.js',
//     'pricing-defaults': './bui/pricing/application/defaults/js/app/DefaultsApp.js',
//     'funds': './bui/funds_management/application/js/app/FundsManagementApp.js',
//     'clients': './bui/clients/application/js/app/ClientsApp.js',
// };

// let customScript = './node_modules/beemer/bin/bmr build' +
//                     ' -e ' + bmrApps[process.env.BMR] +
//                     ' -o /bui/static-content/js/fake_bundle/' + process.env.BMR + '.js';

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
            path.join(__dirname, "node_modules")
        ]),
    ]
};

// set up main webpack config object for development
module.exports = function(env) {
    return wpUtils.merger(config, devConfig);
};
