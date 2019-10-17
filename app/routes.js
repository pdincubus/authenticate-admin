const express = require('express')
const router = express.Router()

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

module.exports = router
