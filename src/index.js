import React from 'react';
import ReactDOM from 'react-dom';
import AV from 'leancloud-storage';
import App from './App';
import { APP } from './config';

AV.init(APP.ID, APP.KEY);
// 调试信息
if (process.env.NODE_ENV === 'development') {
  localStorage.setItem('debug', 'leancloud*,LC*');
}


const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

render();

if (module.hot) {
  module.hot.accept('./App', () => render());
}
