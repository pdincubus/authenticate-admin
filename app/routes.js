const express = require('express')
const router = express.Router()


/**
 * Just to get the nav working nicely
 */
router.get('/v1/dashboard-root', function (req, res) {
  res.render('v1/dashboard-root', { 'activeNav': 'dashboard' });
});

router.get('/v1/dashboard-operators', function (req, res) {
  res.render('v1/dashboard-operators', { 'activeNav': 'operators' });
});

router.get('/v1/dashboard-services', function (req, res) {
  res.render('v1/dashboard-services', { 'activeNav': 'services' });
});

router.get('/v1/dashboard-organisations', function (req, res) {
  res.render('v1/dashboard-organisations', { 'activeNav': 'organisations' });
});

router.get('/v1/dashboard-user', function (req, res) {
  res.render('v1/dashboard-user', { 'activeNav': 'users' });
});

router.get('/v1/operator-list', function (req, res) {
  res.render('v1/operator-list', { 'activeNav': 'operators' });
});

router.get('/v1/service-list', function (req, res) {
  res.render('v1/service-list', { 'activeNav': 'services' });
});

router.get('/v1/organisation-list', function (req, res) {
  res.render('v1/organisation-list', { 'activeNav': 'organisations' });
});

router.get('/v1/user-list', function (req, res) {
  res.render('v1/user-list', { 'activeNav': 'users' });
});

router.get('/v1/user-edit', function (req, res) {
  res.render('v1/user-edit', { 'activeNav': 'users' });
});

router.get('/v1/user-add', function (req, res) {
  res.render('v1/user-add', { 'activeNav': 'users' });
});

router.post('/v3/user-add-type', function (req, res) {
    let userType = req.session.data['user-access-rights'];

    switch (userType) {
        case 'System admin':
            res.redirect('/v3/user-add-super');
            break;

        case 'Service admin':
            res.redirect('/v3/user-add-service');
            break;

        case 'Organisation admin':
            res.redirect('/v3/user-add-organisation');
            break;

        case 'User':
            res.redirect('/v3/user-add-user');
            break;

        default:
            res.redirect('/v3/user-add-user');
            break;
    }
});

router.post('/mvp1/user-add-type', function (req, res) {
    let userType = req.session.data['user-access-rights'];

    switch (userType) {
        case 'Service admin':
            res.redirect('/mvp1/user-add-service-health-assessment');
            break;

        case 'User':
            res.redirect('/mvp1/user-add-user-health-assessment');
            break;

        default:
            res.redirect('/mvp1/user-add-user-health-assessment');
            break;
    }
});

router.post('/mvp1/organisation-check-prap', function (req, res) {
    let orgName = req.session.data['organisation-name'];
    let orgNameExists = false;

    let orgList = [
        'BPDTS',
        'Capita',
        'DWP',
        'MoJ',
        'MoD',
        'NHS',
        'Remploy',
        'G4S',
        'London Borough of Croydon Council'
    ];

    orgList.forEach(org => {
        if (orgName === org) {
            orgNameExists = true;
        }
    });

    if (orgNameExists) {
        res.redirect('/mvp1/organisation-exists-prap');
    } else {
        res.redirect('/mvp1/organisation-confirmation-prap');
    }
});

router.post('/dev1/organisation-check-prap', function (req, res) {
    let orgName = req.session.data['organisation-name'];
    let orgNameExists = false;

    let orgList = [
        'BPDTS',
        'Capita',
        'DWP',
        'MoJ',
        'MoD',
        'NHS',
        'Remploy',
        'G4S',
        'London Borough of Croydon Council'
    ];

    orgList.forEach(org => {
        if (orgName === org) {
            orgNameExists = true;
        }
    });

    if (orgNameExists) {
        res.redirect('/dev1/organisation-exists-prap');
    } else {
        res.redirect('/dev1/organisation-confirmation-prap');
    }
});

router.post('/v4/user-add-check-is-dwp', function (req, res) {
    const isDWPUser = (req.session.data['user-is-dwp'] === 'yes');

    if (isDWPUser) {
        res.redirect('/mvp1/user-add-user-prap-dwp');
    } else {
        res.redirect('/mvp1/user-add-user-prap-org');
    }
});

router.post('/mvp1/org-actions', function (req, res) {
    const orgAction = req.session.data['org-task'];

    console.log(orgAction);

    if (orgAction == 'suspend') {
        res.redirect('/mvp1/org-suspend-check');
    } else if (orgAction == 'delete') {
        res.redirect('/mvp1/org-delete-check');
    }
});

router.post('/mvp1/org-delete', function (req, res) {
    if (req.session.data['delete-check'] === 'yes') {
        res.redirect('/mvp1/org-delete-confirm');
    } else {
        res.redirect('/mvp1/org-view');
    }
});

router.post('/mvp1/org-suspend', function (req, res) {
    if (req.session.data['suspend-check'] === 'yes') {
        res.redirect('/mvp1/org-suspend-confirm');
    } else {
        res.redirect('/mvp1/org-view');
    }
});

