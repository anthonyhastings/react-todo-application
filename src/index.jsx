import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const app = ReactDOM.render(<App />, document.querySelector('#app'));

console.info('Application:', app);
