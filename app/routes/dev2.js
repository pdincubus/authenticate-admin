const express = require('express');
const router = express.Router();

const verNum = 'dev2';

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
        case 'l4-reset':
            res.redirect(`/${verNum}/l4/users/reset-password/start`);
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
