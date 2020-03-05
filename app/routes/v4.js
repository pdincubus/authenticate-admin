const express = require('express');
const router = express.Router();

router.post('/v4/user-add-check-is-dwp', function (req, res) {
    const isDWPUser = (req.session.data['user-is-dwp'] === 'yes');

    if (isDWPUser) {
        res.redirect('/v4/user-add-user-prap-dwp');
    } else {
        res.redirect('/v4/user-add-user-prap-org');
    }
});

module.exports = router;
