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

module.exports = router
