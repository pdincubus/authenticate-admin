import React, { Component } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';

import OrgsTable from './components/OrgsTable';
import Totals from './components/Totals';
import Pagination from './components/Pagination';

let fakeOrgs = Array.apply(0, Array(42)).map((item, index) => {
    const companyName = faker.company.companyName();
    const numberOfUsers = faker.random.number({ min: 0, max: 500 });

    return {
        companyName,
        numberOfUsers,
    };
});

let forcedOrg1 = {
    companyName: 'Capita',
    numberOfUsers: 43,
};

let forcedOrg2 = {
    companyName: 'London Borough of Croydon Council',
    numberOfUsers: 21,
};

fakeOrgs.push(forcedOrg1, forcedOrg2);

const initialState = {
    orgs: fakeOrgs,
    liveOrgs: fakeOrgs,
    currentView: 'orgList',
    orgData: {},
    itemsPerPage: 20,
    currentPage: 1,
    currentPageStart: 0,
    currentPageEnd: 19,
    currentSort: 'companyName',
    currentSortDir: 'asc',
};

export default class Organisations extends Component {
    constructor (props) {
        super(props);

        this.state = {...initialState};
    }

    /**
     * Initial view updates to orgs list sort order
     */
    componentDidMount() {
        this.setState({
            ...this.state,
            liveOrgs: this.sortByOrgName('asc')
        });
    }

    /**
     * The back button just changes the view back to the org list default view
     */
    onSingleOrgBack(e) {
        e.preventDefault();

        this.setState({
            currentView: 'orgList',
            orgData: {},
        });
    }

    /**
     * Switch to single org view when we've worked out which org data we need
     * @param {integer} index     The array index of the org we want. This
     *                            index is only in the current view, not by page
     *                            so we need to work out what page we're on too
     */
    onOrgNameClick(index) {
        const { liveOrgs, currentPageStart } = this.state;
        const actualIndex = currentPageStart + index;
        const singleOrgData = liveOrgs[actualIndex];

        this.setState({
            currentView: 'singleOrg',
            orgData: singleOrgData,
        });
    };

    /**
     * Figure out which way we're sorting, then get the new list of orgs done
     * and sorted by company name
     * @param {event} e
     */
    onOrgNameSort(e) {
        let newDirection = this.toggleSortDirection('orgName');

        this.setState({
            currentSort: 'orgName',
            liveUsers: this.sortByOrgName(newDirection),
        });
    }

    /**
     * Figure out which way we're sorting, then get the new list of orgs done
     * and sorted by number oif users
     * @param {event} e
     */
    onOrgUsersSort(e) {
        let newDirection = this.toggleSortDirection('orgUsers');

        this.setState({
            currentSort: 'orgUsers',
            liveUsers: this.sortByOrgUsers(newDirection),
        });
    }

    /**
     * Handle clicks on pagination buttons
     * @param {event} e     the element interacted with, so we can find the data
     *                      attribute we need for the next or prev 'page'
     */
    onPaginationItemClick(e) {
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
     * Switch between asceding and descending at the correct time if we're
     * clicking on a heading we're already sorting by
     * @param {string} thisSort
     */
    toggleSortDirection(thisSort) {
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
     * Basic array sort by company first name, upper-cased
     */
    sortByOrgName(direction) {
        const newSortedOrgs = this.state.liveOrgs.sort(function (a, b) {
            const nameA = a.companyName.toUpperCase();
            const nameB = b.companyName.toUpperCase();

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

        return newSortedOrgs;
    }

    /**
     * Basic array sort by number of users
     */
    sortByOrgUsers(direction) {
        const newSortedOrgs = this.state.liveOrgs.sort(function (a, b) {
            const numUsersA = a.numberOfUsers;
            const numUsersB = b.numberOfUsers;

            if (direction === 'asc') {
                if (numUsersA < numUsersB) {
                    return -1;
                }

                if (numUsersA > numUsersB) {
                    return 1;
                }
            } else {
                if (numUsersA > numUsersB) {
                    return -1;
                }

                if (numUsersA < numUsersB) {
                    return 1;
                }
            }

            return 0;
        });

        return newSortedOrgs;
    }

    render () {
        const {
            liveOrgs,
            orgData,
            currentView,
            currentPage,
            currentPageStart,
            currentPageEnd,
            currentSort,
            currentSortDir,
            itemsPerPage,
        } = this.state;

        switch (currentView) {
            case 'singleOrg':
                return (
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-two-thirds">
                            <a
                                href="#"
                                className="govuk-back-link govuk-!-margin-bottom-9"
                                onClick={(e) => { this.onSingleOrgBack(e) }}
                            >
                                Back
                            </a>

                            <h1 className="govuk-heading-l listing-page">{orgData.companyName}</h1>

                            <p>COMPANY DASHBOARD HERE</p>

                            <p className="govuk-!-margin-top-9">
                                <a href="#" className="govuk-link">Back to dashboard</a>
                            </p>
                        </div>
                    </div>
                );

            case 'orgList':
            default:
                return (
                    <div>
                        <div className="govuk-grid-row">
                            <div className="govuk-grid-column-one-half">
                                <h1 className="govuk-heading-l listing-page">Organisations</h1>

                                <a href="#" className="govuk-button listing-page">
                                    Add an organisation
                                </a>
                            </div>
                        </div>

                        <div className="govuk-grid-row">
                            <div className="govuk-grid-column-two-thirds">
                                <OrgsTable
                                    orgs={liveOrgs.slice(currentPageStart, currentPageEnd)}
                                    onOrgNameClick={(index) => this.onOrgNameClick(index)}
                                    onOrgNameSort={(index) => this.onOrgNameSort(index)}
                                    onOrgUsersSort={(index) => this.onOrgUsersSort(index)}
                                    sortDirection={currentSortDir}
                                    currentSortCol={currentSort}
                                />

                                <nav role="navigation" aria-label="Pagination">
                                    <Pagination
                                        itemsPerPage={itemsPerPage}
                                        totalItems={liveOrgs.length}
                                        currentPage={currentPage}
                                        onPaginationClick={(e) => { this.onPaginationItemClick(e) }}
                                    />

                                    <Totals
                                        totalLow={currentPageStart + 1}
                                        totalHigh={currentPageEnd + 1}
                                        totalLength={liveOrgs.length}
                                        totalType="organisations"
                                    />
                                </nav>

                                <p className="govuk-!-margin-top-9">
                                    <a href="#" className="govuk-link">Back to dashboard</a>
                                </p>
                            </div>
                        </div>
                    </div>
                );

        };
    }
}

Organisations.propTypes = {
    orgs: PropTypes.array,
    liveOrgs: PropTypes.array,
    currentView: PropTypes.string,
    orgData: PropTypes.object,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    currentPageStart: PropTypes.number,
    currentPageEnd: PropTypes.number,
    currentSort: PropTypes.string,
    currentSortDir: PropTypes.string,
};
