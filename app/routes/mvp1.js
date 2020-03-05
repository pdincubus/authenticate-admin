const express = require('express');
const router = express.Router();

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

module.exports = router;
