import React from 'react';

const Filters = ({
    onClearFilters,
    onFilter,
    orgFilter,
    statusFilter,
    numUsers,
    orgFilterRef,
    statusFilterRef
}) => {
    const orgs = ['Capita', 'CHDA', 'DWP', 'G4S', 'London Borough of Croydon Council', 'PeoplePlus', 'Remploy', 'Serco'];
    const statuses = ['Access expired', 'Active', 'Invite expired', 'Invite sent'];

    let filterDetails;

    if (orgFilter !== '' && statusFilter !== '') {
        filterDetails = <p className="govuk-body">
            Showing <strong>{numUsers} {statusFilter}</strong> users from <strong>{orgFilter}</strong>
        </p>;
    } else if (orgFilter !== '' && statusFilter === '') {
        filterDetails = <p className="govuk-body">
            Showing <strong>{numUsers}</strong> users from <strong>{orgFilter}</strong>
        </p>;
    } else if (statusFilter !== '' && orgFilter === '') {
        filterDetails = <p className="govuk-body">
            Showing <strong>{numUsers} {statusFilter}</strong> users
        </p>;
    }

    return (
        <div className="govuk-grid-row filter-block">
            <div className="govuk-form-group">
                <label className="govuk-label govuk-label--s" htmlFor="sort">
                    Filter user list
                </label>

                <select
                    className="govuk-select govuk-!-margin-right-2"
                    id="filter-users-orgs"
                    name="filter-users-orgs"
                    defaultValue={orgFilter}
                    ref={orgFilterRef}
                >
                    <option value="">All organisations</option>

                    {orgs.map((item, index) => {
                        return (
                            <option value={item} key={`${item}-${index}`}>
                                {item}
                            </option>
                        );
                    })}
                </select>

                <select
                    className="govuk-select govuk-!-margin-right-2"
                    id="filter-users-status"
                    name="filter-users-status"
                    defaultValue={statusFilter}
                    ref={statusFilterRef}
                >
                    <option value="">All statuses</option>

                    {statuses.map((item, index) => {
                        return (
                            <option value={item} key={`${item}-${index}`}>
                                {item}
                            </option>
                        );
                    })}
                </select>

                <button
                    className="govuk-button govuk-!-margin-right-2"
                    data-module="govuk-button"
                    onClick={(e) => { onFilter(e) }}
                >
                    Update
                </button>

                <button
                    className="govuk-button govuk-button--secondary"
                    data-module="govuk-button"
                    onClick={(e) => { onClearFilters(e) }}
                >
                    Clear
                </button>

                {filterDetails}
            </div>
        </div>
    );
};

export default Filters;