router.post('/mvp1/user-add-org-check', function (req, res) {
    const orgName = req.session.data['organisation-name'].toLowerCase();

    if (
        orgName == 'capita'
        || orgName == 'serco'
        || orgName == 'remploy'
        || orgName == 'g4s'
        || orgName == 'london borough of croydon council'
        || orgName == 'sheffield city council'
        || orgName
    ) {
        req.session.data['org-error'] = false;

        res.redirect('/mvp1/user-add-user-prap');
    } else {
        req.session.data['org-error'] = true;

        res.redirect('/mvp1/user-add-user-prap-org');
    }
});

router.post('/dev1/user-add-org-check', function (req, res) {
    const orgName = req.session.data['organisation-name'].toLowerCase();

    if (
        orgName == 'capita'
        || orgName == 'serco'
        || orgName == 'remploy'
        || orgName == 'g4s'
        || orgName == 'london borough of croydon council'
        || orgName == 'sheffield city council'
        || orgName
    ) {
        req.session.data['org-error'] = false;

        res.redirect('/dev1/user-add-user-prap');
    } else {
        req.session.data['org-error'] = true;

        res.redirect('/dev1/user-add-user-prap-org');
    }
});

router.post('/mvp1/organisation-add-address-check', function (req, res) {
    const checkChoice = req.session.data['add-org-address'];

    if (checkChoice === 'yes') {
        res.redirect('/mvp1/organisation-add-address');
    } else {
        res.redirect('/mvp1/organisation-add-contacts-branch');
    }
});

router.post('/mvp1/organisation-add-contact-check', function (req, res) {
    const checkChoice = req.session.data['add-org-contacts'];

    if (checkChoice === 'yes') {
        res.redirect('/mvp1/organisation-add-contact');
    } else {
        res.redirect('/mvp1/organisation-add-check');
    }
});

router.post('/mvp1/organisation-add-additional-contact-check', function (req, res) {
    const checkChoice = req.session.data['add-additional-org-contact'];

    if (checkChoice === 'yes') {
        res.redirect('/mvp1/organisation-add-additional-contact');
    } else {
        res.redirect('/mvp1/organisation-add-check');
    }
});

router.post('/mvp1/org-add-details-check', function (req, res) {
    const orgCompleteDetails = req.session.data['org-complete-details'].toLowerCase();
    const orgAddress = req.session.data['address-line-1'];
    const orgContact1 = req.session.data['contact-1-first-name'];
    const orgContact2 = req.session.data['contact-2-first-name'];

    if (orgCompleteDetails === 'yes') {
        if (orgContact1 && !orgContact2) {
            res.redirect('/mvp1/organisation-add-additional-contact');
        } else if (!orgContact1 && !orgContact2) {
            res.redirect('/mvp1/organisation-add-contact');
        } else if (!orgAddress) {
            res.redirect('/mvp1/organisation-add-address-only');
        }
    } else if (orgCompleteDetails === 'no') {
        res.redirect('/mvp1/org-view-custom');
    }
});

/**
 * new routes after complete re-organisation
 */
router.post('/v5/l2/users/add/org-check', function (req, res) {
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

        res.redirect('/v5/l2/users/add/details');
    } else {
        req.session.data['org-error'] = true;

        res.redirect('/v5/l2/users/add/start');
    }
});

router.post('/v5/l2/orgs/add/address-branch', function (req, res) {
    const checkChoice = req.session.data['add-org-address'];

    if (checkChoice === 'yes') {
        res.redirect('/v5/l2/orgs/add/address');
    } else {
        res.redirect('/v5/l2/orgs/add/contacts-check');
    }
});

router.post('/v5/l2/orgs/add/contacts-branch', function (req, res) {
    const checkChoice = req.session.data['add-org-contacts'];

    if (checkChoice === 'yes') {
        res.redirect('/v5/l2/orgs/add/contact');
    } else {
        res.redirect('/v5/l2/orgs/add/summary');
    }
});

router.post('/v5/l2/orgs/add/contacts-2-branch', function (req, res) {
    const checkChoice = req.session.data['add-additional-org-contact'];

    if (checkChoice === 'yes') {
        res.redirect('/v5/l2/orgs/add/contact-2');
    } else {
        res.redirect('/v5/l2/orgs/add/summary');
    }
});

router.post('/v5/l2/orgs/add/contacts-3-branch', function (req, res) {
    const checkChoice = req.session.data['add-another-additional-org-contact'];

    if (checkChoice === 'yes') {
        res.redirect('/v5/l2/orgs/add/contact-3');
    } else {
        res.redirect('/v5/l2/orgs/add/summary');
    }
});

