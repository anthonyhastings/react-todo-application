// Loading dependencies.
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Webpack configuration options.
 * For a full list of options, please visit:
 * https://webpack.github.io/docs/configuration.html
 *
 * @type {Object}
 */
module.exports = {
    entry: {
        'bundle': './src/index.jsx',
        'bundle.min': './src/index.jsx'
    },
    output: {
        path: './dist/',
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract('css?-autoprefixer!postcss!sass')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css', {
            allChunks: true
        }),
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
        compress: true,
        port: 3000
    },
    sassLoader: {
        outputStyle: 'compact',
        precision: 3
    },
    postcss: function() {
        return [
            autoprefixer({
                browsers: [
                    'last 2 versions',
                    'iOS >= 7.1',
                    'Android >= 4'
                ],
                cascade: false
            })
        ];
    }
};
