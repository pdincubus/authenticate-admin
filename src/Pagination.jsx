import React from 'react';

const Pagination = ({
    itemsPerPage = 10,
    totalItems,
    currentPage,
    onPaginationClick
}) => {
    let pageItems = [];

    const pages = Math.ceil(totalItems / itemsPerPage);

    const nextItem = (currentPage >= pages) ? <span className="pagination__link disabled" aria-label="Next page">
            <span aria-hidden="true" role="presentation">&raquo;</span> Next
            </span>
        : <li className="pagination__item">
            <button
                type="button"
                className="pagination__link"
                aria-label="Next page"
                onClick={(e) => { onPaginationClick(e) }}
                data-page={((currentPage + 1) >= pages) ? currentPage : currentPage + 1 }
            >
                Next <span aria-hidden="true" role="presentation">&raquo;</span>
            </button>
        </li>
    ;

    const previousItem = (currentPage <= 1) ? <span className="pagination__link disabled" aria-label="Previous page">
        <span aria-hidden="true" role="presentation">&laquo;</span> Previous
            </span>
        : <li className="pagination__item">
            <button
                type="button"
                className="pagination__link"
                aria-label="Previous page"
                onClick={(e) => { onPaginationClick(e) }}
                data-page={((currentPage - 1) === 1) ? 1 : currentPage - 1}
            >
                <span aria-hidden="true" role="presentation">&laquo;</span> Previous
            </button>
        </li>
        ;

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
                        data-page={i}
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
