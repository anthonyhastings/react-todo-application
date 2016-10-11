// Loading dependencies.
var webpack = require('webpack');

/**
 * Webpack configuration options.
 * For a full list of options, please visit:
 * https://webpack.github.io/docs/configuration.html
 *
 * @type {Object}
 */
module.exports = {
    entry: {
        'js/bundle': './src/index.jsx',
        'js/bundle.min': './src/index.jsx'
    },
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: /\.min\.js$/
        }),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            compress: {
                'drop_console': false,
                'drop_debugger': false,
                'warnings': false
            }
        })
    ],
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    devServer: {
        contentBase: './dist/',
        publicPath: '/',
        inline: true,
        port: 3000
    }
};
