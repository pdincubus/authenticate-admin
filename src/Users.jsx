import React, { Component } from 'react';
import faker from 'faker';
import sub from 'date-fns/sub';

import Table from './Table';
import UserView from './UserView';
import Totals from './Totals';
import Pagination from './Pagination';
import EmailSearch from './EmailSearch';
import Filters from './Filters';

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
    sortedUsers: [],
    currentView: 'userList',
    userData: {},
    itemsPerPage: 20,
    currentPage: 1,
    currentPageStart: 0,
    currentPageEnd: 19,
    currentSort: 'firstName',
    searchEmail: '',
};

export default class Users extends Component {
    constructor (props) {
        super();

        this.state = {...initialState};
    }

    componentDidMount () {
        this.setState({
            ...this.state,
            sortedUsers: this.sortByFirstName()
        });
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
        console.log('pagination item click, go to page: ', e.currentTarget.dataset.page);
    }

    onEmailAddressChange (e) {
        this.setState({
            searchEmail: e.currentTarget.value,
        });
    }

    onHandleSearchKeyPress (e) {
        if (e.which === 13 && this.state.searchEmail.length > 3) {
            this.setState({
                currentView: 'searchResults',
            });
        } else {
            alert('Fill in the value');
        }
    }

    onSubmitEmailSearch (e) {
        this.setState({
            currentView: 'searchResults',
        });
    }

    sortByFirstName () {
        const newSortedUsers = this.state.users.sort(function (a, b) {
            const nameA = a.firstName.toUpperCase();
            const nameB = b.firstName.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });

        return newSortedUsers;
    }

    sortByLastName () {
        const newSortedUsers = this.state.users.sort(function (a, b) {
            const nameA = a.lastName.toUpperCase();
            const nameB = b.lastName.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });

        return newSortedUsers;
    }

    sortByStatus () {
        const newSortedUsers = this.state.users.sort(function (a, b) {
            const statusA = a.status.toUpperCase();
            const statusB = b.status.toUpperCase();

            if (statusA < statusB) {
                return -1;
            }

            if (statusA > statusB) {
                return 1;
            }

            return 0;
        });

        return newSortedUsers;
    }

    render () {
        const {
            users,
            sortedUsers,
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
                                    onHandleKeyPress={(e) => { this.onHandleSearchKeyPress(e) }}
                                />
                            </div>
                        </div>

                        <Filters />

                        <Table
                            users={sortedUsers.slice(currentPageStart, currentPageEnd)}
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
