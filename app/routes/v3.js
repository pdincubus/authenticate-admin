const express = require('express');
const router = express.Router();

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

module.exports = router;
