import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const app = ReactDOM.render(<App />, document.querySelector('#app'));

console.info('Application:', app);
