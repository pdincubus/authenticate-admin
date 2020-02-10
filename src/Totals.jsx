import React from 'react';

const Totals = ({
    totalLow,
    totalHigh,
    totalLength,
    totalType
}) => {
    return (
        <div className="pagination__summary">
            Showing {totalLow} &ndash; {(totalHigh > totalLength) ? totalLength : totalHigh} of {totalLength} {totalType}
        </div>
    );
};

export default Totals;
