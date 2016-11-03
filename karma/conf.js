// Loading dependencies.
var argv = require('yargs').argv;
var webpackConfig = require('../webpack.config');

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

// Enzyme uses conditional require calls, and Webpack needs to ignore these.
webpackConfig.externals = {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
};

// Add babel-istanbul code coverage specific settings to the webpack config.
webpackConfig.module.loaders.push({
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components|\.spec\.jsx?|tests-wrapper\.js)/,
    loader: 'babel-istanbul'
});

// Setting default values for Karma to operate in single-run mode.
var autoWatch = false;
var singleRun = true;

// Overriding single-run mode if 'watch' CLI argument has been specified.
if (argv.watch === true) {
    autoWatch = true;
    singleRun = false;
}

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

        files: [
            './polyfills.js',
            './tests-wrapper.js'
        ],

        preprocessors: {
            './tests-wrapper.js': ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: false,
            watchOptions: {
                aggregateTimeout: 10000
            }
        },

        reporters: [
            'progress',
            'coverage'
        ],

        coverageReporter: {
            dir: '../test-results/',
            reporters: [
                {type: 'text'},
                {type: 'text-summary'},
                {type: 'html', subdir: 'html'}
            ]
        },

        browsers: ['PhantomJS'],

        port: 9876,

        autoWatch: autoWatch,

        singleRun: singleRun,

        logLevel: config.LOG_INFO
    });
};
