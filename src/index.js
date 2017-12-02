import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './client/scss/style.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
