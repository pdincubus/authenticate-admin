const express = require('express');
const router = express.Router();

const verNum = 'v5';

router.post('/l2/users/add/org-check', function (req, res) {
    const chosenOrgName = req.session.data['organisation-name-existing'].toLowerCase();
    const orgName = req.session.data['organisation-name'];

    if (
        chosenOrgName == 'capita'
        || chosenOrgName == 'serco'
        || chosenOrgName == 'remploy'
        || chosenOrgName == 'g4s'
        || chosenOrgName == 'london borough of croydon council'
        || chosenOrgName == 'sheffield city council'
        || (chosenOrgName == orgName && orgName !== null)
        || (chosenOrgName == orgName.toLowerCase() && orgName !== undefined)
    ) {
        req.session.data['org-error'] = false;

        res.redirect(`/${verNum}/l2/users/add/details`);
    } else {
        req.session.data['org-error'] = true;

        res.redirect(`/${verNum}/l2/users/add/start`);
    }
});

router.post('/l2/orgs/add/address-branch', function (req, res) {
    const checkChoice = req.session.data['add-org-address'];

    if (checkChoice === 'yes') {
        res.redirect(`/${verNum}/l2/orgs/add/address`);
    } else {
        res.redirect(`/${verNum}/l2/orgs/add/contacts-check`);
    }
});

router.post('/l2/orgs/add/contacts-branch', function (req, res) {
    const checkChoice = req.session.data['add-org-contacts'];

    if (checkChoice === 'yes') {
        res.redirect(`/${verNum}/l2/orgs/add/contact`);
    } else {
        res.redirect(`/${verNum}/l2/orgs/add/summary`);
    }
});

router.post('/l2/orgs/add/contacts-2-branch', function (req, res) {
    const checkChoice = req.session.data['add-additional-org-contact'];

    if (checkChoice === 'yes') {
        res.redirect(`/${verNum}/l2/orgs/add/contact-2`);
    } else {
        res.redirect(`/${verNum}/l2/orgs/add/summary`);
    }
});

router.post('/l2/orgs/add/contacts-3-branch', function (req, res) {
    const checkChoice = req.session.data['add-another-additional-org-contact'];

    if (checkChoice === 'yes') {
        res.redirect(`/${verNum}/l2/orgs/add/contact-3`);
    } else {
        res.redirect(`/${verNum}/l2/orgs/add/summary`);
    }
});

router.post('/l2/orgs/add/details-branch', function (req, res) {
    const orgCompleteDetails = req.session.data['org-complete-details'].toLowerCase();
    const orgAddress = req.session.data['address-line-1'];
    const orgContact1 = req.session.data['contact-1-first-name'];
    const orgContact2 = req.session.data['contact-2-first-name'];

    if (orgCompleteDetails === 'yes') {
        if (orgContact1 && !orgContact2) {
            res.redirect(`/${verNum}/l2/orgs/add/contact-2`);
        } else if (!orgContact1 && !orgContact2) {
            res.redirect(`/${verNum}/l2/orgs/add/contact`);
        } else if (!orgAddress) {
            res.redirect(`/${verNum}/l2/orgs/add/address-only`);
        }
    } else if (orgCompleteDetails === 'no') {
        res.redirect(`/${verNum}/l2/orgs/view/custom`);
    }
});

router.post('/l2/orgs/view/actions-branch', function (req, res) {
    const orgAction = req.session.data['org-task'];

    console.log(orgAction);

    if (orgAction == 'delete') {
        res.redirect(`/${verNum}/l2/orgs/edit/delete-check`);
    } else if (orgAction == 'delete-users-by-team') {
        res.redirect(`/${verNum}/l2/orgs/edit/delete-by-team-check`);
    } else if (orgAction == 'delete-users-by-service') {
        res.redirect(`/${verNum}/l2/orgs/edit/delete-by-service-check`);
    }
});

router.post('/l2/orgs/edit/delete', function (req, res) {
    if (req.session.data['delete-check'] === 'yes') {
        res.redirect(`/${verNum}/l2/orgs/edit/delete-confirm`);
    } else {
        res.redirect(`/${verNum}/l2/orgs/view/all`);
    }
});

router.post('/l2/orgs/edit/suspend', function (req, res) {
    if (req.session.data['suspend-check'] === 'yes') {
        res.redirect(`/${verNum}/l2/orgs/edit/suspend-confirm`);
    } else {
        res.redirect(`/${verNum}/l2/orgs/view/all`);
    }
});

