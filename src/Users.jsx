import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import sub from 'date-fns/sub';

import Table from './components/Table';
import UserView from './components/UserView';
import Totals from './components/Totals';
import Pagination from './components/Pagination';
import EmailSearch from './components/EmailSearch';
import Filters from './components/Filters';

let fakeUsers = Array.apply(0, Array(243)).map((item, index) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const organisation = faker.random.arrayElement(['Capita', 'CHDA', 'DWP', 'G4S', 'London Borough of Croydon Council', 'Remploy', 'Serco']);
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

let sameName1 = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@capita.co.uk',
    organisation: 'Capita',
    status: 'Active',
    lastLoggedIn: 1581371302,
    accountCreatedOn: 1566812735,
};

let sameName2 = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith2@capita.co.uk',
    organisation: 'Capita',
    status: 'Active',
    lastLoggedIn: 1581198502,
    accountCreatedOn: 1566985535,
};

fakeUsers.push(sameName1, sameName2);

const initialState = {
    users: fakeUsers,
    liveUsers: fakeUsers,
    currentView: 'userList',
    userData: {},
    itemsPerPage: 20,
    currentPage: 1,
    currentPageStart: 0,
    currentPageEnd: 19,
    currentSort: 'firstName',
    currentSortDir: 'asc',
    currentOrgFilter: false,
    currentStatusFilter: false,
    searchEmail: '',
};

export default class Users extends Component {
    constructor (props) {
        super(props);

        this.state = {...initialState};
    }

    /**
     * Initial view updates to users list sort order
     */
    componentDidMount () {
        this.setState({
            ...this.state,
            liveUsers: this.sortByFirstName('asc')
        });
    }

    /**
     * Switch to single user view when we've worked out which user data we need
     * @param {integer} index     The array index of the user we want
     */
    onUserNameClick (index) {
        const singleUserData = this.state.liveUsers[index];

        this.setState({
            currentView: 'singleUser',
            userData: singleUserData,
        });
    };

    /**
     * The back button just changes the view back to the user list default view
     */
    onSingleUserBack (e) {
        e.preventDefault();

        this.setState({
            currentView: 'userList',
            userData: {},
        });
    }

    /**
     * Handle clicks on pagination buttons
     * @param {event} e     the element interacted with, so we can find the data
     *                      attribute we need for the next or prev 'page'
     */
    onPaginationItemClick (e) {
        const { itemsPerPage, currentPage } = this.state;
        const pageTarget = parseInt(e.currentTarget.dataset.page, 10);
        const newCurrentPageStart = (pageTarget > 1) ? (itemsPerPage * (pageTarget - 1)) : 0;
        const newCurrentPageEnd = (pageTarget > 1) ? (pageTarget * itemsPerPage) - 1 : (itemsPerPage - 1);

        console.log('page target:', pageTarget, 'start:', newCurrentPageStart, 'end:', newCurrentPageEnd);

        this.setState({
            currentPage: pageTarget,
            currentPageStart: newCurrentPageStart,
            currentPageEnd: newCurrentPageEnd,
        });
    }

    /**
     * Update the state value as we type into the search box
     * @param {event} e     The element we're typing into
     */
    onEmailAddressChange (e) {
        this.setState({
            searchEmail: e.currentTarget.value,
        });
    }

    /**
     * Handle users pressing enter after typing an email address into the field
     * @param {event} e     The key pressed, should be enter (13)
     */
    onHandleSearchKeyPress (e) {
        if (e.which === 13 && this.state.searchEmail.length > 3) {
            this.setState({
                currentView: 'searchResults',
            });
        } else {
            alert('Fill in the value');
        }
    }

    /**
     * Clicking the 'search' button changes to the search results view
     * @param {event} e     The button clicked, not used.
     */
    onSubmitEmailSearch (e) {
        this.setState({
            currentView: 'searchResults',
        });
    }

