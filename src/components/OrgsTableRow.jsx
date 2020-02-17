import React from 'react';

const OrgsTableRow = ({
    rowClassNames = '',
    orgName,
    numUsers,
    onNameClick
}) => {
    return (
        <tr className="govuk-table__row">
            <td
                className={`govuk-table__cell ${rowClassNames}`}
            >
                <a href="#" className="govuk-link" onClick={(e) => {onNameClick(e)}}>
                    {orgName}
                </a>
            </td>

            <td className="govuk-table__cell govuk-table__cell--numeric">
                {numUsers}
            </td>

            <td className="govuk-table__cell">
                {numUsers === 1 &&
                    <a href="#" className="govuk-link">View user</a>
                }

                {numUsers > 1 &&
                    <a href="#" className="govuk-link">View users</a>
                }

                {numUsers === 0 &&
                    <a href="#" className="govuk-link">
                        Add user
                    </a>
                }
            </td>
        </tr>
    );
};

export default OrgsTableRow;
