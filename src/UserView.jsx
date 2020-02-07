import React from 'react';
import format from 'date-fns/format';

const UserView = ({ data }) => {
    const {
        firstName,
        lastName,
        organisation,
        email,
        status,
        lastLoggedIn,
        accountCreatedOn
    } = data;

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
                    {lastLoggedIn !== '' && format(lastLoggedIn, 'd MMMM yyyy, h:mma')}
                    {lastLoggedIn === '' && 'User has never logged in'}
                </dd>
            </div>

            <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                    Created
                </dt>

                <dd className="govuk-summary-list__value">
                    {format(accountCreatedOn, 'd MMMM yyyy, h:mma')}
                </dd>
            </div>
        </dl>
    );
};

export default UserView;