    /**
     * Apply currently selected filters to user list
     * @param {event} e
     */
    onFilter (e) {
        const { users, currentOrgFilter, currentStatusFilter } = this.state;

        let newFilteredUsers = users;

        if (currentOrgFilter) {
            newFilteredUsers = newFilteredUsers.filter((user) => { return user.organisation === currentOrgFilter; });
        }

        if (currentStatusFilter) {
            newFilteredUsers = newFilteredUsers.filter((user) => { return user.status === currentStatusFilter; });
        }

        this.setState({
            liveUsers: newFilteredUsers,
        });
    }

    /**
     * Clear all filters and return default user list in first name order
     * @param {event} e
     */
    onClearFilters (e) {
        this.setState({
            liveUsers: this.sortByFirstName('asc')
        });
    }

    /**
     * Update state value for organisation when new one chosen in select elem
     * @param {event} e
     */
    onOrganisationFilterChange (e) {
        this.setState({
            currentOrgFilter: e.currentTarget.value,
        });
    }

    /**
     * Update state value for status when new one chosen in select elem
     * @param {event} e
     */
    onStatusFilterChange (e) {
        this.setState({
            currentStatusFilter: e.currentTarget.value,
        });
    }

    /**
     * Figure out which way we're sorting, then get the new list of users done
     * and sorted by first name
     * @param {event} e
     */
    onFirstNameSort (e) {
        let newDirection = this.toggleSortDirection('firstName');

        this.setState({
            currentSort: 'firstName',
            liveUsers: this.sortByFirstName(newDirection),
        });
    }

    /**
     * Figure out which way we're sorting, then get the new list of users done
     * and sorted by last name
     * @param {event} e
     */
    onLastNameSort(e) {
        let newDirection = this.toggleSortDirection('lastName');

        this.setState({
            currentSort: 'lastName',
            liveUsers: this.sortByLastName(newDirection),
        });
    }

    /**
     * Figure out which way we're sorting, then get the new list of users done
     * and sorted by organisation
     * @param {event} e
     */
    onOrganisationSort (e) {
        let newDirection = this.toggleSortDirection('organisation');

        this.setState({
            currentSort: 'organisation',
            liveUsers: this.sortByOrganisation(newDirection),
        });
    }

    /**
     * Figure out which way we're sorting, then get the new list of users done
     * and sorted by status
     * @param {event} e
     */
    onStatusSort (e) {
        let newDirection = this.toggleSortDirection('status');

        this.setState({
            currentSort: 'status',
            liveUsers: this.sortByStatus(newDirection),
        });
    }

    /**
     * Switch between asceding and descending at the correct time if we're
     * clicking on a heading we're already sorting by
     * @param {string} thisSort
     */
    toggleSortDirection (thisSort) {
        const { currentSort, currentSortDir } = this.state;

        let newSortDir;

        if (currentSortDir === 'asc' && currentSort === thisSort) {
            newSortDir = 'desc';
        } else {
            newSortDir = 'asc';
        }

        this.setState({
            currentSortDir: newSortDir,
        });

        return newSortDir;
    }

    /**
     * Basic array sort by first name, upper-cased
     */
    sortByFirstName (direction) {
        const newSortedUsers = this.state.liveUsers.sort(function (a, b) {
            const nameA = a.firstName.toUpperCase();
            const nameB = b.firstName.toUpperCase();

            if (direction === 'asc') {
                if (nameA < nameB) {
                    return -1;
                }

                if (nameA > nameB) {
                    return 1;
                }
            } else {
                if (nameA > nameB) {
                    return -1;
                }

                if (nameA < nameB) {
                    return 1;
                }
            }

            return 0;
        });

        return newSortedUsers;
    }

