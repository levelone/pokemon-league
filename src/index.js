import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const main = document.getElementById('main');

ReactDOM.render(<App />, main);
registerServiceWorker();
