import React from 'react';

import TableRow from './TableRow';

const Table = ({
    users,
    onUserNameClick,
    onFirstNameSort,
    onLastNameSort,
    onOrganisationSort,
    onStatusSort,
    sortDirection,
    currentSortCol,
    showHead = true,
    orgFilter,
    statusFilter,
}) => {
    let sortingClassFirstName = '';
    let sortingClassLastName = '';
    let sortingClassOrganisation = '';
    let sortingClassStatus = '';

    if (sortDirection == 'asc' && currentSortCol === 'firstName') {
        sortingClassFirstName = 'sorted-ascending';
    } else if (sortDirection == 'desc' && currentSortCol === 'firstName') {
        sortingClassFirstName = 'sorted-descending';
    }

    if (sortDirection == 'asc' && currentSortCol === 'lastName') {
        sortingClassLastName = 'sorted-ascending';
    } else if (sortDirection == 'desc' && currentSortCol === 'lastName') {
        sortingClassLastName = 'sorted-descending';
    }

    if (sortDirection == 'asc' && currentSortCol === 'organisation') {
        sortingClassOrganisation = 'sorted-ascending';
    } else if (sortDirection == 'desc' && currentSortCol === 'organisation') {
        sortingClassOrganisation = 'sorted-descending';
    }

    if (sortDirection == 'asc' && currentSortCol === 'status') {
        sortingClassStatus = 'sorted-ascending';
    } else if (sortDirection == 'desc' && currentSortCol === 'status') {
        sortingClassStatus = 'sorted-descending';
    }

    return (
        <table className="govuk-table">
            {showHead &&
                <thead className="govuk-table__head">
                    <tr className="govuk-table__row">
                        <th
                            scope="col"
                            className="govuk-table__header govuk-!-width-one-quarter"
                        >
                            <button
                                type="button"
                                className={`sort-header-toggle ${sortingClassFirstName}`}
                                onClick={(e) => { onFirstNameSort(e) }}
                            >
                                First name
                            </button>
                        </th>

                        <th
                            scope="col"
                            className="govuk-table__header govuk-!-width-one-quarter"
                        >
                            <button
                                type="button"
                                className={`sort-header-toggle ${sortingClassLastName}`}
                                onClick={(e) => { onLastNameSort(e) }}
                            >
                                Last name
                            </button>
                        </th>

                        <th
                            scope="col"
                            className="govuk-table__header govuk-!-width-one-third"
                        >
                            {(orgFilter === '') ?
                            (
                                <button
                                    type="button"
                                    className={`sort-header-toggle ${sortingClassOrganisation}`}
                                    onClick={(e) => { onOrganisationSort(e) }}
                                >
                                    Organisation
                                </button>
                            ) : 'Organisation'}
                        </th>

                        <th
                            scope="col"
                            className="govuk-table__header"
                        >
                            {(statusFilter === '') ?
                            (
                                <button
                                    type="button"
                                    className={`sort-header-toggle ${sortingClassStatus}`}
                                    onClick={(e) => { onStatusSort(e) }}
                                >
                                    Status
                                </button>
                            ) : 'Status'}
                        </th>
                    </tr>
                </thead>
            }

            <tbody className="govuk-table__body">
                {users.length > 0 && users.map((user, index) => {
                    return (
                        <TableRow
                            firstName={user.firstName}
                            lastName={user.lastName}
                            email={user.email}
                            organisation={user.organisation}
                            userStatus={user.status}
                            key={`${user.firstName}-${user.lastName}-${index}`}
                            onNameClick={(e) => {onUserNameClick(index)}}
                        />
                    );
                })}

                {users.length === 0 &&
                    <tr className="govuk-table__row">
                        <td
                            className="govuk-table__cell"
                            colSpan="3"
                        >
                            No users found.
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );
};

export default Table;
