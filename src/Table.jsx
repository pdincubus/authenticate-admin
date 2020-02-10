import React from 'react';

import TableRow from './TableRow';

const Table = ({
    users,
    onUserNameClick
}) => {
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
