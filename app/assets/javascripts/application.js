/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll();
});

var megasearchInputElem = document.getElementById('govuk-megasearch-input');
var megasearchResultsElemXYZ = document.getElementById('govuk-megasearch-results-xyz');
var megasearchResultsElemCap = document.getElementById('govuk-megasearch-results-cap');
var megasearchResultsElemNone = document.getElementById('govuk-megasearch-results-none');

if (megasearchInputElem) {
    megasearchInputElem.addEventListener('input', function(e) {
        if (this.value.toLowerCase() === 'xyz') {
            megasearchResultsElemXYZ.classList.add('is_active');
            megasearchResultsElemXYZ.setAttribute('aria-hidden', false);

            megasearchResultsElemCap.classList.remove('is_active');
            megasearchResultsElemCap.setAttribute('aria-hidden', true);

            megasearchResultsElemNone.classList.remove('is_active');
            megasearchResultsElemNone.setAttribute('aria-hidden', true);
        } else if (this.value.toLowerCase() === 'cap') {
            megasearchResultsElemXYZ.classList.remove('is_active');
            megasearchResultsElemXYZ.setAttribute('aria-hidden', true);

            megasearchResultsElemCap.classList.add('is_active');
            megasearchResultsElemCap.setAttribute('aria-hidden', false);

            megasearchResultsElemNone.classList.remove('is_active');
            megasearchResultsElemNone.setAttribute('aria-hidden', true);
        } else if (this.value.length >= 3) {
            megasearchResultsElemXYZ.classList.remove('is_active');
            megasearchResultsElemXYZ.setAttribute('aria-hidden', true);

            megasearchResultsElemCap.classList.remove('is_active');
            megasearchResultsElemCap.setAttribute('aria-hidden', true);

            megasearchResultsElemNone.classList.add('is_active');
            megasearchResultsElemNone.setAttribute('aria-hidden', false);
        } else {
            megasearchResultsElemXYZ.classList.remove('is_active');
            megasearchResultsElemXYZ.setAttribute('aria-hidden', true);

            megasearchResultsElemCap.classList.remove('is_active');
            megasearchResultsElemCap.setAttribute('aria-hidden', true);

            megasearchResultsElemNone.classList.remove('is_active');
            megasearchResultsElemNone.setAttribute('aria-hidden', true);
        }
    });
}


/**
 * Some hacks for fake sort/filter form
 */
var filtersBlock = document.getElementById('search-refine');

if (filtersBlock) {
    var sortChoices1 = filtersBlock.querySelector('.sort-order-1');
    var sortChoices2 = filtersBlock.querySelector('.sort-order-2');
    var sortOrderChoice = document.getElementById('sort-order');

    sortOrderChoice.addEventListener('change', function (e) {
        if (this.value === 'status') {
            sortChoices2.classList.remove('is_hidden');
            sortChoices1.classList.add('is_hidden');
        } else {
            sortChoices2.classList.add('is_hidden');
            sortChoices1.classList.remove('is_hidden');
        }
    });
}
