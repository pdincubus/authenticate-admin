import React from 'react';

const UserView = ({ data }) => {
    const { firstName, lastName, organisation, email, status } = data;

    return (
        <dl className="govuk-summary-list">
            <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                    Name
                </dt>

                <dd className="govuk-summary-list__value">
                    {firstName} {lastName}
                </dd>
            </div>

            <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                    Email address
                </dt>

                <dd className="govuk-summary-list__value">
                    {email}
                </dd>
            </div>

            <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                    Organisation
                </dt>

                <dd className="govuk-summary-list__value">
                    {organisation}
                </dd>
            </div>

            <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                    Status
                </dt>

                <dd className="govuk-summary-list__value">
                    {status}
                </dd>
            </div>

            <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                    Last logged in
                </dt>

                <dd className="govuk-summary-list__value">
                    21 October 2019
                </dd>
            </div>

            <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                    Created
                </dt>

                <dd className="govuk-summary-list__value">
                    9 April 1982, 7:52pm
                </dd>
            </div>
        </dl>
    );
};

export default UserView;
