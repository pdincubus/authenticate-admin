const express = require('express');
const router = express.Router();

const v1Routes = require('./routes/v1');
const v3Routes = require('./routes/v3');
const mvp1Routes = require('./routes/mvp1');
const dev1Routes = require('./routes/dev1');
const v4Routes = require('./routes/v4');
const v5Routes = require('./routes/v5');
const v6Routes = require('./routes/v6');
const v7Routes = require('./routes/v7');
const dev2Routes = require('./routes/dev2');

router.use('/v1', v1Routes);
router.use('/v3', v3Routes);
router.use('/mvp1', mvp1Routes);
router.use('/dev1', dev1Routes);
router.use('/v4', v4Routes);
router.use('/v5', v5Routes);
router.use('/v6', v6Routes);
router.use('/v7', v7Routes);
router.use('/dev2', dev2Routes);

module.exports = router;
