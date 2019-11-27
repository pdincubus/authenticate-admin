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

module.exports = router;
