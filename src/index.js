import React from 'react';
import ReactDOM from 'react-dom';

import Users from './Users';
import Organisations from './Organisations';

const userRootElem = document.getElementById('users-root');
const orgsRootElem = document.getElementById('orgs-root');

if (userRootElem) {
    ReactDOM.render(<Users />, userRootElem);
}

if (orgsRootElem) {
    ReactDOM.render(<Organisations />, orgsRootElem);
}