router.post('/v5/l2/orgs/add/details-branch', function (req, res) {
    const orgCompleteDetails = req.session.data['org-complete-details'].toLowerCase();
    const orgAddress = req.session.data['address-line-1'];
    const orgContact1 = req.session.data['contact-1-first-name'];
    const orgContact2 = req.session.data['contact-2-first-name'];

    if (orgCompleteDetails === 'yes') {
        if (orgContact1 && !orgContact2) {
            res.redirect('/v5/l2/orgs/add/contact-2');
        } else if (!orgContact1 && !orgContact2) {
            res.redirect('/v5/l2/orgs/add/contact');
        } else if (!orgAddress) {
            res.redirect('/v5/l2/orgs/add/address-only');
        }
    } else if (orgCompleteDetails === 'no') {
        res.redirect('/v5/l2/orgs/view/custom');
    }
});

router.post('/v5/l2/orgs/view/actions-branch', function (req, res) {
    const orgAction = req.session.data['org-task'];

    console.log(orgAction);

    if (orgAction == 'delete') {
        res.redirect('/v5/l2/orgs/edit/delete-check');
    } else if (orgAction == 'delete-users-by-team') {
        res.redirect('/v5/l2/orgs/edit/delete-by-team-check');
    } else if (orgAction == 'delete-users-by-service') {
        res.redirect('/v5/l2/orgs/edit/delete-by-service-check');
    }
});

router.post('/v5/l2/orgs/edit/delete', function (req, res) {
    if (req.session.data['delete-check'] === 'yes') {
        res.redirect('/v5/l2/orgs/edit/delete-confirm');
    } else {
        res.redirect('/v5/l2/orgs/view/all');
    }
});

router.post('/v5/l2/orgs/edit/suspend', function (req, res) {
    if (req.session.data['suspend-check'] === 'yes') {
        res.redirect('/v5/l2/orgs/edit/suspend-confirm');
    } else {
        res.redirect('/v5/l2/orgs/view/all');
    }
});

router.post('/v5/l2/users/view/edit-branch', function (req, res) {
    const editChoice = req.session.data['user-task'];

    if (editChoice === 'reinvite') {
        res.redirect('/v5/l2/users/edit/reinvite');
    } else if (editChoice === 'delete') {
        res.redirect('/v5/l2/users/edit/delete-check');
    }
});

router.post('/v5/l2/users/edit/delete-branch', function (req, res) {
    const deleteChoice = req.session.data['delete-check'];

    if (deleteChoice === 'yes') {
        res.redirect('/v5/l2/users/edit/delete-confirm');
    } else {
        res.redirect('/v5/l2/users/view/single');
    }
});

router.post('/v5/l2/users/register/app-branch', function (req, res) {
    if (req.session.data['app-backup'] === 'yes') {
        res.redirect('/v5/l2/users/register/qr');
    } else {
        res.redirect('/v5/l2/users/register/complete');
    }
});

/** All level 3 (Org admin users) routes */

router.post('/v5/l3/users/register/app-branch', function (req, res) {
    if (req.session.data['app-backup'] === 'yes') {
        res.redirect('/v5/l3/users/register/qr');
    } else {
        res.redirect('/v5/l3/users/register/complete');
    }
});

/** All level 4 (Standard users) routes */

router.post('/v5/l4/users/register/app-branch', function (req, res) {
    if (req.session.data['app-backup'] === 'yes') {
        res.redirect('/v5/l4/users/register/qr');
    } else {
        res.redirect('/v5/l4/users/register/complete');
    }
});


/** Onboarding, is service contact also an admin */

router.post('/v5/onboarding/admin-branch', function (req, res) {
    if (req.session.data['primary-contact-admin-check'] === 'yes') {
        res.redirect('/v5/onboarding/support-details');
    } else {
        res.redirect('/v5/onboarding/service-admins');
    }
});

/** Onboarding, add custom data */

router.post('/v5/onboarding/custom-data-branch', function (req, res) {
    if (req.session.data['custom-data-check'] === 'yes') {
        res.redirect('/v5/onboarding/custom-data-add');
    } else {
        res.redirect('/v5/onboarding/check-your-details');
    }
});



/**
 * Routes picked up from 'config' on the index view
 */
router.post('/v5/index-check', function (req, res) {
    const routeChosen = req.session.data['prototype-route'];

    switch (routeChosen) {
        case 'l2-register':
            res.redirect('/v5/l2/users/register/email');
            break;
        case 'l3-register':
            res.redirect('/v5/l3/users/register/email');
            break;
        case 'l4-register':
            res.redirect('/v5/l4/users/register/email');
            break;
        case 'l2-reset':
            res.redirect('/v5/l2/users/reset-password/start');
            break;
        case 'l2-dashboard':
            res.redirect('/v5/l2/email');
            break;
        case 'l3-dashboard':
            res.redirect('/v5/l3/email');
            break;
        case 'l4-dashboard':
            res.redirect('/v5/l4/email');
            break;
        default:
            res.redirect('/v5/l2/email');
            break;
    }
});




module.exports = router;
