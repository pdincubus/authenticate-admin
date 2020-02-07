import React, { Component } from 'react';
import classNames from 'classnames';
import faker from 'faker';

import TableRow from './TableRow';

const fakeUsers = Array.apply(0, Array(50)).map((item, index) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const organisation = faker.company.companyName();
    const domain = `${organisation.replace(' - ', '-').replace(', ', '-').replace('. ', '-').replace(' ', '-').replace(' ', '-')}.co.uk`.toLowerCase();
    const email = `${firstName}.${lastName}@${domain}`;

    return {
        firstName: firstName,
        lastName: lastName,
        email: email,
        organisation: organisation,
    };
});

const initialState = {
    users: fakeUsers
};

export default class Users extends Component {
    constructor (props) {
        super();

        this.state = {...initialState};
    }

    render () {
        const { users } = this.state;

        return (
            <table className="govuk-table">
                <thead className="govuk-table__head">
                    <tr className="govuk-table__row">
                        <th scope="col" className="govuk-table__header govuk-!-width-one-third">
                            Name
                        </th>

                        <th scope="col" className="govuk-table__header govuk-!-width-one-third">
                            Organisation
                        </th>

                        <th scope="col" className="govuk-table__header">
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody className="govuk-table__body">
                    {users.map((user, index) => {
                        return (
                            <TableRow
                                firstName={user.firstName}
                                lastName={user.lastName}
                                email={user.email}
                                organisation={user.organisation}
                                status={user.status}
                                key={`${user.firstName}-${user.lastName}-${index}`}
                            />
                        );
                    })}
                </tbody>
            </table>
        );
    }
}
