import React from 'react';

import OrgsTableRow from './OrgsTableRow';

const OrgsTable = ({
    orgs,
    onOrgNameClick,
    onOrgNameSort,
    onOrgUsersSort,
    sortDirection,
    currentSortCol,
    showHead = true,
}) => {
    let sortingClassOrgName = '';
    let sortingClassOrgUsers = '';

    if (sortDirection == 'asc' && currentSortCol === 'orgName') {
        sortingClassOrgName = 'sorted-ascending';
    } else if (sortDirection == 'desc' && currentSortCol === 'orgName') {
        sortingClassOrgName = 'sorted-descending';
    }

    if (sortDirection == 'asc' && currentSortCol === 'orgUsers') {
        sortingClassOrgUsers = 'sorted-ascending';
    } else if (sortDirection == 'desc' && currentSortCol === 'orgUsers') {
        sortingClassOrgUsers = 'sorted-descending';
    }

    return (
        <table className="govuk-table">
            {showHead &&
                <thead className="govuk-table__head">
                    <tr className="govuk-table__row">
                        <th
                            scope="col"
                            className="govuk-table__header govuk-!-width-half"
                        >
                            <button
                                type="button"
                                className={`sort-header-toggle ${sortingClassOrgName}`}
                                onClick={(e) => { onOrgNameSort(e) }}
                            >
                                Organisation
                            </button>
                        </th>

                        <th
                            scope="col"
                            className="govuk-table__header govuk-table__header--numeric"
                        >
                            <button
                                type="button"
                                className={`sort-header-toggle ${sortingClassOrgUsers}`}
                                onClick={(e) => { onOrgUsersSort(e) }}
                            >
                                Users
                            </button>
                        </th>

                        <th scope="col" className="govuk-table__header"></th>
                    </tr>
                </thead>
            }

            <tbody className="govuk-table__body">
                {orgs.length > 0 && orgs.map((org, index) => {
                    return (
                        <OrgsTableRow
                            orgName={org.companyName}
                            numUsers={org.numberOfUsers}
                            key={`${org.companyName}-${org.numberOfUsers}-${index}`}
                            onNameClick={(e) => {onOrgNameClick(index)}}
                        />
                    );
                })}

                {orgs.length === 0 &&
                    <tr className="govuk-table__row">
                        <td
                            className="govuk-table__cell"
                            colSpan="2"
                        >
                            No organisations found.
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    );
};

export default OrgsTable;
