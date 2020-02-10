import React from 'react';

const EmailSearch = ({ onEmailAddressChange, onSubmitEmailSearch }) => {
    return (
        <div className="user-search-box govuk-form-group">
            <label className="govuk-label govuk-label--s" htmlFor="user-search">
                Search for a user
            </label>

            <span id="user-search-hint" className="govuk-hint">
                Enter the user's full email address
            </span>

            <input
                className="govuk-input"
                id="user-search"
                name="user-search"
                type="text"
                aria-describedby="user-search-hint"
                spellCheck="false"
                onInput={(e) => { onEmailAddressChange(e) }}
            />

            <button
                className="search-button"
                type="button"
                onClick={(e) => { onSubmitEmailSearch(e) }}
            >
                Search
            </button>
        </div>
    );
};

export default EmailSearch;
