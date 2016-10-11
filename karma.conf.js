// Loading dependencies.
var webpackConfig = require('./webpack.config');

// Ensure that any entry bundles pre-defined in the config are forgotten about.
webpackConfig.entry = {};

// Ensure that no plugins are used for exporting styles, sourcemaps and so on.
webpackConfig.plugins = [];

// Finding the loader which pulls in SCSS and replacing it with an ignore.
webpackConfig.module.loaders.forEach(function(entry) {
    if (String('test.scss').match(entry.test)) {
        entry.loader = 'ignore';
    }
});

module.exports = function(config) {
    config.set({
        client: {
            mocha: {
                timeout: 8000
            }
        },

        frameworks: [
            'chai',
            'mocha',
            'sinon'
        ],

        files: ['tests-wrapper.js'],

        preprocessors: {
            'tests-wrapper.js': ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: false,
            watchOptions: {
                aggregateTimeout: 10000
            }
        },

        reporters: ['progress'],

        browsers: ['PhantomJS'],

        port: 9876,

        autoWatch: false,

        singleRun: true,

        logLevel: config.LOG_INFO
    });
};
