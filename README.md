# React: To Do List

## Introduction
This repository demonstrates a super simple to do list built using React. It is
a learning platform for myself as I venture further into the world of React and
everything that comes with it.

The tooling around the application is quite robust. It uses Webpack as a bundler
for both JSX markup and SCSS styles. Babel compiles ES2015 code into ES5 and it
also compiles JSX back into React method calls. Webpack Dev Server serves the
HTML markup and JS bundles, hot loading them in as changes happen. ESLint is
used to lint JSX files. There is also a test suite consisting of Karma, Chai,
Mocha, Sinon and Enzyme.

## Installation and Usage
The entire project can be built via NPM scripts. Simply install the dependencies
then start the server:

    npm install && npm start

To see a full list of available NPM scripts, use the following command:

    npm run

By default, React will be in development mode. To use React in production mode,
we need to set the environment variable `NODE_ENV` to production. Doing this in
tandem with bundling and uglifying will remove a lot of dead-code that was
development mode specific. To start the server and bundle React in production
mode, use the following command:

    npm start -- --production

## Notes

* `.babelrc` has been updated from the usual `es2015` entry to now also include
a `react` entry. This tells babel to compile JSX back down to React calls.

* `.editorconfig` has had `.jsx` added to entries that have rules which apply
to JavaScript.

* `.eslintrc.json` has had some React/JSX specific updates. JSX has been added
as an active ECMA feature. This allows ESLint to parse JSX files. A react
specific plug-in has been added to validate React code usage.

* `karma.conf.js` has some updates to the webpack configuration to make the
bundle work with inside PhantomJS. Numerous react libraries are marked as
external as they're conditionally loaded via Enzyme. Stylesheets are ignored
as they serve no purpose in our unit tests. Sourcemaps and Uglification are also
disabled on the test suite bundle.

* `webpack.config.js` loads stylesheets defined per each component to make them
truly encapsulated. The configuration also ensures Webpack knows to search for
files with the `jsx` extension when performing `require` calls.
