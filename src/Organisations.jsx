import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';

import Totals from './components/Totals';
import Pagination from './components/Pagination';

const initialState = {};

export default class Organisations extends Component {
    constructor (props) {
        super(props);

        this.state = {...initialState};
    }

    render () {
        return (<div>Hello</div>);
    }
}

Organisations.propTypes = {
