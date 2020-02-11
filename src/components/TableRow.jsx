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
            <td
                className={`govuk-table__cell ${rowClassNames}`}
                data-email={email}
            >
                <a href="#" className="govuk-link" onClick={(e) => {onNameClick(e)}}>
                    {firstName}
                </a>
            </td>
            <td className="govuk-table__cell">
                <a href="#" className="govuk-link" onClick={(e) => { onNameClick(e) }}>
                    {lastName}
                </a>
            </td>
            <td className="govuk-table__cell">{organisation}</td>
            <td className="govuk-table__cell">{userStatus}</td>
        </tr>
    );
};

export default TableRow;
