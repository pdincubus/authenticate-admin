import React from 'react';

const TableRow = ({
    rowClassNames = '',
    firstName,
    lastName,
    email,
    organisation,
    userStatus = 'Active',
    onNameClick
}) => {
    return (
        <tr className="govuk-table__row">
            <th
                scope="row"
                className={`govuk-table__header ${rowClassNames}`}
                data-email={ email }
            >
                <a href="#" className="govuk-link" onClick={(e) => {onNameClick(e)}}>
                    {firstName} {lastName}
                </a>
            </th>
            <td className="govuk-table__cell">{organisation}</td>
            <td className="govuk-table__cell">{userStatus}</td>
        </tr>
    );
};

export default TableRow;
