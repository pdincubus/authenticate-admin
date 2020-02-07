import React from 'react';
import ReactDOM from 'react-dom';

import Users from './Users';

const userRootElem = document.getElementById('users-root');

if (userRootElem) {
    ReactDOM.render(<Users />, userRootElem);
}
