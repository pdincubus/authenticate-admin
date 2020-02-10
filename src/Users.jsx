import React, { Component } from 'react';
import faker from 'faker';
import sub from 'date-fns/sub';

import Table from './Table';
import UserView from './UserView';
import Totals from './Totals';
import Pagination from './Pagination';
import EmailSearch from './EmailSearch';

const fakeUsers = Array.apply(0, Array(50)).map((item, index) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const organisation = faker.company.companyName();
    const domain = `${organisation.replace(' - ', '-').replace(', ', '-').replace('. ', '-').replace(' ', '-').replace(' ', '-').replace('\'', '')}.co.uk`.toLowerCase();
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
    itemsPerPage: 20,
    currentPage: 1,
    currentPageStart: 0,
    currentPageEnd: 19,
    searchEmail: '',
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

    onPaginationItemClick (e) {
        console.log('pagination item click');
    }

    onEmailAddressChange (e) {
        this.setState({
            searchEmail: e.currentTarget.value,
        });
    }

    onSubmitEmailSearch (e) {
        this.setState({
            currentView: 'searchResults',
        });
    }

    render () {
        const {
            users,
            currentView,
            userData,
            itemsPerPage,
            currentPage,
            currentPageStart,
            currentPageEnd,
            searchEmail,
        } = this.state;

        switch (currentView) {
            case 'singleUser':
                return (
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            <a
                                href="#"
                                className="govuk-back-link govuk-!-margin-bottom-9"
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

            case 'searchResults':
                return (
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            <a
                                href="#"
                                className="govuk-back-link govuk-!-margin-bottom-9"
                                onClick={(e) => { this.onSingleUserBack(e) }}
                            >
                                Back
                            </a>

                            <h1 className="govuk-heading-l listing-page">Search results</h1>

                            <Table
                                users={users.filter((user) => { return user.email === this.state.searchEmail; })}
                                onUserNameClick={(index) => this.onUserNameClick(index)}
                            />
                        </div>
                    </div>
                );

            case 'userList':
            default:
                return (
                    <div>
                        <div className="govuk-grid-row">
                            <div className="govuk-grid-column-one-half">
                                <h1 className="govuk-heading-l listing-page">Users</h1>

                                <a href="#" className="govuk-button listing-page">
                                    Add a user
                                </a>
                            </div>

                            <div className="govuk-grid-column-one-half">
                                <EmailSearch
                                    onSubmitEmailSearch={(e) => { this.onSubmitEmailSearch(e) }}
                                    onEmailAddressChange={(e) => { this.onEmailAddressChange(e) }}
                                />
                            </div>
                        </div>

                        <div className="govuk-grid-row filter-block">
                            <div className="govuk-form-group">
                                <label className="govuk-label govuk-label--s" htmlFor="sort">
                                    Filter user list
                                </label>

                                <select className="govuk-select govuk-!-margin-right-1" id="filter-users-orgs" name="filter-users-orgs">
                                    <option value="all-organisations">All organisations</option>
                                    <option value="Capita">Capita</option>
                                    <option value="DWP">DWP</option>
                                    <option value="G4S">G4S</option>
                                    <option value="Croydon">London Borough of Croydon Council</option>
                                    <option value="Remploy">Remploy</option>
                                    <option value="Serco">Serco</option>
                                </select>

                                <select className="govuk-select govuk-!-margin-right-1" id="filter-users-status" name="filter-users-status">
                                    <option value="all-statuses">All statuses</option>
                                    <option value="access-expired">Access expired</option>
                                    <option value="active">Active</option>
                                    <option value="invite-expired">Invite expired</option>
                                    <option value="invite-sent">Invite sent</option>
                                </select>

                                <button className="govuk-button govuk-!-margin-right-1" data-module="govuk-button">
                                    Update
                                </button>

                                <button className="govuk-button govuk-button--secondary" data-module="govuk-button">
                                    Clear
                                </button>
                            </div>
                        </div>

                        <Table
                            users={users.slice(currentPageStart, currentPageEnd)}
                            onUserNameClick={(index) => this.onUserNameClick(index)}
                        />

                        <nav role="navigation" aria-label="Pagination">
                            <Pagination
                                itemsPerPage={itemsPerPage}
                                totalItems={users.length}
                                currentPage={currentPage}
                                onPaginationClick={(e) => {this.onPaginationItemClick(e)}}
                            />

                            <Totals
                                totalLow={currentPageStart + 1}
                                totalHigh={currentPageEnd + 1}
                                totalLength={users.length}
                                totalType="users"
                            />
                        </nav>

                        <p className="govuk-!-margin-top-9">
                            <a href="#" className="govuk-link">Back to dashboard</a>
                        </p>
                    </div>
                );
        }
    }
}
