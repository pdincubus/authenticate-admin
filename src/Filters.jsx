import React from 'react';

const Filters = (props) => {
    return (
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
    );
};

export default Filters;
