import React, { Component } from 'react';
import faker from 'faker';
import sub from 'date-fns/sub';

import Table from './Table';
import UserView from './UserView';

const fakeUsers = Array.apply(0, Array(50)).map((item, index) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const organisation = faker.company.companyName();
    const domain = `${organisation.replace(' - ', '-').replace(', ', '-').replace('. ', '-').replace(' ', '-').replace(' ', '-')}.co.uk`.toLowerCase();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
    const status = faker.random.arrayElement(['Active', 'Invite sent', 'Invite expired', 'Access expired']);
    const accountCreatedOn = faker.date.past(2);

    let lastLoggedIn;

    switch (status) {
        case 'Access expired':
            lastLoggedIn = faker.date.past(2, sub(new Date(), { days: 61 }));
            break;

        case 'Invite expired':
        case 'Invite sent':
            lastLoggedIn = '';
            break;

        default:
            lastLoggedIn = faker.date.recent(60);
            break;
    }

    return {
        firstName,
        lastName,
        email,
        organisation,
        status,
        lastLoggedIn,
        accountCreatedOn
    };
});

const initialState = {
    users: fakeUsers,
    currentView: 'userList',
    userData: {},
};

export default class Users extends Component {
    constructor (props) {
        super();

        this.state = {...initialState};
    }

    onUserNameClick (index) {
        const singleUserData = this.state.users[index];

        this.setState({
            currentView: 'singleUser',
            userData: singleUserData,
        });
    };

    onSingleUserBack (e) {
        e.preventDefault();

        this.setState({
            currentView: 'userList',
            userData: {},
        });
    }

    render () {
        const { users, currentView, userData } = this.state;

        switch (currentView) {
            case 'singleUser':
                return (
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            <a
                                href="#"
                                className="govuk-back-link"
                                onClick={(e) => {this.onSingleUserBack(e)}}
                            >
                                Back
                            </a>

                            <h1 className="govuk-heading-l listing-page">User details</h1>

                            <UserView data={userData} />

                            <p className="govuk-!-margin-top-9">
                                <a href="#" className="govuk-link">Back to dashboard</a>
                            </p>
                        </div>
                    </div>
                );

            case 'userList':
            default:
                return (
                    <div>
                        <h1 className="govuk-heading-l listing-page">Users</h1>

                        <a href="#" className="govuk-button listing-page">
                            Add a user
                        </a>

                        <Table users={users} onUserNameClick={(index) => this.onUserNameClick(index)} />

                        <p className="govuk-!-margin-top-9">
                            <a href="#" className="govuk-link">Back to dashboard</a>
                        </p>
                    </div>
                );
        }
    }
}
