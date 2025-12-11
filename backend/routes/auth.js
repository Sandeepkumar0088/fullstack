const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const authCtrl = require('../controllers/authCtrl');
const router = express.Router();

router.post(
  '/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  validate,
  authCtrl.register
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').exists()],
  validate,
  authCtrl.login
);

module.exports = router;
