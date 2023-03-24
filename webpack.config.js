const HtmlWebPackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebPackPlugin({
 template: './src/index.html',
 filename: './index.html'
});
const isEnvDevelopment = process.env.ENV === 'development';

module.exports = {
    mode: isEnvDevelopment ? 'development' : 'production',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    plugins: [htmlPlugin]
};