    /**
     * Basic array sort by last name, upper-cased
     */
    sortByLastName (direction) {
        const newSortedUsers = this.state.liveUsers.sort(function (a, b) {
            const nameA = a.lastName.toUpperCase();
            const nameB = b.lastName.toUpperCase();

            if (direction === 'asc') {
                if (nameA < nameB) {
                    return -1;
                }

                if (nameA > nameB) {
                    return 1;
                }
            } else {
                if (nameA > nameB) {
                    return -1;
                }

                if (nameA < nameB) {
                    return 1;
                }
            }

            return 0;
        });

        return newSortedUsers;
    }

    /**
     * Basic array sort by organisation, upper-cased, alphabetical
     */
    sortByOrganisation(direction) {
        const newSortedUsers = this.state.liveUsers.sort(function (a, b) {
            const orgA = a.organisation.toUpperCase();
            const orgB = b.organisation.toUpperCase();

            if (direction === 'asc') {
                if (orgA < orgB) {
                    return -1;
                }

                if (orgA > orgB) {
                    return 1;
                }
            } else {
                if (orgA > orgB) {
                    return -1;
                }

                if (orgA < orgB) {
                    return 1;
                }
            }

            return 0;
        });

        return newSortedUsers;
    }

    /**
     * Basic array sort by status, upper-cased, alphabetical
     */
    sortByStatus (direction) {
        const newSortedUsers = this.state.liveUsers.sort(function (a, b) {
            const statusA = a.status.toUpperCase();
            const statusB = b.status.toUpperCase();

            if (direction === 'asc') {
                if (statusA < statusB) {
                    return -1;
                }

                if (statusA > statusB) {
                    return 1;
                }
            } else {
                if (statusA > statusB) {
                    return -1;
                }

                if (statusA < statusB) {
                    return 1;
                }
            }

            return 0;
        });

        return newSortedUsers;
    }

    render () {
        const {
            users,
            liveUsers,
            currentView,
            userData,
            itemsPerPage,
            currentSort,
            currentSortDir,
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
                                showHead={false}
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
                                    onSubmitEmailSearch={(e) => {this.onSubmitEmailSearch(e)}}
                                    onEmailAddressChange={(e) => {this.onEmailAddressChange(e)}}
                                    onHandleKeyPress={(e) => {this.onHandleSearchKeyPress(e)}}
                                />
                            </div>
                        </div>

                        <Filters
                            onFilter={(e) => {this.onFilter(e)}}
                            onClearFilters={(e) => {this.onClearFilters(e)}}
                            onOrganisationFilterChange={(e) => { this.onOrganisationFilterChange(e)}}
                            onStatusFilterChange={(e) => { this.onStatusFilterChange(e)}}
                        />

                        <Table
                            users={liveUsers.slice(currentPageStart, currentPageEnd)}
                            onUserNameClick={(index) => this.onUserNameClick(index)}
                            onFirstNameSort={(index) => this.onFirstNameSort(index)}
                            onLastNameSort={(index) => this.onLastNameSort(index)}
                            onOrganisationSort={(index) => this.onOrganisationSort(index)}
                            onStatusSort={(index) => this.onStatusSort(index)}
                            sortDirection={currentSortDir}
                            currentSortCol={currentSort}
                        />

                        <nav role="navigation" aria-label="Pagination">
                            <Pagination
                                itemsPerPage={itemsPerPage}
                                totalItems={liveUsers.length}
                                currentPage={currentPage}
                                onPaginationClick={(e) => {this.onPaginationItemClick(e)}}
                            />

                            <Totals
                                totalLow={currentPageStart + 1}
                                totalHigh={currentPageEnd + 1}
                                totalLength={liveUsers.length}
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

Users.propTypes = {
    users: PropTypes.array,
    liveUsers: PropTypes.array,
    currentView: PropTypes.string,
    userData: PropTypes.object,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    currentPageStart: PropTypes.number,
    currentPageEnd: PropTypes.number,
    currentSort: PropTypes.string,
    currentSortDir: PropTypes.string,
    currentOrgFilter: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    currentStatusFilter: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),
    searchEmail: PropTypes.string,
};
