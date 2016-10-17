import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import App from './components/App';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRedirect to="/list" />
        <Route path="/list" />
        <Route path="/add" />
    </Route>
  </Router>
), document.querySelector('#app'));
