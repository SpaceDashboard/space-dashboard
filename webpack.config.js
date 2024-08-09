const ConcatPlugin = require('webpack-concat-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const noop = require('noop-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const shell = require('shelljs');

let isLocalEnv = process.env.ENV === 'local';

// const coreCSS = new ExtractTextPlugin('css/space-dashboard.min.css');
// const libsCSS = new ExtractTextPlugin('css/lib/space-dashboard-libs.css');

let coreJsFiles = [
    './dev/js/core.js',
    './dev/js/neo-feed.js',
    './dev/js/planetary-k-index.js',
    './dev/js/site-messages.js',
    './dev/js/site-monitors.js',
    // './dev/js/space-dragging.js',
    './dev/js/modernizr.js'
];

// let coreCssFiles = [
//     './dev/css/default.css',
//     './dev/css/buttons.css',
//     './dev/css/grid.css',
//     './dev/css/menus.css',
//     './dev/css/nav-menu.css',
//     './dev/css/responsive.css'
// ];

var libJsFiles = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery-migrate/dist/jquery-migrate.min.js',
    './node_modules/moment/min/moment.min.js',
    './node_modules/moment-timezone/builds/moment-timezone-with-data.min.js',
    './node_modules/underscore/underscore-min.js',
    './node_modules/handlebars/dist/handlebars.min.js',
    './node_modules/fastclick/lib/fastclick.js',
    './node_modules/sweetalert2/dist/sweetalert2.all.min.js',
    './node_modules/ustream-embedapi/dist/ustream-embedapi.min.js',
    './node_modules/draggabilly/dist/draggabilly.pkgd.min.js',
    './node_modules/chart.js/dist/Chart.min.js'
];

// var libCssFiles = [
//     './bower_components/fontawesome/css/font-awesome.min.css',
//     './bower_components/sweetalert2/dist/sweetalert2.min.css'
// ];

const sentry = {
    js: '<script src="https://js.sentry-cdn.com/4ef023b94fba4dfd9ab26e6a3f8610f3.min.js" crossorigin="anonymous"></script>'
}

// Remove the 'build' directory
shell.rm('-rf', 'build');

module.exports = {
    entry: {
        'ignore': coreJsFiles
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            '__DATE__': isLocalEnv ? '' : Date.now(),
            '__SENTRY_JS__' : isLocalEnv ? '<script></script>' : sentry.js,
            excludeAssets: [/\.js$/],
            // template is the template, not a variable
            template: './dev/index.html',
        }),
        new HtmlWebpackExcludeAssetsPlugin(),
        new CopyWebpackPlugin([
            { from: './dev/index.html', to: path.resolve(__dirname, './build/index.html') },
            { from: './dev/.htaccess', to: path.resolve(__dirname, './build/.htaccess'), toType: 'file' }
        ]),
        new FileManagerPlugin({
            onEnd: {
                copy: [
                    { source: './dev/error.html', destination: './build/' },
                    { source: './dev/api', destination: './build/api' },
                    { source: './dev/img', destination: './build/img' },
                    { source: './node_modules/font-awesome/fonts/*', destination: './build/css/fonts/' },
                    { source: './dev/fonts', destination: './build/fonts' },
                    { source: './dev/other', destination: './build/other' },
                    { source: './dev/*.{php,json,ini}', destination: './build/' }
                ],
            }
        }),
        new ConcatPlugin({
            fileName: 'space-dashboard.min.js',
            outputPath: './js/',
            uglify: !isLocalEnv,
            filesToConcat: coreJsFiles,
        }),
        new ConcatPlugin({
            fileName: 'space-dashboard-libs.min.js',
            outputPath: './js/lib/',
            uglify: !isLocalEnv,
            filesToConcat: libJsFiles,
        }),
        // Only uglify for non-local builds
        isLocalEnv ? noop() : new UglifyJsPlugin({
            parallel: true
        }),
        isLocalEnv ? noop() : new WebpackShellPlugin({
            onBuildEnd:['gulp build-all'],
        })
    ]
};
