const express = require('express');
const router = express.Router();

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

module.exports = router;
