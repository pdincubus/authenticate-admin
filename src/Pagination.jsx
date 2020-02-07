import React from 'react';

const Pagination = ({
    itemsPerPage = 10,
    totalItems,
    currentPage,
    onPaginationClick
}) => {
    let pageItems = [];

    const pages = Math.ceil(totalItems / itemsPerPage);

    const nextItem = <li className="pagination__item">
        <button
            type="button"
            className="pagination__link"
            aria-label="Next page"
        >
            Next <span aria-hidden="true" role="presentation">&raquo;</span>
        </button>
    </li>;

    const previousItem = <li className="pagination__item">
        <span className="pagination__link disabled" aria-label="Previous page">
            <span aria-hidden="true" role="presentation">&laquo;</span> Previous
        </span>
    </li>;

    for (let i = 1; i <= pages; i++) {
        if (i == currentPage) {
            pageItems.push(
                <li className="pagination__item" key={`pagination-item-${i}`}>

                    <span
                        className="pagination__link current"
                        aria-label={`Page ${i}`}
                    >
                        {i}
                    </span>
                </li>
            );
        } else {
            pageItems.push(
                <li className="pagination__item" key={`pagination-item-${i}`}>
                    <button
                        type="button"
                        className="pagination__link"
                        aria-label={`Page ${i}`}
                        onClick={(e) => {onPaginationClick(e)}}
                    >
                        {i}
                    </button>
                </li>
            );
        }
    }

    return (
        <ul className="pagination">
            {previousItem}
            {pageItems}
            {nextItem}
        </ul>
    );
};

export default Pagination;
