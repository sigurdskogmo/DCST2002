// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import App from './App';

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <App />,
    root
  );