router.post('/l2/users/view/edit-branch', function (req, res) {
    const editChoice = req.session.data['user-task'];

    if (editChoice === 'reinvite') {
        res.redirect(`/${verNum}/l2/users/edit/reinvite`);
    } else if (editChoice === 'delete') {
        res.redirect(`/${verNum}/l2/users/edit/delete-check`);
    }
});

router.post('/l2/users/edit/delete-branch', function (req, res) {
    const deleteChoice = req.session.data['delete-check'];

    if (deleteChoice === 'yes') {
        res.redirect(`/${verNum}/l2/users/edit/delete-confirm`);
    } else {
        res.redirect(`/${verNum}/l2/users/view/single`);
    }
});

router.post('/l2/users/register/app-branch', function (req, res) {
    if (req.session.data['app-backup'] === 'yes') {
        res.redirect(`/${verNum}/l2/users/register/qr`);
    } else {
        res.redirect(`/${verNum}/l2/users/register/complete`);
    }
});

/** All level 3 (Org admin users) routes */
router.post('/l3/users/register/app-branch', function (req, res) {
    if (req.session.data['app-backup'] === 'yes') {
        res.redirect(`/${verNum}/l3/users/register/qr`);
    } else {
        res.redirect(`/${verNum}/l3/users/register/complete`);
    }
});

router.post('/l3/users/view/edit-branch', function (req, res) {
    const editChoice = req.session.data['user-task'];

    if (editChoice === 'reinvite') {
        res.redirect(`/${verNum}/l3/users/edit/reinvite`);
    } else if (editChoice === 'delete') {
        res.redirect(`/${verNum}/l3/users/edit/delete-check`);
    }
});

router.post('/l3/users/edit/delete-branch', function (req, res) {
    const deleteChoice = req.session.data['delete-check'];

    if (deleteChoice === 'yes') {
        res.redirect(`/${verNum}/l3/users/edit/delete-confirm`);
    } else {
        res.redirect(`/${verNum}/l3/users/view/single`);
    }
});

/** All level 4 (Standard users) routes */
router.post('/l4/users/register/app-branch', function (req, res) {
    if (req.session.data['app-backup'] === 'yes') {
        res.redirect(`/${verNum}/l4/users/register/qr`);
    } else {
        res.redirect(`/${verNum}/l4/users/register/complete`);
    }
});

/** Onboarding, is service contact also an admin */
router.post('/add-service/admin-branch', function (req, res) {
    const numContacts = req.session.data['contacts-total'];

    let thereAreAdmins = false;

    console.log(numContacts, 'submitted, check if any are to be admins');

    for (let i = 1; i <= numContacts; i++) {
        console.log('Checking contact', i, '.', `contact-${i}-admin-check:`, req.session.data[`contact-${i}-admin-check`]);

        const adminCheck = req.session.data[`contact-${i}-admin-check`];

        if (adminCheck === 'yes') {
            thereAreAdmins = true;

            console.log(i, 'is an admin');
        } else {
            console.log(i, 'is not an admin');
        }
    }

    console.log('For loop finished');

    if (thereAreAdmins) {
        console.log('Go to support details');

        res.redirect(`/${verNum}/add-service/support`);
    } else {
        console.log('Go to add service admins');

        res.redirect(`/${verNum}/add-service/admins`);
    }
});

/** Onboarding, add custom data */
router.post('/add-service/custom-data-branch', function (req, res) {
    if (req.session.data['custom-data-check'] === 'yes') {
        res.redirect(`/${verNum}/add-service/custom-data-add`);
    } else {
        res.redirect(`/${verNum}/add-service/summary`);
    }
});

/**
 * Routes picked up from 'config' on the index view
 */
router.post('/index-check', function (req, res) {
    const routeChosen = req.session.data['prototype-route'];

    switch (routeChosen) {
        case 'l2-register':
            res.redirect(`/${verNum}/l2/users/register/email`);
            break;
        case 'l3-register':
            res.redirect(`/${verNum}/l3/users/register/email`);
            break;
        case 'l4-register':
            res.redirect(`/${verNum}/l4/users/register/email`);
            break;
        case 'l2-reset':
            res.redirect(`/${verNum}/l2/users/reset-password/start`);
            break;
        case 'l2-dashboard':
            res.redirect(`/${verNum}/l2/email`);
            break;
        case 'l3-dashboard':
            res.redirect(`/${verNum}/l3/email`);
            break;
        case 'l4-dashboard':
            res.redirect(`/${verNum}/l4/email`);
            break;
        default:
            res.redirect(`/${verNum}/l2/email`);
            break;
    }
});

module.exports = router;
