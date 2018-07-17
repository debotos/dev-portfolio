const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const Joi = require('joi');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const keys = require('../config/credential/keys');
const passport = require('passport');

const validateLoginInput = require('../validation/login');
const validateSignUpInput = require('../validation/register');

// @route   GET api/users/me
// @desc    Return current user
// @access  Private
// set Header key: x-auth-token value: only_token_not_Bearer
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (user) {
    return res.send(user);
  } else {
    return res.status(400).send('Not logged in!');
  }
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
// set Header key: Authorization value: your_Bearer_token
// For Bearer token res.json({success: true,token: token});
// N.B: In this module it is not implemented[means ]
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateSignUpInput(req.body);
  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ other: 'User already registered!' });

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async (req, res) => {
  // validation example using joi
  // const { error } = validateLocally(req.body);
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let user = await User.findOne({ email: req.body.email });
  // Check for user
  if (!user) {
    errors.email = 'User not found!';
    return res.status(404).json(errors);
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    errors.password = 'Password incorrect!';
    return res.status(404).json(errors);
  }

  const token = user.generateAuthToken();
  res.json({
    success: true,
    token: token
  });
});

// @route   POST api/users/me/edit
// @desc    Update user info
// @access  Private
router.post('/me/edit', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // User can't change email but [name, password]
  user = _.pick(req.body, ['name', 'password']);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await User.findOneAndUpdate(
    { email: req.body.email },
    { $set: user },
    { new: true }
  ).then(profile => res.json(profile));
});

// function validateLocally(req) {
//   const schema = {
//     email: Joi.string()
//       .min(5)
//       .max(255)
//       .required()
//       .email(),
//     password: Joi.string()
//       .min(5)
//       .max(255)
//       .required()
//   };

//   return Joi.validate(req, schema);
// }

module.exports = router;
