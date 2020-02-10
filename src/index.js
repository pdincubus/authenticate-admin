import React from 'react';
import ReactDOM from 'react-dom';

import Users from './Users';

const userRootElem = document.getElementById('users-root');
const orgsRootElem = document.getElementById('org-root');

if (userRootElem) {
    ReactDOM.render(<Users />, userRootElem);
}

if (orgsRootElem) {
    ReactDOM.render(<Organisations />, orgsRootElem);
}
