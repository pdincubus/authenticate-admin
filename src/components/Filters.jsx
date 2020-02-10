import React from 'react';

const Filters = ({
    onClearFilters,
    onFilter,
    onOrganisationFilterChange,
    onStatusFilterChange
}) => {
    return (
        <div className="govuk-grid-row filter-block">
            <div className="govuk-form-group">
                <label className="govuk-label govuk-label--s" htmlFor="sort">
                    Filter user list
                </label>

                <select
                    className="govuk-select govuk-!-margin-right-1"
                    id="filter-users-orgs"
                    name="filter-users-orgs"
                    onChange={(e) => {onOrganisationFilterChange(e)}}
                >
                    <option value="">All organisations</option>
                    <option value="Capita">Capita</option>
                    <option value="DWP">DWP</option>
                    <option value="G4S">G4S</option>
                    <option value="London Borough of Croydon Council">London Borough of Croydon Council</option>
                    <option value="Remploy">Remploy</option>
                    <option value="Serco">Serco</option>
                </select>

                <select
                    className="govuk-select govuk-!-margin-right-1"
                    id="filter-users-status"
                    name="filter-users-status"
                    onChange={(e) => {onStatusFilterChange(e)}}
                >
                    <option value="">All statuses</option>
                    <option value="Access expired">Access expired</option>
                    <option value="Active">Active</option>
                    <option value="Invite expired">Invite expired</option>
                    <option value="Invite sent">Invite sent</option>
                </select>

                <button
                    className="govuk-button govuk-!-margin-right-1"
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
            </div>
        </div>
    );
};

export default Filters;
