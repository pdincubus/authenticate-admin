const express = require('express');
const router = express.Router();

const verNum = 'v1';

router.get('/dashboard-root', function (req, res) {
  res.render(`${verNum}/dashboard-root`, { 'activeNav': 'dashboard' });
});

router.get('/dashboard-operators', function (req, res) {
  res.render(`${verNum}/dashboard-operators`, { 'activeNav': 'operators' });
});

router.get('/dashboard-services', function (req, res) {
  res.render(`${verNum}/dashboard-services`, { 'activeNav': 'services' });
});

router.get('/dashboard-organisations', function (req, res) {
  res.render(`${verNum}/dashboard-organisations`, { 'activeNav': 'organisations' });
});

router.get('/dashboard-user', function (req, res) {
  res.render(`${verNum}/dashboard-user`, { 'activeNav': 'users' });
});

router.get('/operator-list', function (req, res) {
  res.render(`${verNum}/operator-list`, { 'activeNav': 'operators' });
});

router.get('/service-list', function (req, res) {
  res.render(`${verNum}/service-list`, { 'activeNav': 'services' });
});

router.get('/organisation-list', function (req, res) {
  res.render(`${verNum}/organisation-list`, { 'activeNav': 'organisations' });
});

router.get('/user-list', function (req, res) {
  res.render(`${verNum}/user-list`, { 'activeNav': 'users' });
});

router.get('/user-edit', function (req, res) {
  res.render(`${verNum}/user-edit`, { 'activeNav': 'users' });
});

router.get('/user-add', function (req, res) {
  res.render(`${verNum}/user-add`, { 'activeNav': 'users' });
});

module.exports = router;
